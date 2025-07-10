// Sistema de gestión de noticias para TriInfinity
class NoticiasManager {
    constructor() {
        this.noticias = [];
        this.noticiasFiltradas = [];
        this.categoriaActual = 'todas';
        this.paginaActual = 1;
        this.noticiasPorPagina = 9;

        this.init();
    }

    init() {
        this.cargarNoticias();
        this.configurarEventos();
    }

    async cargarNoticias() {
        try {
            // Intentar cargar noticias desde archivos markdown
            const response = await this.cargarNoticiasDesdeArchivos();
            if (response && response.length > 0) {
                this.noticias = response;
            } else {
                // Si no hay noticias, mostrar noticias de ejemplo
                this.noticias = this.obtenerNoticiasEjemplo();
            }

            this.filtrarNoticias();
            this.mostrarNoticias();
        } catch (error) {
            console.log('Cargando noticias de ejemplo...');
            this.noticias = this.obtenerNoticiasEjemplo();
            this.filtrarNoticias();
            this.mostrarNoticias();
        }
    }

    async cargarNoticiasDesdeArchivos() {
        // Esta función intentará cargar las noticias desde los archivos markdown
        // generados por Netlify CMS
        try {
            const response = await fetch('/_noticias/');
            if (response.ok) {
                // Procesar archivos markdown si existen
                return await this.procesarArchivosMarkdown();
            }
        } catch (error) {
            console.log('No se pueden cargar noticias desde archivos:', error);
        }
        return null;
    }

    async procesarArchivosMarkdown() {
        // Esta función procesaría los archivos markdown
        // Por ahora retorna null para usar las noticias de ejemplo
        return null;
    }

    obtenerNoticiasEjemplo() {
        return [
            {
                id: 1,
                title: 'Gran éxito en el Triatlón de Madrid 2025',
                date: '2025-01-15',
                author: 'TriInfinity',
                category: 'competiciones',
                image: '/img/noticias/triatlon-madrid-2025.jpg',
                excerpt: 'Nuestros atletas brillaron en el Triatlón de Madrid con múltiples podios y mejores marcas personales.',
                content: `# Gran éxito en el Triatlón de Madrid 2025

El pasado fin de semana, el equipo de TriInfinity participó en el prestigioso Triatlón de Madrid 2025, obteniendo resultados excepcionales que nos llenan de orgullo.

## Resultados destacados

**Categoría Elite Masculina:**
- Miguel Rodríguez: 1º puesto con un tiempo de 1:52:30
- Carlos Fernández: 3º puesto con 1:54:15

**Categoría Elite Femenina:**
- Ana García: 2º puesto con un tiempo de 2:05:45
- Laura Martín: 5º puesto con 2:08:30

**Grupos de Edad:**
- Más de 15 atletas en el top 10 de sus respectivas categorías
- 8 nuevas marcas personales

## Un trabajo de equipo

Estos resultados son fruto del trabajo constante de nuestros atletas y el excelente trabajo de nuestro equipo técnico dirigido por Miguel Ángel Díaz García.

¡Enhorabuena a todos los participantes!`,
                featured: true
            },
            {
                id: 2,
                title: 'Nuevo entrenador de natación se incorpora al equipo',
                date: '2025-01-10',
                author: 'TriInfinity',
                category: 'club',
                image: '/img/noticias/nuevo-entrenador.jpg',
                excerpt: 'Damos la bienvenida a Carmen López, nueva entrenadora especializada en técnica de natación.',
                content: `# Nuevo entrenador de natación se incorpora al equipo

Estamos emocionados de anunciar la incorporación de **Carmen López** como nueva entrenadora especializada en técnica de natación para todos nuestros grupos.

## Experiencia y formación

Carmen cuenta con:
- Licenciada en Ciencias del Deporte
- 10 años de experiencia como entrenadora
- Especialización en técnica de crol y espalda
- Ex-nadadora profesional con múltiples títulos nacionales

## Sus objetivos

Carmen se enfocará en:
- Mejorar la técnica de natación de todos los grupos
- Implementar nuevos ejercicios específicos
- Trabajar en la eficiencia en el agua
- Reducir los tiempos de nado

¡Bienvenida al equipo, Carmen!`,
                featured: false
            },
            {
                id: 3,
                title: 'Apertura de inscripciones para la Escuela de Triatlón 2025',
                date: '2025-01-08',
                author: 'TriInfinity',
                category: 'eventos',
                image: '/img/noticias/escuela-2025.jpg',
                excerpt: 'Ya están abiertas las inscripciones para todos los grupos de nuestra escuela de triatlón.',
                content: `# Apertura de inscripciones para la Escuela de Triatlón 2025

¡Ya puedes inscribirte en nuestra Escuela de Triatlón para la temporada 2025!

## Grupos disponibles

### Iniciación (6-13 años)
- Enfoque lúdico y educativo
- Desarrollo de habilidades básicas
- 3 entrenamientos por semana

### Tecnificación - Grupo E (14-16 años)
- Introducción a la competición
- Entrenamientos más estructurados
- Participación en competiciones locales

### Alto Rendimiento - Grupo R (16-24 años)
- Entrenamientos de alto nivel
- 20 horas semanales de entrenamiento
- Objetivo: competiciones elite

## Cómo inscribirse

1. Contacta con nosotros en info@triinfinity.es
2. Reserva tu plaza llamando al 687 528 338
3. Ven a conocer nuestras instalaciones

¡Las plazas son limitadas!`,
                featured: false
            },
            {
                id: 4,
                title: 'Concentración de invierno en la Sierra de Madrid',
                date: '2025-01-05',
                author: 'TriInfinity',
                category: 'entrenamientos',
                image: '/img/noticias/concentracion-invierno.jpg',
                excerpt: 'Los grupos de alto rendimiento realizarán una concentración especial en la Sierra de Madrid.',
                content: `# Concentración de invierno en la Sierra de Madrid

Del 20 al 25 de enero, nuestros grupos de tecnificación y alto rendimiento participarán en una concentración especial en la Sierra de Madrid.

## Programa de entrenamiento

**Días 1-2: Adaptación a la altitud**
- Entrenamientos de natación técnica
- Rodajes suaves en bicicleta
- Carrera continua de baja intensidad

**Días 3-4: Intensidad progresiva**
- Series en piscina
- Entrenamientos de fuerza en ciclismo
- Trabajo de velocidad en carrera

**Día 5: Test y evaluación**
- Test de 1000m natación
- Test de 20 minutos en bicicleta
- Test de 3000m carrera

## Objetivos

- Preparación para la temporada 2025
- Mejora de la capacidad aeróbica
- Fortalecimiento del grupo
- Evaluación del estado de forma

¡Esperamos grandes resultados!`,
                featured: false
            },
            {
                id: 5,
                title: 'Las Retadas consiguen 3 podios en el Duatlón de Móstoles',
                date: '2025-01-03',
                author: 'TriInfinity',
                category: 'logros',
                image: '/img/noticias/retadas-podios.jpg',
                excerpt: 'El grupo Las Retadas demuestra una vez más su calidad con excelentes resultados.',
                content: `# Las Retadas consiguen 3 podios en el Duatlón de Móstoles

Una vez más, nuestro querido grupo **Las Retadas** nos ha llenado de orgullo con su participación en el Duatlón de Móstoles.

## Resultados destacados

**Categoría Femenina 40-45:**
- María José Ruiz: 1º puesto
- Carmen Delgado: 3º puesto

**Categoría Femenina 45-50:**
- Isabel Moreno: 2º puesto

## El espíritu de Las Retadas

Este grupo, formado por madres y mujeres trabajadoras, demuestra que con constancia y dedicación se pueden conseguir grandes logros deportivos.

Su lema "Si quieres, puedes" se hace realidad una vez más.

## Próximos objetivos

Las Retadas ya se preparan para:
- Triatlón Sprint de Tres Cantos
- Media Maratón de Madrid
- Duatlón de Soto del Real

¡Enhorabuena a todas!`,
                featured: true
            },
            {
                id: 6,
                title: 'Nuevo convenio con el Centro Deportivo Municipal',
                date: '2025-01-01',
                author: 'TriInfinity',
                category: 'club',
                image: '/img/noticias/convenio-municipal.jpg',
                excerpt: 'Ampliamos nuestras instalaciones con un nuevo convenio que beneficia a todos los socios.',
                content: `# Nuevo convenio con el Centro Deportivo Municipal

Comenzamos el 2025 con una excelente noticia: hemos firmado un nuevo convenio con el Centro Deportivo Municipal que ampliará nuestras posibilidades de entrenamiento.

## Qué incluye el convenio

- Acceso a piscina olímpica de 50 metros
- Uso de gimnasio de última generación
- Pista de atletismo homologada
- Salas de spinning y ciclo indoor

## Beneficios para nuestros socios

- Más horarios de entrenamiento disponibles
- Mejores instalaciones
- Actividades complementarias
- Tarifas especiales para socios

## Cuándo entra en vigor

El convenio será efectivo a partir del **15 de enero de 2025**.

Pronto publicaremos los nuevos horarios y cómo acceder a estas instalaciones.

¡Seguimos creciendo!`,
                featured: false
            }
        ];
    }

    configurarEventos() {
        // Filtros
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.cambiarFiltro(e.target.dataset.category);
            });
        });

        // Paginación
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.paginaActual > 1) {
                    this.paginaActual--;
                    this.mostrarNoticias();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const totalPaginas = Math.ceil(this.noticiasFiltradas.length / this.noticiasPorPagina);
                if (this.paginaActual < totalPaginas) {
                    this.paginaActual++;
                    this.mostrarNoticias();
                }
            });
        }

        // Modal
        const modalClose = document.getElementById('modalClose');
        const modalNoticia = document.getElementById('modalNoticia');

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.cerrarModal();
            });
        }

        if (modalNoticia) {
            modalNoticia.addEventListener('click', (e) => {
                if (e.target.id === 'modalNoticia') {
                    this.cerrarModal();
                }
            });
        }
    }

    cambiarFiltro(categoria) {
        // Actualizar botones
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        const botonFiltro = document.querySelector(`[data-category="${categoria}"]`);
        if (botonFiltro) {
            botonFiltro.classList.add('active');
        }

        // Filtrar y mostrar
        this.categoriaActual = categoria;
        this.paginaActual = 1;
        this.filtrarNoticias();
        this.mostrarNoticias();
    }

    filtrarNoticias() {
        if (this.categoriaActual === 'todas') {
            this.noticiasFiltradas = [...this.noticias];
        } else {
            this.noticiasFiltradas = this.noticias.filter(noticia =>
                noticia.category === this.categoriaActual
            );
        }

        // Ordenar por fecha (más recientes primero)
        this.noticiasFiltradas.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    mostrarNoticias() {
        const grid = document.getElementById('noticiasGrid');

        if (!grid) {
            console.error('Elemento noticiasGrid no encontrado');
            return;
        }

        if (this.noticiasFiltradas.length === 0) {
            grid.innerHTML = `
                <div class="no-noticias">
                    <i class="fas fa-newspaper"></i>
                    <h3>No hay noticias en esta categoría</h3>
                    <p>Selecciona otra categoría o vuelve más tarde.</p>
                </div>
            `;
            const paginacion = document.getElementById('paginacion');
            if (paginacion) {
                paginacion.style.display = 'none';
            }
            return;
        }

        // Calcular noticias para la página actual
        const inicio = (this.paginaActual - 1) * this.noticiasPorPagina;
        const fin = inicio + this.noticiasPorPagina;
        const noticiasPagina = this.noticiasFiltradas.slice(inicio, fin);

        // Generar HTML
        grid.innerHTML = noticiasPagina.map(noticia => this.generarCardNoticia(noticia)).join('');

        // Configurar eventos de click
        grid.querySelectorAll('.noticia-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                this.abrirModal(id);
            });
        });

        // Actualizar paginación
        this.actualizarPaginacion();
    }

    generarCardNoticia(noticia) {
        const fecha = new Date(noticia.date).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const categoriaTexto = this.obtenerTextoCategoria(noticia.category);

        return `
            <div class="noticia-card ${noticia.featured ? 'destacada' : ''}" data-id="${noticia.id}">
                <div class="noticia-imagen ${!noticia.image ? 'no-image' : ''}">
                    ${noticia.image
                ? `<img src="${noticia.image}" alt="${noticia.title}" onerror="this.parentElement.innerHTML='<i class=\\"fas fa-newspaper\\"></i>'">`
                : '<i class="fas fa-newspaper"></i>'
            }
                    ${noticia.featured ? '<div class="badge-destacada">Destacada</div>' : ''}
                </div>
                <div class="noticia-contenido">
                    <div class="noticia-meta">
                        <span class="noticia-categoria">${categoriaTexto}</span>
                        <span class="noticia-fecha">${fecha}</span>
                    </div>
                    <h3 class="noticia-titulo">${noticia.title}</h3>
                    <p class="noticia-resumen">${noticia.excerpt}</p>
                    <div class="noticia-footer">
                        <span class="noticia-autor">Por ${noticia.author}</span>
                        <span class="leer-mas">Leer más <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            </div>
        `;
    }

    obtenerTextoCategoria(categoria) {
        const categorias = {
            'competiciones': 'Competiciones',
            'club': 'Club',
            'eventos': 'Eventos',
            'entrenamientos': 'Entrenamientos',
            'logros': 'Logros'
        };
        return categorias[categoria] || 'General';
    }

    actualizarPaginacion() {
        const totalPaginas = Math.ceil(this.noticiasFiltradas.length / this.noticiasPorPagina);
        const paginacion = document.getElementById('paginacion');

        if (!paginacion) return;

        if (totalPaginas <= 1) {
            paginacion.style.display = 'none';
            return;
        }

        paginacion.style.display = 'flex';

        // Actualizar estado de botones
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.disabled = this.paginaActual === 1;
        }

        if (nextBtn) {
            nextBtn.disabled = this.paginaActual === totalPaginas;
        }

        // Actualizar información de página
        const infoElemento = document.getElementById('pageInfo');
        if (infoElemento) {
            infoElemento.textContent = `Página ${this.paginaActual} de ${totalPaginas}`;
        }
    }

    abrirModal(id) {
        const noticia = this.noticias.find(n => n.id === id);
        if (!noticia) return;

        const modal = document.getElementById('modalNoticia');
        if (!modal) return;

        const fecha = new Date(noticia.date).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        const categoriaTexto = this.obtenerTextoCategoria(noticia.category);

        // Convertir markdown a HTML básico
        const contenidoHTML = this.convertirMarkdownAHTML(noticia.content);

        modal.innerHTML = `
            <div class="modal-contenido">
                <div class="modal-header">
                    <button class="modal-close" id="modalClose">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="modal-imagen">
                        ${noticia.image
                ? `<img src="${noticia.image}" alt="${noticia.title}" onerror="this.style.display='none'">`
                : '<div class="no-image-modal"><i class="fas fa-newspaper"></i></div>'
            }
                    </div>
                    <div class="modal-info">
                        <div class="modal-meta">
                            <span class="modal-categoria">${categoriaTexto}</span>
                            <span class="modal-fecha">${fecha}</span>
                        </div>
                        <h1 class="modal-titulo">${noticia.title}</h1>
                        <div class="modal-autor">Por ${noticia.author}</div>
                        <div class="modal-contenido-texto">
                            ${contenidoHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Reconfigurar evento de cerrar modal
        const modalClose = modal.querySelector('#modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.cerrarModal();
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.cerrarModal();
            }
        });

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    convertirMarkdownAHTML(markdown) {
        // Conversión básica de markdown a HTML
        return markdown
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(?!<[h|u|l])/gm, '<p>')
            .replace(/$/gm, '</p>')
            .replace(/<p><\/p>/g, '')
            .replace(/<p>(<h[1-6]>.*<\/h[1-6]>)<\/p>/g, '$1')
            .replace(/<p>(<ul>.*<\/ul>)<\/p>/g, '$1');
    }

    cerrarModal() {
        const modal = document.getElementById('modalNoticia');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Método para agregar nuevas noticias (para uso futuro con CMS)
    agregarNoticia(noticia) {
        noticia.id = this.noticias.length > 0 ? Math.max(...this.noticias.map(n => n.id)) + 1 : 1;
        this.noticias.unshift(noticia);
        this.filtrarNoticias();
        this.mostrarNoticias();
    }

    // Método para buscar noticias
    buscarNoticias(termino) {
        const terminoLower = termino.toLowerCase();
        this.noticiasFiltradas = this.noticias.filter(noticia =>
            noticia.title.toLowerCase().includes(terminoLower) ||
            noticia.excerpt.toLowerCase().includes(terminoLower) ||
            noticia.content.toLowerCase().includes(terminoLower)
        );
        this.paginaActual = 1;
        this.mostrarNoticias();
    }
}

// Inicializar el gestor de noticias cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    window.noticiasManager = new NoticiasManager();
});

// Función global para buscar noticias (para uso desde HTML)
function buscarNoticias(termino) {
    if (window.noticiasManager) {
        window.noticiasManager.buscarNoticias(termino);
    }
}