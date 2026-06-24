export const es = {
	hero: {
		name: 'Diego Alvarado',
		subtitle: 'Product Engineer · Desarrollador Full-Stack',
		description:
			'Construyo productos de principio a fin—frontend, backend, APIs e infraestructura. Integro IA donde realmente suma valor: búsqueda inteligente, automatización y features de lenguaje que llegan a producción.',
		toggleDarkMode: 'Cambiar modo oscuro'
	},
	meta: {
		about:
			'Product Engineer y Desarrollador Full-Stack con base en Buenos Aires—UI, APIs, bases de datos y sistemas en producción. Disponible para roles y proyectos freelance.',
		projects:
			'Trabajo seleccionado: productos publicados, herramientas open source y entregas para clientes—agrupadas por tipo, con resultados.',
		skills:
			'Stack agrupado por área: desarrollo full-stack, integración de IA/LLM, cloud y entrega continua.',
		career: 'Línea de tiempo laboral y freelance: roles, alcance, clientes e IA aplicada a salud, con métricas.',
		education: 'Títulos, diplomas y certificaciones.',
		contact: 'Formas de contacto para roles o proyectos freelance.'
	},
	about: {
		title: 'Sobre mí',
		kicker: 'Hola! Soy',
		coreExpertise: 'Stack actual',
		headline: 'Product Engineer · Desarrollador Full-Stack',
		valueProp:
			'Llevo proyectos del primer boceto a producción, con ownership completo del stack—frontend, APIs, bases de datos y despliegue. Cuando la IA mejora genuinamente el producto, también la construyo. Tres cosas que aporto a cada proyecto:',
		sectorsIntro: 'Qué aporto',
		sectors: {
			llm: {
				title: 'IA como herramienta concreta',
				points: [
					'Lancé features de IA en sistemas de producción reales—búsqueda semántica, pipelines RAG y flujos automatizados. El objetivo es siempre el mismo: algo que funcione de forma confiable para usuarios reales, no una demo. Antes del boom actual, trabajé con IA para diagnóstico médico por imágenes en un entorno clínico. La confiabilidad y los tests no son opcionales—son la base.'
				]
			},
			fullstack: {
				title: 'Ownership full-stack de principio a fin',
				points: [
					'Construyo el producto completo: la UI con la que interactúan los usuarios, las APIs que la potencian, la base de datos detrás y la infraestructura que la mantiene corriendo. También instalo las prácticas—CI/CD, testing, deployments claros—que permiten al equipo lanzar con confianza y frecuencia.'
				]
			},
			clients: {
				title: 'Trabajo con clientes',
				points: [
					'Entreggué proyectos para clientes en salud, SaaS y consumo—encargándome de todo, desde la definición del problema hasta el despliegue. Me comunico con claridad, cumplo plazos y dejo el código en un estado en que el próximo developer puede seguir trabajando. El trabajo representativo está en Proyectos.'
				]
			}
		},
		highlights: [
			'TypeScript',
			'Python',
			'React',
			'SvelteKit',
			'PostgreSQL',
			'Docker',
			'AWS',
			'CI/CD'
		],
		profileCard: {
			label: 'Perfil rápido',
			items: [
				'5 años lanzando productos',
				'Remoto · Buenos Aires (GMT-3)',
				'Disponible para roles y freelance'
			]
		},
		freelance: {
			label: 'Freelance',
			heading: '¿Tenés un proyecto?',
			body: 'Acepto proyectos freelance puntuales con startups y equipos pequeños que necesitan un engineer full-stack que pueda dueñarse del trabajo de punta a punta.',
			items: [
				'Productos y MVPs',
				'Features adicionales e integraciones de API',
				'Features de IA: búsqueda, automatización, lenguaje',
				'Proyectos de 2 a 6 semanas, scope claro desde el inicio'
			],
			cta: 'Hablemos de tu proyecto',
			emailSubject: 'Proyecto freelance — [nombre de tu proyecto]'
		},
		ctaEmail: 'Hablemos por email',
		ctaProjects: 'Ver proyectos'
	},
	careerPath: {
		title: 'Trayectoria',
		kicker: 'Cronología',
		intro:
			'Cinco años de experiencia en roles de staff y como independiente—liderando equipos, lanzando productos y resolviendo problemas reales en IA, ingeniería de producto y entrega a clientes.',
		expandButton: 'Leer más',
		collapseButton: 'Leer menos',
		present: 'Actualidad',
		responsibilitiesHeading: 'Responsabilidades clave'
	},
	skills: {
		title: 'Habilidades',
		kicker: 'Especialidades',
		intro:
			'Lo que aporto a un equipo: ownership completo de un producto—desde la UI pasando por las APIs hasta la infraestructura. Uso IA donde marca una diferencia real, y entrego cosas que se sostienen en producción.',
		atGlanceLabel: 'De un vistazo',
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
		verifyCredential: 'Credencial verificada',
		credentialExternalHint: '(se abre en una pestaña nueva)'
	},
	projects: {
		title: 'Proyectos',
		kicker: 'Trabajo seleccionado',
		flowReadStory: 'Ver la historia',
		groups: {
			products: 'Productos',
			oss: 'Código abierto',
			client: 'Trabajo con clientes'
		},
		story: {
			label: 'Historia del proyecto',
			back: 'Volver al inicio',
			role: 'Rol',
			timeline: 'Cronología',
			problem: 'El problema',
			solution: 'Cómo lo resolví',
			impact: 'Impacto',
			technologies: 'Tecnologías',
			patterns: 'Arquitectura',
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
		description: 'Busco un rol de product engineer o desarrollador full-stack—remote-first, desde Buenos Aires (GMT-3). También acepto proyectos freelance: productos, integraciones de API y features de IA.',
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
		meta: {
			title: 'Product Engineer · Desarrollador Full-Stack',
			description:
				'Product Engineer con base en Buenos Aires—productos full-stack y features de IA en producción. Disponible para roles y proyectos freelance.'
		},
		indexLabel: 'Empezá acá',
		flowHint:
			'De IA para diagnóstico médico a SaaS full-stack—productos construidos de punta a punta y corriendo en producción.',
		availability: {
			openToRoles: 'Disponible para roles',
			takingFreelance: 'Acepto freelance',
			remote: 'Remoto · GMT-3'
		},
		featured: {
			kicker: 'Trabajo publicado',
			title: 'Proyectos destacados',
			viewAll: 'Ver todos los proyectos'
		},
		audience: {
			hiring: {
				title: '¿Estás contratando?',
				highlight:
					'Lead Software Developer en Alt 94—migré la orquestación a LangGraph, mejorando el throughput del pipeline RAG un 30%.',
				ctaCv: 'Descargar CV',
				ctaCareer: 'Ver trayectoria'
			},
			freelance: {
				title: '¿Necesitás un freelancer?',
				items: ['Productos y MVPs', 'Features de IA: búsqueda, automatización, lenguaje']
			}
		},
		explore: {
			kicker: 'Profundizar',
			title: 'Explorar más'
		},
		groups: {
			profile: 'Perfil, carrera y formación',
			work: 'Trabajo y habilidades',
			connect: 'Contacto'
		},
		blurbs: {
			about:
				'Product Engineer · Desarrollador Full-Stack — llevando productos del boceto a producción.',
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
