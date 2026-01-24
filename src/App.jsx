import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { projectConfig } from "./projectConfig";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simple markdown parser for descriptions
  const parseMarkdown = (text) => {
    let parsed = text.replace(/<br>/g, "<br>");
    parsed = parsed.replace(/  \n/g, "<br>\n");
    parsed = parsed.replace(
      /^[-*] (.+)$/gm,
      '<li style="margin-bottom: 0.1rem;">$1</li>',
    );
    parsed = parsed.replace(/(<li>.*<\/li>)(\n(<li>.*<\/li>))*/g, (match) => {
      return '<ul class="list-disc list-inside mb-4">' + match + "</ul>";
    });
    parsed = parsed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    parsed = parsed.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>',
    );
    return parsed;
  };

  // Load descriptions from files and build project data
  useEffect(() => {
    const loadProjects = async () => {
      const loadedProjects = [];

      for (const config of projectConfig) {
        try {
          const response = await fetch(`/${config.folderName}/description.txt`);
          const description = response.ok
            ? await response.text()
            : "Description not found.";

          const project = {
            id: loadedProjects.length + 1,
            title: config.title,
            folderName: config.folderName,
            categories: config.categories || [],
            description: description.trim(),
            thumbnailImage: `/${config.folderName}/images/thumb.jpg`,
            media: config.media.map((item) => ({
              type: item.type,
              url:
                item.type === "video"
                  ? item.url
                  : `/${config.folderName}/images/${item.file}`,
            })),
          };

          loadedProjects.push(project);
        } catch (error) {
          console.error(`Error loading project ${config.folderName}:`, error);
        }
      }

      setProjects(loadedProjects);
      setLoading(false);
    };

    loadProjects();
  }, []);

  const HomePage = ({ category = null }) => {
    const navigate = useNavigate();

    // Filter projects by category if specified
    const filteredProjects = category
      ? projects.filter((p) => p.categories.includes(category))
      : projects;

    return (
      <div className="min-h-screen bg-white text-black">
        {/* Header */}
        <header className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="cursor-pointer" onClick={() => navigate("/")}>
              <h1
                className="text-xl md:text-2xl font-bold tracking-[0.2em] md:tracking-[0.3em] text-center hover:text-gray-600 transition-colors"
                style={{ fontFamily: "'Varela Round', sans-serif" }}
              >
                SABRINA NAUMOVSKI, AIA
              </h1>
              <p className="text-xs font-light text-gray-400 text-center mt-2 tracking-[0.15em]">
                architect | design researcher | strategist
              </p>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-6 md:mt-8">
              <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className={`hover:text-gray-600 transition-colors ${
                      !category ? "font-semibold border-b-2 border-black" : ""
                    }`}
                  >
                    All Projects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/planning")}
                    className={`hover:text-gray-600 transition-colors ${
                      category === "planning"
                        ? "font-semibold border-b-2 border-black"
                        : ""
                    }`}
                  >
                    Planning
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/publications")}
                    className={`hover:text-gray-600 transition-colors ${
                      category === "publications"
                        ? "font-semibold border-b-2 border-black"
                        : ""
                    }`}
                  >
                    Publications
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/user-research")}
                    className={`hover:text-gray-600 transition-colors ${
                      category === "user-research"
                        ? "font-semibold border-b-2 border-black"
                        : ""
                    }`}
                  >
                    User Research
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/development")}
                    className={`hover:text-gray-600 transition-colors ${
                      category === "development"
                        ? "font-semibold border-b-2 border-black"
                        : ""
                    }`}
                  >
                    Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/computational-design")}
                    className={`hover:text-gray-600 transition-colors ${
                      category === "computational-design"
                        ? "font-semibold border-b-2 border-black"
                        : ""
                    }`}
                  >
                    Computational Design
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/fabrication")}
                    className={`hover:text-gray-600 transition-colors ${
                      category === "fabrication"
                        ? "font-semibold border-b-2 border-black"
                        : ""
                    }`}
                  >
                    Fabrication
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Projects Gallery */}
        <main className="pb-12">
          <div className="">
            {loading ? (
              <div className="text-center py-12 px-4">Loading projects...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group cursor-pointer relative"
                    onClick={() => navigate(`/project/${project.folderName}`)}
                  >
                    <div className="aspect-[3/2] bg-gray-100 overflow-hidden relative">
                      <img
                        src={project.thumbnailImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-opacity duration-300"
                        onError={(e) => {
                          if (e.target.src.includes(".jpg")) {
                            e.target.src = e.target.src.replace(".jpg", ".png");
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white text-lg md:text-xl font-light tracking-wide text-center px-4">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

  const ProjectPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const project = projects.find((p) => p.folderName === projectId);

    if (loading) {
      return (
        <div className="min-h-screen bg-white text-black flex items-center justify-center">
          <div className="text-center py-12">Loading project...</div>
        </div>
      );
    }

    if (!project) {
      return (
        <div className="min-h-screen bg-white text-black flex items-center justify-center">
          <div className="text-center py-12">
            <p className="mb-4">Project not found</p>
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Return home
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white text-black">
        {/* Header with Logo */}
        <header className="py-6 md:py-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="cursor-pointer" onClick={() => navigate("/")}>
              <h1
                className="text-xl md:text-2xl font-bold tracking-[0.2em] md:tracking-[0.3em] text-center hover:text-gray-600 transition-colors"
                style={{ fontFamily: "'Varela Round', sans-serif" }}
              >
                SABRINA NAUMOVSKI, AIA
              </h1>
              <p className="text-xs font-light text-gray-400 text-center mt-2 tracking-[0.15em]">
                architect | design researcher | strategist
              </p>
            </div>
          </div>
        </header>

        {/* Project Content */}
        <main className="py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:gap-12">
              {/* Left Column - Description */}
              <div className="w-full md:w-1/3 mb-8 md:mb-0 md:pr-8">
                <div className="md:sticky md:top-8">
                  <h1 className="text-2xl md:text-3xl font-light tracking-wide mb-6 md:mb-8">
                    {project.title}
                  </h1>
                  <div className="prose prose-lg max-w-none">
                    {project.description
                      .split(/\n\s*\n/)
                      .filter((p) => p.trim())
                      .map((paragraph, index) => (
                        <p
                          key={index}
                          className="mb-6 text-gray-700 leading-relaxed font-light"
                          dangerouslySetInnerHTML={{
                            __html: parseMarkdown(paragraph.trim()),
                          }}
                        />
                      ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Media */}
              <div className="w-full md:w-2/3">
                <div className="space-y-8">
                  {project.media.map((item, index) => (
                    <div key={index} className="w-full">
                      {item.type === "video" ? (
                        <div className="aspect-video bg-gray-900 rounded-sm overflow-hidden">
                          <iframe
                            src={item.url}
                            title={`${project.title} - Video ${index + 1}`}
                            className="w-full h-full"
                            allowFullScreen
                            frameBorder="0"
                          />
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-auto object-cover"
                          onError={(e) => {
                            console.log(
                              `Failed to load image: ${e.target.src}`,
                            );
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/planning" element={<HomePage category="planning" />} />
      <Route
        path="/publications"
        element={<HomePage category="publications" />}
      />
      <Route
        path="/user-research"
        element={<HomePage category="user-research" />}
      />
      <Route
        path="/development"
        element={<HomePage category="development" />}
      />
      <Route
        path="/computational-design"
        element={<HomePage category="computational-design" />}
      />
      <Route
        path="/fabrication"
        element={<HomePage category="fabrication" />}
      />
      <Route path="/project/:projectId" element={<ProjectPage />} />
    </Routes>
  );
};

export default Portfolio;
