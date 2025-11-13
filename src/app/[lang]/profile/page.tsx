import { supabaseAdmin } from '@/lib/supabaseAdmin';
import ProfileTabs from './_components/ProfileTabs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/en/login');

  const { data: userData, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', session.user.email)
    .single();

  if (error || !userData) {
    console.error('Error fetching user or user not found:', error);
    redirect('/en/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="pt-24 pb-12 px-4 container mx-auto max-w-6xl">
        <ProfileTabs sessionUser={session.user} userData={userData} />
      </main>
    </div>
  );
}
