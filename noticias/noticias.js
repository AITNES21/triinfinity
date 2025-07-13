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
            const response = await fetch('/noticias.json');
            if (response.ok) {
                this.noticias = await response.json();
            } else {
                this.noticias = [];
            }
            this.filtrarNoticias();
            this.mostrarNoticias();
        } catch (error) {
            this.noticias = [];
            this.filtrarNoticias();
            this.mostrarNoticias();
        }
    }

    configurarEventos() {
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.cambiarFiltro(e.target.dataset.category);
            });
        });

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

        this.configurarModal();
    }

    configurarModal() {
        const modal = document.getElementById('modalNoticia');

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                this.cerrarModal();
            }
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.cerrarModal();
            }
        });
    }

    cambiarFiltro(categoria) {
        document.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        const botonFiltro = document.querySelector(`[data-category="${categoria}"]`);
        if (botonFiltro) {
            botonFiltro.classList.add('active');
        }

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

        const inicio = (this.paginaActual - 1) * this.noticiasPorPagina;
        const fin = inicio + this.noticiasPorPagina;
        const noticiasPagina = this.noticiasFiltradas.slice(inicio, fin);

        grid.innerHTML = noticiasPagina.map(noticia => this.generarCardNoticia(noticia)).join('');

        grid.querySelectorAll('.noticia-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                this.abrirModal(id);
            });
        });

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
                ? `<img src="${noticia.image}" alt="${noticia.title}" onerror="this.parentElement.classList.add('no-image'); this.style.display='none'; this.parentElement.innerHTML+='<i class=\\"fas fa-newspaper\\"></i>'">`
                : '<i class="fas fa-newspaper"></i>'
            }
                </div>
                <div class="noticia-content">
                    <div class="noticia-meta">
                        <span class="noticia-fecha">${fecha}</span>
                        <span class="noticia-categoria">${categoriaTexto}</span>
                    </div>
                    <h3 class="noticia-titulo">${noticia.title}</h3>
                    <p class="noticia-excerpt">${noticia.excerpt}</p>
                    <div class="noticia-autor">Por ${noticia.author}</div>
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

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.disabled = this.paginaActual === 1;
        }

        if (nextBtn) {
            nextBtn.disabled = this.paginaActual === totalPaginas;
        }

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
        const contenidoHTML = this.convertirMarkdownAHTML(noticia.content);

        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="noticiasManager.cerrarModal()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="modal-noticia-header ${!noticia.image ? 'no-image' : ''}">
                    ${noticia.image
                ? `<img src="${noticia.image}" alt="${noticia.title}" onerror="this.parentElement.classList.add('no-image'); this.style.display='none'; this.parentElement.innerHTML+='<i class=\\"fas fa-newspaper\\"></i>'">`
                : '<i class="fas fa-newspaper"></i>'
            }
                </div>
                <div class="modal-noticia-body">
                    <div class="modal-noticia-meta">
                        <div>
                            <span class="noticia-categoria">${categoriaTexto}</span>
                            <span class="noticia-fecha">${fecha}</span>
                        </div>
                        <div class="noticia-autor">Por ${noticia.author}</div>
                    </div>
                    <h1 class="modal-noticia-titulo">${noticia.title}</h1>
                    <div class="modal-noticia-content">
                        ${contenidoHTML}
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    convertirMarkdownAHTML(markdown) {
        return markdown
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$2</h2>')
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
}

document.addEventListener('DOMContentLoaded', () => {
    window.noticiasManager = new NoticiasManager();
});

function buscarNoticias(termino) {
    if (window.noticiasManager) {
        window.noticiasManager.buscarNoticias(termino);
    }
}