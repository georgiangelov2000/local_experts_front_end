import { useTranslation } from 'react-i18next';

export default function ProjectsTab({ projects }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-10">
      {projects && projects.length > 0 ? (
        projects.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            {/* Project Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                {project.project_name}
              </h3>
              <p className="text-sm text-gray-500 mt-2 sm:mt-0">
                {new Date(project.date_start).toLocaleDateString(i18n.language)} &mdash;{' '}
                {new Date(project.date_end).toLocaleDateString(i18n.language)}
              </p>
            </div>

            {/* Project Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {project.media && project.media.length > 0 ? (
                project.media.map((imgUrl, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.project_name} image ${imgIndex + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ))
              ) : (
                <div className="overflow-hidden rounded-lg shadow-md bg-gray-50 border border-gray-200 flex items-center justify-center h-48">
                  <img
                    src="https://via.placeholder.com/400x300?text=No+Image"
                    alt="No images available"
                    className="object-contain max-h-full"
                  />
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-base">{t('no_projects_available')}</p>
      )}
    </div>
  );
}
