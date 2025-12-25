import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';
import hero4 from '@/assets/hero-4.jpg';
import hero5 from '@/assets/hero-5.jpg';

const slides = [
	{
		id: 1,
		image: hero1,
		title: 'Inspection technique & maintenance prédictive 4.0',
		subtitle: 'Drones, ROV & IoT pour sécuriser, optimiser et décarboner vos actifs industriels',
		ctaText: 'Découvrir nos solutions',
	},
	{
		id: 2,
		image: hero2,
		title: "Voir l'invisible. Inspecter l'inaccessible.",
		subtitle: 'Inspections par drones thermographiques & ROV : ports, énergie, lignes HT, silos, pipelines, offshore',
		ctaText: 'Voir les cas d\'usage',
	},
	{
		id: 3,
		image: hero3,
		title: 'Anticipez les pannes. Réduisez les coûts.',
		subtitle: 'Maintenance prédictive, vibration, thermographie & IoT avec des partenaires technologiques internationaux',
		ctaText: 'Parler à un expert',
	},
	{
		id: 4,
		image: hero4,
		title: 'Performance énergétique & industrie durable',
		subtitle: 'Audits énergétiques, détection de fuites, efficacité énergétique & conformité ESG',
		ctaText: 'Optimiser ma consommation',
	},
	{
		id: 5,
		image: hero5,
		title: 'Ils nous font confiance',
		subtitle: 'Synox · APEBI · CDD · Technopark · partenaires technologiques',
		ctaText: 'Nous contacter',
	},
];

const HeroCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = useCallback(() => {
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	}, []);

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
	};

	useEffect(() => {
		const timer = setInterval(nextSlide, 5000);
		return () => clearInterval(timer);
	}, [nextSlide]);

	const currentSlideData = slides[currentSlide];

	return (
		<section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
			<div className="container mx-auto px-4 py-12">
				<div className="grid min-h-screen items-center gap-8 lg:grid-cols-2 lg:gap-12">
					{/* Contenu Texte - Gauche */}
					<div className="relative z-10 flex items-center">
						<AnimatePresence mode="wait">
							<motion.div
								key={currentSlide}
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 50 }}
								transition={{ duration: 0.6 }}
								className="w-full"
							>
								<motion.div
									initial={{ width: 0 }}
									animate={{ width: 80 }}
									transition={{ duration: 0.5, delay: 0.2 }}
									className="mb-6 h-1 bg-orange-500"
								/>
								<h1 className="mb-6 text-4xl font-bold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
									{currentSlideData.title}
								</h1>
								<p className="mb-8 text-lg text-blue-100 md:text-xl">
									{currentSlideData.subtitle}
								</p>
								<button className="rounded-lg bg-orange-500 px-8 py-4 font-semibold text-white transition-all hover:bg-orange-600 hover:shadow-lg">
									{currentSlideData.ctaText}
								</button>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Image - Droite */}
					<div className="relative flex items-center justify-center">
						<AnimatePresence mode="wait">
							<motion.div
								key={currentSlide}
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.6 }}
								className="relative w-full"
							>
								<div className="relative overflow-hidden rounded-2xl shadow-2xl">
									<img
										src={currentSlideData.image}
										alt={currentSlideData.title}
										className="h-[500px] w-full object-cover lg:h-[600px]"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
								</div>
							</motion.div>
						</AnimatePresence>

						{/* Navigation Arrows sur l'image */}
						<button
							onClick={prevSlide}
							className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-orange-500"
							aria-label="Diapositive précédente"
						>
							<ChevronLeft className="h-6 w-6 text-white" />
						</button>
						<button
							onClick={nextSlide}
							className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 backdrop-blur-sm transition-all hover:bg-orange-500"
							aria-label="Diapositive suivante"
						>
							<ChevronRight className="h-6 w-6 text-white" />
						</button>
					</div>
				</div>

				{/* Indicateurs de slides */}
				<div className="flex justify-center gap-3 py-8">
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentSlide(index)}
							className={`h-2 rounded-full transition-all duration-300 ${
								index === currentSlide
									? 'w-10 bg-orange-500'
									: 'w-2 bg-white/50 hover:bg-white'
							}`}
							aria-label={`Aller à la diapositive ${index + 1}`}
						/>
					))}
				</div>
			</div>

			{/* Indicateur de défilement */}
			<motion.div
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 1.5, repeat: Infinity }}
				className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
			>
				<div className="h-12 w-6 rounded-full border-2 border-white/50 p-1">
					<motion.div
						animate={{ y: [0, 16, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="h-2 w-2 rounded-full bg-orange-500"
					/>
				</div>
			</motion.div>
		</section>
	);
};

export default HeroCarousel;