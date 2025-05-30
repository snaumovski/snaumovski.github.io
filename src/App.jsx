import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

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
			images: ["1.jpg", "2.jpg", "3.jpg"], // List your other images here
		},
		{
			folderName: "photobioreactor",
			title: "PHOTOBIOREACTOR",
			description: `"We believe that, if human beings are part of an ecology, then the objects humans make should also be part of it. Among humans and insects alike, inhabitable spaces are the result of a deliberate organization of material, energy, information and a continuous interaction with the environment, whose goal is to help develop tight-knit communities."

The purpose of this project is to design a photobioreactor in an urban environment for the production and consumption of future food - specifically the micro algae spirulina.`,
			images: ["1.jpg", "2.jpg"], // List your other images here
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
			projectImages: config.images.map(
				(img) => `/${config.folderName}/images/${img}`
			),
		}));

		setProjects(loadedProjects);
		setLoading(false);
	}, []);

	const HomePage = () => (
		<div className="min-h-screen bg-white text-black">
			{/* Header */}
			<header className="py-8">
				<div className="max-w-7xl mx-auto px-6">
					<h1 className="text-2xl font-light tracking-[0.3em] text-center">
						SABRINA NAUMOVSKI
					</h1>
				</div>
			</header>

			{/* Projects Gallery */}
			<main className="pb-12">
				<div className="max-w-6xl mx-auto px-6">
					{loading ? (
						<div className="text-center py-12">Loading projects...</div>
					) : (
						<div className="grid grid-cols-2">
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
											<h3 className="text-white text-xl font-light tracking-wide text-center px-4">
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
			{/* Header */}
			<header className="py-6 border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-6 flex items-center">
					<button
						onClick={() => setSelectedProject(null)}
						className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
						<ArrowLeft size={20} />
						Back
					</button>
				</div>
			</header>

			{/* Project Content */}
			<main className="py-8">
				<div className="max-w-7xl mx-auto px-6 flex gap-12">
					{/* Left Column - 1/3 width */}
					<div className="w-1/3 pr-8">
						<div className="sticky top-8">
							<h1 className="text-3xl font-light tracking-wide mb-8">
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

					{/* Right Column - 2/3 width */}
					<div className="w-2/3">
						<div className="space-y-8">
							{project.projectImages.map((image, index) => (
								<div key={index} className="w-full">
									<img
										src={image}
										alt={`${project.title} - Image ${index + 1}`}
										className="w-full h-auto object-cover"
										onError={(e) => {
											console.log(`Failed to load image: ${e.target.src}`);
										}}
									/>
								</div>
							))}
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
