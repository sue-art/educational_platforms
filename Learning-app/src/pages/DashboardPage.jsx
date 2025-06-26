import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-2xl font-semibold">{t('dashboard')}</h1>
      <p>{t('welcome_dashboard')}</p>
    </div>
  );
}
