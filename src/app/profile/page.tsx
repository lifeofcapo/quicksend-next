'use client'
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Moon, Sun, User, Upload, TrendingUp, Calendar, Search } from 'lucide-react';

export default function ProfilePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateSearch, setDateSearch] = useState('');
  const [attachmentSearch, setAttachmentSearch] = useState('');
  const [counters, setCounters] = useState({
    totalCampaigns: 0,
    totalRecipients: 0,
  });

  const userData: UserData = {
    name: 'John Doe',
    email: 'user@example.com',
    activePlan: 'Standard Mode',
    totalCampaigns: 156,
    totalRecipients: 45678,
    remainingCampaigns: 24,
    remainingRecipients: 400,
    subscriptionEnd: '2025-12-31',
    campaigns: [
      { 
        name: 'Loops by Zipulya', 
        date: '2023-06-15', 
        recipients: 5000, 
        attachments: ['loop1.mp3', 'loop2.mp3']
      },
      { 
        name: 'Summer Campaign', 
        date: '2023-07-20', 
        recipients: 3500, 
        attachments: ['summer.pdf']
      },
    ]
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
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
  }, []);

  const filteredCampaigns = userData.campaigns.filter(campaign => {
    const nameMatch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const dateMatch = !dateSearch || campaign.date === dateSearch;
    const attachmentMatch = !attachmentSearch || 
      campaign.attachments.some(att => att.toLowerCase().includes(attachmentSearch.toLowerCase()));
    return nameMatch && dateMatch && attachmentMatch;
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        
        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-6xl">
            
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {userData.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <div className="flex items-center mb-2">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Активный тариф</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.activePlan}</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                    Upgrade Plan
                  </button>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Подписка до</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.subscriptionEnd}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Всего кампаний</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{counters.totalCampaigns}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Всего получателей</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{counters.totalRecipients.toLocaleString()}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Осталось кампаний</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{userData.remainingCampaigns}</p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <div className="flex items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Осталось получателей</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{userData.remainingRecipients.toLocaleString()}</p>
              </div>
            </div>

            {/* Email Verification */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Email Verification</h2>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-4">Upload your email list for verification</p>
                <input
                  type="file"
                  id="email-file"
                  className="hidden"
                  accept=".csv,.txt"
                />
                <label
                  htmlFor="email-file"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition"
                >
                  Choose File
                </label>
              </div>
              <div id="validation-result" className="mt-4 text-gray-700 dark:text-gray-300"></div>
            </div>

            {/* Campaign Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Campaign Management</h2>
              
              {/* Search Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  type="date"
                  value={dateSearch}
                  onChange={(e) => setDateSearch(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Search attachments..."
                  value={attachmentSearch}
                  onChange={(e) => setAttachmentSearch(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Campaign List */}
              <div className="space-y-4">
                {filteredCampaigns.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No campaigns match your search criteria.</p>
                ) : (
                  filteredCampaigns.map((campaign, idx) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-400 transition">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{campaign.name}</h3>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{campaign.date}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">Recipients: {campaign.recipients.toLocaleString()}</p>
                      {campaign.attachments.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Attachments:</p>
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

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
