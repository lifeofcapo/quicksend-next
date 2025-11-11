'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Upload, TrendingUp, Calendar, Search } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';
import { useLanguage } from '@/contexts/language-context';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from '@/hooks/useTranslation'; 

interface Campaign {
  name: string;
  date: string;
  recipients: number;
  attachments: string[];
}

interface UserData {
  name: string;
  email: string;
  avatar?: string;
  activePlan: string;
  totalCampaigns: number;
  totalRecipients: number;
  remainingCampaigns: number;
  remainingRecipients: number;
  subscriptionEnd: string;
  campaigns: Campaign[];
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation(); 

  // профиль/поиск/состояния
  const [searchTerm, setSearchTerm] = useState('');
  const [dateSearch, setDateSearch] = useState('');
  const [attachmentSearch, setAttachmentSearch] = useState('');
  const [counters, setCounters] = useState({ totalCampaigns: 0, totalRecipients: 0 });
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Tenty (заявка на блокировку трека)
  const [tentyTitle, setTentyTitle] = useState('');
  const [tentyArtist, setTentyArtist] = useState('');
  const [tentyProducer, setTentyProducer] = useState('');
  const [tentyDescription, setTentyDescription] = useState('');
  const [tentyFiles, setTentyFiles] = useState<File[]>([]);
  const [tentySubmitting, setTentySubmitting] = useState(false);
  const [tentyMessage, setTentyMessage] = useState<string | null>(null);

  // Email validation section
  const [emailInput, setEmailInput] = useState(session?.user?.email ?? '');
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [validatingEmail, setValidatingEmail] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push(`/${language}/login`);
    }
  }, [session, status, router, language]);

  // Load initial user data (stub — заменяй на real API)
  useEffect(() => {
    if (!session?.user?.email) return;

    // пример: загрузка данных пользователя с API (замени fetch на настоящий endpoint)
    const load = async () => {
      setUserData({
        name: session.user?.name ?? '',
        email: session.user?.email ?? '',
        avatar: session.user?.image ?? undefined,
        activePlan: 'Free',
        totalCampaigns: 12,
        totalRecipients: 12345,
        remainingCampaigns: 3,
        remainingRecipients: 4523,
        subscriptionEnd: '—',
        campaigns: [
          { name: 'Promo Oct', date: '2025-10-01', recipients: 1200, attachments: ['beat.mp3'] },
          { name: 'Black Friday', date: '2025-11-24', recipients: 5000, attachments: [] },
        ],
      });
      setLoading(false);
    };

    load();
  }, [session]);

  // counters animation
  useEffect(() => {
    if (!userData) return;
    const duration = 1400;
    const steps = 40;
    const campaignIncrement = userData.totalCampaigns / steps;
    const recipientIncrement = userData.totalRecipients / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        totalCampaigns: Math.floor(campaignIncrement * currentStep),
        totalRecipients: Math.floor(recipientIncrement * currentStep),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters({
          totalCampaigns: userData.totalCampaigns,
          totalRecipients: userData.totalRecipients,
        });
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [userData]);

  // фильтр кампаний
  const filteredCampaigns = (userData?.campaigns ?? []).filter((campaign) => {
    const nameMatch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const dateMatch = !dateSearch || campaign.date === dateSearch;
    const attachmentMatch =
      !attachmentSearch || campaign.attachments.some((att) => att.toLowerCase().includes(attachmentSearch.toLowerCase()));
    return nameMatch && dateMatch && attachmentMatch;
  });

  // file handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
    }
  };

  const handleTentyFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setTentyFiles(files);
  };

  // basic email regex
  const isEmailFormatValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // validate email (client + optional server call)
  const validateEmail = async () => {
    if (!emailInput) {
      setEmailValid(false);
      return;
    }
    if (!isEmailFormatValid(emailInput)) {
      setEmailValid(false);
      return;
    }

    setValidatingEmail(true);
    try {
      // Если у тебя уже есть FastAPI endpoint для валидации — можешь вызвать его напрямую.
      // Пример: POST /validate-email на твоём API. Ниже показан пример запроса на proxy endpoint внутри Next.js:
      const res = await fetch('/api/validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput }),
      });

      if (!res.ok) {
        // если сервер вернул ошибку — считаем email не прошедшим валидацию на сервере
        setEmailValid(false);
      } else {
        const data = await res.json();
        // ожидаем { valid: boolean, message?: string } от сервера
        setEmailValid(Boolean(data.valid));
      }
    } catch (err) {
      console.error('validateEmail error', err);
      // на случай сетевой ошибки — отметим как false (или null по вкусу)
      setEmailValid(false);
    } finally {
      setValidatingEmail(false);
    }
  };

  // Tenty submit
  const submitTenty = async () => {
    if (!tentyTitle || !tentyArtist) {
      setTentyMessage('Please fill required fields (title and artist).');
      return;
    }
    setTentySubmitting(true);
    setTentyMessage(null);
    try {
      // используем FormData для файлов
      const fd = new FormData();
      fd.append('title', tentyTitle);
      fd.append('artist', tentyArtist);
      fd.append('producer', tentyProducer);
      fd.append('description', tentyDescription);
      fd.append('reporterEmail', session?.user?.email ?? '');

      tentyFiles.forEach((f) => fd.append('files', f));

      const res = await fetch('/api/tenty', {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text();
        setTentyMessage(`Ошибка: ${text || res.statusText}`);
      } else {
        setTentyMessage('Заявка отправлена. Мы свяжемся с вами.');
        // очистить форму
        setTentyTitle('');
        setTentyArtist('');
        setTentyProducer('');
        setTentyDescription('');
        setTentyFiles([]);
      }
    } catch (err) {
      console.error(err);
      setTentyMessage('Сетевая ошибка при отправке заявки.');
    } finally {
      setTentySubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">{t('profile.loading') || 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border">
                  {userData?.avatar ? (
                    <Image src={userData.avatar} alt="avatar" width={80} height={80} style={{ objectFit: 'cover' }} />
                  ) : (
                    <Image src="/default-avatar.png" alt="default avatar" width={80} height={80} style={{ objectFit: 'cover' }} />
                  )}
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {userData?.name ?? (language === 'ru' ? 'Без имени' : 'No name')}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{userData?.email ?? '—'}</p>
                </div>
              </div>

              {/* moved sign out into Dangerous zone lower — keep small quick link (optional) */}
              <div className="mb-4">
                <Link href={`/${language}/pricing`} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm inline-block">
                  {t('profile.upgradePlan') || 'Upgrade plan'}
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <div className="flex items-center mb-2">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('profile.activePlanLabel')}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData?.activePlan || (language === 'ru' ? 'Нет активного тарифа' : 'No active plan')}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{t('profile.subscriptionEndsLabel')}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData?.subscriptionEnd || t('profile.noSubscription')}</p>
                </div>
              </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('profile.totalCampgaignsLabel')}</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{counters.totalCampaigns}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('profile.totalRecipientsLabel')}</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{counters.totalRecipients.toLocaleString()}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('profile.remainingCampaignsLabel')}</span>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{userData?.remainingCampaigns ?? 0}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('profile.remainingRecipientsLabel')}</span>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{(userData?.remainingRecipients ?? 0).toLocaleString()}</p>
              </div>
            </div>

            {/* email verification / upload */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('profile.emailVerificationTitle') || 'Email verification'}</h2>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">{t('profile.uploadHint') || 'Upload file with emails'}</p>
                <input type="file" id="email-file" className="hidden" accept=".csv,.txt" onChange={handleFileUpload} />
                <label htmlFor="email-file" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition">
                  {t('profile.chooseFile') || 'Choose file'}
                </label>
              </div>

              {/* Email validation UI */}
              <div className="mt-6">
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">{t('profile.emailToValidate') || 'Email to validate'}</label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => { setEmailInput(e.target.value); setEmailValid(null); }}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                    placeholder="you@example.com"
                  />
                  <button
                    onClick={validateEmail}
                    disabled={validatingEmail}
                    className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
                  >
                    {validatingEmail ? 'Checking...' : (t('profile.validateEmailBtn') || 'Validate')}
                  </button>
                </div>
                {emailValid !== null && (
                  <p className={`mt-2 text-sm ${emailValid ? 'text-green-600' : 'text-red-600'}`}>
                    {emailValid ? (t('profile.emailValid') || 'Email looks valid') : (t('profile.emailInvalid') || 'Invalid email')}
                  </p>
                )}

                <p className="mt-2 text-xs text-gray-500">
                  {`Note: client-side regex + server-side verification recommended. If you already have FastAPI validation, expose a POST /validate-email endpoint or proxy it through /api/validate-email.`}
                </p>
              </div>
            </div>

            {/* Campaigns & search */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{language === 'ru' ? 'Управление кампаниями' : 'Campaign Management'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('profile.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                  />
                </div>

                <input
                  type="date"
                  value={dateSearch}
                  onChange={(e) => setDateSearch(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                />

                <input
                  type="text"
                  placeholder={t('profile.searchAttachmentsPlaceholder')}
                  value={attachmentSearch}
                  onChange={(e) => setAttachmentSearch(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                />
              </div>

              <div className="space-y-4">
                {filteredCampaigns.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    {(userData?.campaigns.length ?? 0) === 0 ? t('profile.noCampaignsAvailable') : t('profile.noCampaignsMatch')}
                  </p>
                ) : (
                  filteredCampaigns.map((campaign, idx) => (
                    <div key={`${campaign.name}-${idx}`} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-400 transition">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{campaign.name}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{campaign.date}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{language === 'ru' ? 'Получатели:' : 'Recipients:'} {campaign.recipients.toLocaleString()}</p>
                      {campaign.attachments.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{language === 'ru' ? 'Вложения:' : 'Attachments:'}</p>
                          <div className="flex flex-wrap gap-2">
                            {campaign.attachments.map((att, aIdx) => (
                              <span key={aIdx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                                {att}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Tenty section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{language === 'ru' ? 'Tenty — Жалоба на украденный бит' : 'Tenty — Copyright claim'}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Заполните форму, чтобы заявить о треке с украденным битом.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input value={tentyTitle} onChange={(e) => setTentyTitle(e.target.value)} placeholder="Track title" className="px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
                <input value={tentyArtist} onChange={(e) => setTentyArtist(e.target.value)} placeholder="Artist" className="px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
                <input value={tentyProducer} onChange={(e) => setTentyProducer(e.target.value)} placeholder="Beat producer (if known)" className="px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
                <input type="file" multiple onChange={handleTentyFiles} className="px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>

              <textarea value={tentyDescription} onChange={(e) => setTentyDescription(e.target.value)} placeholder="Describe issue, links, timestamps..." className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white mb-4" rows={4} />

              <div className="flex gap-3 items-center">
                <button onClick={submitTenty} disabled={tentySubmitting} className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-60">
                  {tentySubmitting ? 'Submitting...' : 'Submit Tenty'}
                </button>
                {tentyMessage && <p className="text-sm text-gray-500">{tentyMessage}</p>}
              </div>
            </div>

            {/* Dangerous zone — sign out and account actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-lg font-semibold text-red-600 mb-3">Dangerous zone</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Здесь находятся действия, которые завершают сессию или удаляют данные.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => signOut({ callbackUrl: `/${language}/` })}
                  className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  {language === 'ru' ? 'Выйти из аккаунта' : 'Sign out'}
                </button>

                {/* пример "удалить аккаунт" кнопки (только UI) */}
                <button
                  onClick={async () => {
                    if (!confirm(language === 'ru' ? 'Вы уверены? Это удалит аккаунт.' : 'Are you sure? This will delete your account.')) return;
                    try {
                      // вызвать API удаления аккаунта
                      const res = await fetch('/api/account/delete', { method: 'POST' });
                      if (res.ok) {
                        signOut({ callbackUrl: `/${language}/` });
                      } else {
                        alert('Failed to delete account.');
                      }
                    } catch (err) {
                      console.error(err);
                      alert('Network error.');
                    }
                  }}
                  className="px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                >
                  {language === 'ru' ? 'Удалить аккаунт' : 'Delete account'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
