import { useBasicProfileForm } from "../../../../Models/Provider/useBasicForm";
import Select from "react-select";
import { Controller } from "react-hook-form";
import apiService from "../../../../Services/apiService";
import { useState, useRef } from "react";
import { useTranslation } from 'react-i18next';

export default function Profile({ data }) {
  const { t } = useTranslation();
  const { register, handleSubmit, errors, control } = useBasicProfileForm({ tabData: data });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef();

  const onAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview(null);
    }
  };

  const onSubmit = async (formData) => {
    setSubmitStatus(null);
    try {
      const response = await apiService.saveProfileTab('basic', formData);
      setSubmitStatus({ type: 'success', message: response.data.message });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.response?.data?.error || t('failed_to_save_profile') });
    }
  };

  if (!data) return null;

  // Prepare options for react-select
  const categoryOptions = (data.categories || []).map(cat => ({ value: cat.id, label: cat.name }));
  const serviceCategoryOptions = (data.service_categories || []).map(sub => ({ value: sub.id, label: sub.name }));
  const cityOptions = (data.cities || []).map(city => ({ value: city.id, label: city.name }));
  // Map already selected cities (workspaces) to city IDs for Select
  const selectedCityIds = Array.isArray(data.workspaces) ? data.workspaces : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {submitStatus && (
        <div className={`flex items-center p-4 mb-4 text-sm rounded-lg ${submitStatus.type === 'success' ? 'text-green-800 bg-green-50 border border-green-200' : 'text-red-800 bg-red-50 border border-red-200'}`} role="alert">
          {submitStatus.type === 'success' ? (
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clipRule="evenodd"></path></svg>
          ) : (
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 13a1 1 0 01-1 1H3a1 1 0 010-2h14a1 1 0 011 1zm-7-7a1 1 0 00-1 1v4a1 1 0 002 0V7a1 1 0 00-1-1zm0 8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
          )}
          <span className="sr-only">{submitStatus.type === 'success' ? t('success') : t('error')}</span>
          <div>
            {submitStatus.message}
          </div>
        </div>
      )}
      <div className="mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">{t('business_name')}</label>
        <input
          type="text"
          {...register("business_name")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.business_name && (
          <p className="text-red-500 text-xs mt-1">{errors.business_name.message}</p>
        )}
      </div>
      <div className="mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">{t('business_email')}</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">{t('business_category')}</label>
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={categoryOptions}
              value={categoryOptions.find(option => option.value === field.value) || null}
              onChange={option => field.onChange(option ? option.value : null)}
              isClearable
              placeholder={t('select_category')}
            />
          )}
        />
        {errors.category_id && (
          <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>
        )}
      </div>
      <div className="mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">{t('offered_service_type')}</label>
        <Controller
          name="service_category_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={serviceCategoryOptions}
              value={serviceCategoryOptions.find(option => option.value === field.value) || null}
              onChange={option => field.onChange(option ? option.value : null)}
              isClearable
              placeholder={t('select_service_type')}
            />
          )}
        />
        {errors.service_category_id && (
          <p className="text-red-500 text-xs mt-1">{errors.service_category_id.message}</p>
        )}
      </div>
      <div className="mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">{t('operating_cities')}</label>
        <Controller
          name="cities"
          control={control}
          defaultValue={selectedCityIds}
          render={({ field }) => (
            <Select
              {...field}
              options={cityOptions}
              value={cityOptions.filter(option => (field.value || []).includes(option.value))}
              onChange={selected => field.onChange(selected ? selected.map(opt => opt.value) : [])}
              isMulti
              placeholder={t('select_cities')}
            />
          )}
        />
        {errors.cities && (
          <p className="text-red-500 text-xs mt-1">{errors.cities.message}</p>
        )}
      </div>
      <div className="md:col-span-2 mt-2">
        <label className="block mb-1 font-medium text-xs text-gray-500">{t('business_description')}</label>
        <textarea
          placeholder={t('business_description_placeholder')}
          {...register("description")}
          className="w-full border border-gray-300 rounded p-2 text-sm"
          rows={4}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>
      {/* Avatar Upload - Flowbite style */}
      <div className="mt-4">
        <label className="block mb-1 font-medium text-xs text-gray-500">{t('avatar_image')}</label>
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <img
              className="h-16 w-16 object-cover rounded-full border border-gray-200"
              src={avatarPreview || data.image || 'https://flowbite.com/docs/images/people/profile-picture-5.jpg'}
              alt={t('current_avatar')}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            style={{ maxWidth: 220 }}
            onChange={onAvatarChange}
            ref={fileInputRef}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">{t('avatar_upload_hint')}</p>
      </div>
      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 mt-2 cursor-pointer"
      >
        {t('save')}
      </button>
    </form>
  );
}
