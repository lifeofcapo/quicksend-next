'use client';
import { signOut } from 'next-auth/react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, LogOut } from 'lucide-react';

export default function TabDangerZone({ email }: { email: string }) {
  const { t } = useTranslation();

  const handleSignOut = async () => {
    if (!confirm(t('profile.signOutConfirm'))) return;
    await signOut({ callbackUrl: '/', redirect: true });
  };

  const handleClearCache = async () => {
    if (!confirm(t('profile.clearCacheConfirm'))) return;
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }
    await signOut({ callbackUrl: '/', redirect: true });
  };

  const exportData = async () => {
    try {
      const res = await fetch('/api/export-user-data');
      if (res.ok) {
        const data = await res.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quicksend-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert(t('profile.exportSuccess'));
      } else {
        alert(t('profile.exportFailed'));
      }
    } catch {
      alert(t('profile.exportError'));
    }
  };

  const sections = [
    {
      title: t('profile.exportDataTitle'),
      desc: t('profile.exportDataDescription'),
      onClick: exportData,
      btnLabel: t('profile.exportDataButton'),
      icon: Download,
      variant: 'secondary' as const,
    },
    {
      title: t('profile.clearCacheTitle'),
      desc: t('profile.clearCacheDescription'),
      onClick: handleClearCache,
      btnLabel: t('profile.clearCacheButton'),
      icon: RefreshCw,
      variant: 'outline' as const,
    },
    {
      title: t('profile.signOutTitle'),
      desc: t('profile.signOutDescription'),
      onClick: handleSignOut,
      btnLabel: t('profile.signOutButton'),
      icon: LogOut,
      variant: 'destructive' as const,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {sections.map(({ title, desc, onClick, btnLabel, icon: Icon, variant }) => (
        <Card key={title} className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-4">{desc}</p>
          <Button onClick={onClick} variant={variant} className="w-full sm:w-auto">
            <Icon className="w-4 h-4" />
            {btnLabel}
          </Button>
        </Card>
      ))}
    </div>
  );
}