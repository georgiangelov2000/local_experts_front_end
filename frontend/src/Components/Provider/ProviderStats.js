import { useTranslation } from 'react-i18next';

export default function ProviderStats({ provider }) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4 text-sm text-gray-700 mt-2">
      <div className="flex items-center">
        {provider.likes_count ?? 0} {t('likes')}
      </div>
      <div className="flex items-center">
        {provider.dislikes_count ?? 0} {t('dislikes')}
      </div>
      <div className="flex items-center">
        {provider.views_count ?? 0} {t('views')}
      </div>
    </div>
  );
} 