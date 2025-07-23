import { FiPhone, FiMapPin, FiMail, FiGlobe, FiAward, FiExternalLink, FiCheckCircle, FiPackage, FiDollarSign, FiInfo, FiUser, FiFacebook, FiInstagram } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function ProfileTab({ provider }) {
  const { t } = useTranslation();
  return (
    <>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t('about')}</h3>
            <p className="text-sm sm:text-base text-gray-600">{t('professional_background_and_expertise')}</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-all duration-300">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {provider.description || t('no_description_available')}
          </p>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
            <h4 className="text-xl sm:text-2xl font-bold text-gray-900">{t('contact_information')}</h4>
            <p className="text-sm sm:text-base text-gray-600">{t('get_in_touch_and_connect')}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-4 items-center bg-white border border-gray-200 rounded-xl p-2 sm:p-4 hover:shadow-md transition-all duration-300">
          {provider.contact?.phone && (
            <div className="flex items-center">
              <FiPhone className="text-gray-500 text-lg mr-2" />
              <span className="text-sm text-gray-700 font-medium">{provider.contact.phone}</span>
            </div>
          )}
          {provider.contact?.email && (
            <div className="flex items-center">
              <FiMail className="text-gray-500 text-lg mr-2" />
              <span className="text-sm text-gray-700 font-medium">{provider.contact.email}</span>
            </div>
          )}
          {provider.contact?.website && (
            <div className="flex items-center">
              <FiGlobe className="text-gray-500 text-lg mr-2" />
              <a 
                href={provider.contact.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                {provider.contact.website}
              </a>
            </div>
          )}
          {provider.contact?.address && (
            <div className="flex items-center">
              <FiMapPin className="text-gray-500 text-lg mr-2" />
              <span className="text-sm text-gray-700 font-medium">{provider.contact.address}</span>
            </div>
          )}
          {provider.contact?.facebook && (
            <div className="flex items-center">
              <FiFacebook className="text-gray-500 text-lg mr-2" />
              <a 
                href={provider.contact.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                {t('facebook')}
              </a>
            </div>
          )}
          {provider.contact?.instagram && (
            <div className="flex items-center">
              <FiInstagram className="text-gray-500 text-lg mr-2" />
              <a 
                href={provider.contact.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                {t('instagram')}
              </a>
            </div>
          )}
        </div>
      </div>


      {provider.certifications?.length > 0 && (
        <div className="mb-6 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900">{t('certifications')}</h4>
              <p className="text-sm sm:text-base text-gray-600">{t('verified_credentials_and_qualifications')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {provider.certifications.map((cert, idx) => (
              <div key={idx} className="group bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md hover:border-green-200 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {/* <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex-shrink-0">
                      <FiAward className="text-gray-700 text-sm" />
                    </div> */}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-200">
                        {cert.name}
                      </h5>
                      {cert.description && (
                        <p className="text-xs text-gray-600 leading-relaxed mb-2">
                          {cert.description}
                        </p>
                      )}
                      
                      {/* Action Links */}
                      <div className="flex items-center space-x-3">
                        {(cert.image_url || cert.link) && (
                          <div className="flex items-center space-x-2">
                            {cert.image_url && (
                              <a
                                href={cert.image_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors duration-200"
                              >
                                <FiExternalLink className="mr-1" />
                                {t('view_certificate')}
                              </a>
                            )}
                            {cert.link && (
                              <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-lg hover:bg-green-100 transition-colors duration-200"
                              >
                                <FiExternalLink className="mr-1" />
                                {t('verify_online')}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  {/* <div className="flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    <FiCheckCircle className="mr-1" />
                    Verified
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {provider.services?.length > 0 && (
        <div className="mb-6 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900">{t('services_offered')}</h4>
              <p className="text-sm sm:text-base text-gray-600">{t('professional_services_and_pricing')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {provider.services.map((service, idx) => (
              <div key={idx} className="group bg-white border border-gray-200 rounded-xl p-3 sm:p-4 hover:shadow-md hover:border-blue-200 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    {/* <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex-shrink-0">
                      <FiDollarSign className="text-white text-sm" />
                    </div> */}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                        {service.description}
                      </h5>
                    </div>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                    <span className="font-semibold text-blue-600 ml-2">{service.price} {t('currency_bgn')}</span>
                  </div>
                </div>
              </div>
            ))}
            {provider.services.length > 4 && (
              <div className="text-xs text-gray-500 italic col-span-full">
                +{provider.services.length - 4} {t('more_services')}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
