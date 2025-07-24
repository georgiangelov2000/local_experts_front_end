import { useTranslation } from 'react-i18next';

export default function ProjectsTab({ projects }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-12">
      {projects && projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="mb-4">
            {/* Project Info */}
            <h3 className="text-2xl font-bold mb-2">{project.project_name}</h3>
            <p className="text-gray-600 mb-2">
              {new Date(project.date_start).toLocaleDateString(i18n.language)} -{' '}
              {new Date(project.date_end).toLocaleDateString(i18n.language)}
            </p>
            <p className="text-gray-700 mb-6">{project.description}</p>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.media && project.media.length > 0 ? (
                project.media.map((imgUrl, imgIndex) => (
                  <div key={imgIndex}>
                    <img
                      className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                      src={imgUrl}
                      alt={project.project_name}
                    />
                  </div>
                ))
              ) : (
                <div>
                  <img
                    className="w-full h-64 object-cover rounded-lg"
                    src="https://via.placeholder.com/400x300?text=No+Image"
                    alt="Placeholder"
                  />
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">{t('no_projects_available')}</p>
      )}
    </div>
  );
}
