import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const { data, error } = await supabase.from('users').insert({
      email,
      password: hashedPassword,
    });

    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
