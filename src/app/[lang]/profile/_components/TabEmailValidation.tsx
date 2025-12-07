'use client';
import { useState, useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface TabEmailValidationProps {
  email?: string;
}

export default function TabEmailValidation({ email }: TabEmailValidationProps) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [report, setReport] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [stats, setStats] = useState<{
    total: number;
    valid: number;
    duplicates: number;
  } | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'text/plain' || droppedFile.name.endsWith('.csv') || droppedFile.name.endsWith('.txt')) {
        setFile(droppedFile);
      } else {
        alert(t('profile.invalidFileType'));
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFile = e.target.files[0];
    
    // Проверяем тип файла
    if (selectedFile.type === 'text/plain' || 
        selectedFile.name.endsWith('.csv') || 
        selectedFile.name.endsWith('.txt')) {
      setFile(selectedFile);
    } else {
      alert(t('profile.invalidFileType'));
    }
  };

  const handleValidation = async () => {
    if (!file) {
      alert(t('profile.selectFileFirst'));
      return;
    }
    
    setStatus('processing');
    setStats(null);

    try {
      const text = await file.text();

      const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
      const uniqueEmails = Array.from(new Set(matches));

      // Устанавливаем статистику
      setStats({
        total: matches.length,
        valid: uniqueEmails.length,
        duplicates: matches.length - uniqueEmails.length
      });

      const reportContent =
        uniqueEmails.length > 0
          ? `${t('profile.validEmailsFound')} (${uniqueEmails.length}):\n\n${uniqueEmails.join('\n')}`
          : t('profile.noValidEmails');

      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = t('profile.emailValidationReport');
      a.click();
      URL.revokeObjectURL(url);

      setReport(reportContent);
      setStatus('done');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setStats(null);
    setReport(null);
    setStatus('idle');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">{t('profile.emailValidationTitle')}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t('profile.emailValidationDescription')}
        </p>
      </div>

      {/* Drag & Drop Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]'
            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {t('profile.dragDropFile')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('profile.supportedFormats')}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleBrowseClick();
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            {t('profile.browseFiles')}
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {/* File Info Section */}
      {file && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{file.name}</h4>
                <div className="flex items-center gap-3 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <span>{formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span>{file.type || 'text/plain'}</span>
                  <span>•</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {t('profile.fileUploaded')}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleRemoveFile}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
              title={t('profile.removeFile')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {stats.total}
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('profile.totalEmails')}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('profile.totalEmailsDesc')}
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {stats.valid}
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('profile.validEmails')}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('profile.validEmailsDesc')}
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              {stats.duplicates}
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('profile.duplicateEmails')}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t('profile.duplicateEmailsDesc')}
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-center">
        <button
          onClick={handleValidation}
          disabled={!file || status === 'processing'}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
        >
          {status === 'processing' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {t('profile.processing')}
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t('profile.validateFileButton')}
            </>
          )}
        </button>
      </div>

      {/* Report Preview */}
      {status === 'done' && report && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              {t('profile.validationReport')}
            </h4>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-sm font-medium rounded-full">
              {t('profile.completed')}
            </span>
          </div>
          
          <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl whitespace-pre-wrap text-sm max-h-64 overflow-y-auto">
            {report}
          </pre>
        </div>
      )}

      {/* Error State */}
      {status === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-medium text-red-800 dark:text-red-300">
                {t('profile.processingErrorTitle')}
              </h4>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                {t('profile.processingError')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}