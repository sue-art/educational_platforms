import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ParentTeacherPortalPage() {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-2xl font-semibold">{t('parent_teacher_portal')}</h1>
      <p>{t('parent_teacher_portal_description')}</p>
      {/* Placeholder for portal features */}
    </div>
  );
}
