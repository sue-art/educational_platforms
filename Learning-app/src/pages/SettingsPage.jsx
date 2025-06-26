import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-2xl font-semibold">{t('settings')}</h1>
      <p>{t('settings_description')}</p>
      {/* Placeholder for settings options */}
    </div>
  );
}
