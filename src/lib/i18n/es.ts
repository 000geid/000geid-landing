export const es = {
	hero: {
		name: 'Diego Alvarado',
		subtitle: 'Ingeniero de Software • Productos AI-First',
		description:
			'Lidero productos AI-first en producción y construyo software full-stack: desde LLMs y diseño de sistemas hasta productos publicados y entregas para clientes.',
		toggleDarkMode: 'Cambiar modo oscuro'
	},
	meta: {
		about:
			'Perfil: Claude Code, Cursor, TypeScript, Python, PostgreSQL, Docker, AWS y CI/CD.',
		projects:
			'Trabajo seleccionado: productos publicados, herramientas open source y entregas frontend para clientes—agrupadas por tipo.',
		skills:
			'Stack agrupado por rol: lenguajes, IA/LLM, backend y datos, y cloud/entrega.',
		career: 'Línea de tiempo laboral y freelance: roles, alcance, clientes e IA aplicada a salud, con métricas.',
		education: 'Títulos, diplomas y certificaciones.',
		contact: 'Formas de contacto para roles u oportunidades.'
	},
	about: {
		title: 'Sobre mí',
		kicker: 'Perfil',
		coreExpertise: 'Stack actual',
		headline: 'AI Product Engineer',
		valueProp:
			'Diseño la arquitectura, integro los modelos y llevo el producto a producción. Así se distribuye:',
		sectorsIntro: 'Por área de foco',
		sectors: {
			llm: {
				title: 'IA e inteligencia aplicada',
				points: [
					'Pipelines de IA en producción: integración de LLMs, RAG, flujos agénticos y orquestación para tráfico real, no demos aisladas.',
					'IA aplicada en salud antes del boom LLM (imágenes médicas, flujos clínicos); evaluación y restricciones de producción son parte del trabajo.'
				]
			},
			fullstack: {
				title: 'Full-stack y entrega',
				points: [
					'Responsabilidad de punta a punta: arquitectura, APIs, datos y publicación de productos web y escritorio en producción.',
					'CI/CD, disciplina de releases y prácticas de despliegue para publicar seguido sin romper producción.'
				]
			},
			clients: {
				title: 'Trabajo con clientes y producto',
				points: [
					'Freelance y producto en distintas industrias: requisitos, UX y entregas que usan usuarios finales.',
					'Proyectos en fintech, healthtech y SaaS; el trabajo representativo está en Proyectos.'
				]
			}
		},
		highlights: [
			'Claude Code',
			'Cursor',
			'TypeScript',
			'Python',
			'PostgreSQL',
			'Docker',
			'AWS',
			'CI/CD'
		],
		ctaEmail: 'Hablemos por email',
		ctaProjects: 'Ver proyectos'
	},
	careerPath: {
		title: 'Trayectoria',
		kicker: 'Cronología',
		intro:
			'Experiencia en roles permanentes y freelance: responsabilidades, alcance e impacto en producto, IA aplicada y entrega a clientes.',
		expandButton: 'Leer más',
		collapseButton: 'Leer menos',
		present: 'Actualidad',
		responsibilitiesHeading: 'Responsabilidades clave'
	},
	skills: {
		title: 'Habilidades',
		kicker: 'Especialidades',
		intro:
			'Lo que aporto en un equipo: sistemas de IA en producción, desarrollo full-stack de punta a punta y entrega continua sin fricciones.',
		aiLlm: 'IA y sistemas agénticos',
		fullStack: 'Desarrollo full-stack',
		cloudDevOps: 'Cloud y entrega continua',
		blurbs: {
			aiLlm: 'Integración de modelos, orquestación y flujos de IA listos para producción.',
			fullStack: 'Lenguajes, APIs y datos—código de producto de punta a punta.',
			cloudDevOps: 'Contenedores, servicios cloud y releases predecibles.'
		},
		practiceLabel: 'En la práctica',
		toolsLabel: 'Herramientas y stack'
	},
	education: {
		title: 'Educación',
		kicker: 'Académico',
		current: 'En curso',
		completed: 'Completado',
		tablistLabel: 'Secciones de formación',
		tabDegrees: 'Títulos',
		tabDiplomas: 'Diplomas y certificaciones',
		diplomasEmpty:
			'Aún no hay diplomas cargados: añadí entradas en diplomasData (src/lib/data/education.ts) y las imágenes en static/.',
		verifyCredential: 'Ver certificado'
	},
	projects: {
		title: 'Proyectos',
		kicker: 'Trabajo seleccionado',
		flowReadStory: 'Ver la historia',
		story: {
			label: 'Historia del proyecto',
			back: 'Volver al inicio',
			role: 'Rol',
			timeline: 'Cronología',
			problem: 'El problema',
			solution: 'Cómo lo resolví',
			impact: 'Impacto',
			technologies: 'Tecnologías',
			gallery: 'Interfaz del producto',
			galleryLead:
				'Capturas de la experiencia publicada: layout mobile-first, sincronización y detalle.',
			galleryHint: 'Toca o haz clic en una imagen para verla a tamaño completo',
			galleryExpand: 'Ver a tamaño completo',
			carouselPrev: 'Captura anterior',
			carouselNext: 'Captura siguiente',
			carouselGoTo: 'Ir a captura',
			clientGallery: 'Galería de clientes',
			viewerHint: 'Click para abrir visor y zoom',
			imageViewer: 'Visor de imágenes',
			resetZoom: 'Restablecer zoom',
			notFoundTitle: 'Proyecto no encontrado',
			notFoundBody: 'Esta historia aún no está disponible.'
		}
	},
	contact: {
		title: 'Contacto',
		kicker: 'Conéctate',
		description: 'Abierto a nuevos roles, colaboraciones y problemas interesantes.',
		github: 'GitHub',
		linkedin: 'LinkedIn',
		email: 'Correo',
		phone: 'Teléfono',
		location: 'Ubicación'
	},
	nav: {
		home: 'Inicio',
		sections: 'Secciones'
	},
	home: {
		indexLabel: 'Empezá acá',
		flowHint:
			'Flujo sugerido: primero perfil y antecedentes, después trabajo y habilidades, y al final contacto. Usá la lista o el menú superior—mismos destinos.',
		groups: {
			profile: 'Perfil, carrera y formación',
			work: 'Trabajo y habilidades',
			connect: 'Contacto'
		},
		blurbs: {
			about:
				'Stack de hoy: Claude Code, Cursor, TypeScript y Python; PostgreSQL, Docker, AWS y CI/CD pensados para producción.',
			career: 'Línea de tiempo, roles, clientes y métricas.',
			education: 'Títulos, diplomas y formación formal.',
			projects: 'Productos, open source y entregas para clientes.',
			skills: 'Lenguajes, stack IA/LLM, backend y datos, cloud y entrega.',
			contact: 'Email, redes y ubicación.'
		},
		flowListLabel: 'Secciones'
	},
	cv: {
		title: 'Currículum Vitae',
		experience: 'Experiencia',
		contact: 'Contacto',
		skills: 'Habilidades y herramientas',
		programming: 'Lenguajes de programación',
		technologies: 'Tecnologías',
		languages: 'Idiomas',
		education: 'Educación',
		downloadEn: 'Mi CV en inglés',
		downloadEs: 'Mi CV en español'
	},
	toggler: {
		toggleLanguage: 'Cambiar idioma',
		en: 'EN',
		es: 'ES'
	}
};
