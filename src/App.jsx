import React, { useState, useEffect } from "react";

const Portfolio = () => {
	const [selectedProject, setSelectedProject] = useState(null);
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	// PROJECT CONFIGURATION - Only edit this section
	const projectConfig = [
		{
			folderName: "crowd-space",
			title: "CROWD SPACE",
			description: `Work completed with KieranTimberlake

Crowd Space is an iterative virtual reality design tool/proof of concept that allows architects to design spaces in accordance with a real-time crowd simulation. With pre-loaded room types, a designer constructs a floor plate at a tabletop scale and then instantiates various agent types to interact with the newly created space.

The splash screen was procedurally generated with Grasshopper.`,
			media: [
				{
					type: "video",
					url: "https://www.youtube.com/embed/p8ug6mn93xk?si=2xIBL1puQLUIuyG2",
				},
				{ type: "image", file: "1.jpg" },
				{ type: "image", file: "2.jpg" },
			],
		},
		{
			folderName: "photobioreactor",
			title: "PHOTOBIOREACTOR",
			description: `"We believe that, if human beings are part of an ecology, then the objects humans make should also be part of it. Among humans and insects alike, inhabitable spaces are the result of a deliberate organization of material, energy, information and a continuous interaction with the environment, whose goal is to help develop tight-knit communities."

The purpose of this project is to design a photobioreactor in an urban environment for the production and consumption of future food - specifically the micro algae spirulina.`,
			media: [
				{ type: "image", file: "1.jpg" },
				{ type: "image", file: "2.jpg" },
			],
		},
		{
			folderName: "test-project",
			title: "TEST PROJECT",
			description: `This is a test project.`,
			media: [],
		},
		// Add new projects here following the same pattern
	];

	// Build project data from config
	useEffect(() => {
		const loadedProjects = projectConfig.map((config, index) => ({
			id: index + 1,
			title: config.title,
			description: config.description,
			thumbnailImage: `/${config.folderName}/images/thumb.jpg`,
			media: config.media.map((item) => ({
				type: item.type,
				url:
					item.type === "video"
						? item.url
						: `/${config.folderName}/images/${item.file}`,
			})),
		}));

		setProjects(loadedProjects);
		setLoading(false);
	}, []);

	const HomePage = () => (
		<div className="min-h-screen bg-white text-black">
			{/* Header */}
			<header className="py-6 md:py-8">
				<div className="max-w-7xl mx-auto px-4 md:px-6">
					<h1
						className="text-xl md:text-2xl font-bold tracking-[0.2em] md:tracking-[0.3em] text-center"
						style={{ fontFamily: "'Varela Round', sans-serif" }}>
						SABRINA NAUMOVSKI
					</h1>
					<p className="text-xs font-light text-gray-400 text-center mt-2 tracking-[0.15em]">
						architect + researcher
					</p>
				</div>
			</header>

			{/* Projects Gallery */}
			<main className="pb-12">
				<div className="max-w-6xl mx-auto px-4 md:px-6">
					{loading ? (
						<div className="text-center py-12">Loading projects...</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
							{projects.map((project) => (
								<div
									key={project.id}
									className="group cursor-pointer relative"
									onClick={() => setSelectedProject(project)}>
									<div className="aspect-[3/2] bg-gray-100 overflow-hidden">
										<img
											src={project.thumbnailImage}
											alt={project.title}
											className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
											onError={(e) => {
												// Try .png if .jpg fails
												if (e.target.src.includes(".jpg")) {
													e.target.src = e.target.src.replace(".jpg", ".png");
												}
											}}
										/>
										{/* Project title overlay */}
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

	const ProjectPage = ({ project }) => (
		<div className="min-h-screen bg-white text-black">
			{/* Header with Logo */}
			<header className="py-6 md:py-8 border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-4 md:px-6">
					<div
						className="cursor-pointer"
						onClick={() => setSelectedProject(null)}>
						<h1
							className="text-xl md:text-2xl font-bold tracking-[0.3em] md:tracking-[0.4em] text-center hover:text-gray-600 transition-colors"
							style={{ fontFamily: "'Varela Round', sans-serif" }}>
							SABRINA NAUMOVSKI
						</h1>
						<p className="text-xs font-light text-gray-400 text-center mt-2 tracking-[0.15em]">
							architect + researcher
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
									{project.description.split("\n\n").map((paragraph, index) => (
										<p
											key={index}
											className="mb-6 text-gray-700 leading-relaxed font-light">
											{paragraph}
										</p>
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
													console.log(`Failed to load image: ${e.target.src}`);
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

	return (
		<>
			{!selectedProject && <HomePage />}
			{selectedProject && <ProjectPage project={selectedProject} />}
		</>
	);
};

export default Portfolio;
