import React from 'react';
import { useTranslation } from 'react-i18next';

export default function WritingPracticePage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-2xl font-semibold">{t('writing_practice')}</h1>
      <p>{t('writing_practice_description')}</p>
      {/* Placeholder for writing activities */}
    </div>
  );
}
