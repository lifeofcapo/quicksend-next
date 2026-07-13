import { supabaseAdmin } from '@/lib/supabaseAdmin';
import ProfileTabs from './_components/ProfileTabs';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.email) redirect('/en/login');

  const { data: userData, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', session.user.email)
    .single();

  if (error || !userData) redirect('/en/login');

  const isManager = session.user.email === process.env.MANAGER_EMAIL;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="pt-24 pb-12 px-4 container mx-auto max-w-6xl">
        <ProfileTabs sessionUser={session.user} userData={userData} isManager={isManager}/>
      </main>
    </div>
  );
}