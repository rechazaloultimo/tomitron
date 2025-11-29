// src/js/global-router.js

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. CONSTANTES Y SELECTORES
    // ----------------------------------------------------
    const buttons = document.querySelectorAll('.load-content-btn');
    const contentPanels = document.querySelectorAll('.content-panel');
    const mountContainer = document.getElementById('main-content-mount');
    const worksDropdown = document.getElementById('works-dropdown'); 

    // Clases CSS
    const ACTIVE_CLASS = 'is-active'; 
    const HIDDEN_CLASS = 'hidden';
    const TRANSITION_DURATION = 500; // Debe coincidir con tu CSS

    // ----------------------------------------------------
    // 2. FUNCIÓN DE FALLBACK: Abrir About
    // ----------------------------------------------------
    const fallbackToAbout = () => {
        const aboutPanel = document.getElementById('content-about');
        
        // Evitar que se abra si ya está activo
        if (aboutPanel && !aboutPanel.classList.contains(ACTIVE_CLASS)) {
            // 1. Quitar 'hidden' para que 'display: block' se aplique.
            aboutPanel.classList.remove(HIDDEN_CLASS);

            // 2. Pequeño delay para aplicar la transición de entrada
            setTimeout(() => {
                aboutPanel.classList.add(ACTIVE_CLASS);
                
                // Opcional: Volver a hacer scroll hacia el About
                if (mountContainer) {
                    const offset = 90; 
                    const targetPosition = mountContainer.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }, 50); 
        }
    };

    // ----------------------------------------------------
    // 3. LISTENERS DE CLIC
    // ----------------------------------------------------
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);

            // CERRAR submenú de WORKS (UX)
            if (worksDropdown && worksDropdown.classList.contains('submenu-open')) {
                worksDropdown.classList.remove('submenu-open');
            }

            // A) Lógica de TOGGLE (Si el panel ya está activo, cerrarlo)
            if (targetPanel && targetPanel.classList.contains(ACTIVE_CLASS)) {
                
                // Cierre: Remueve activo (fade-out)
                targetPanel.classList.remove(ACTIVE_CLASS);
                
                // Ocultar y luego forzar el fallback a About
                setTimeout(() => {
                    targetPanel.classList.add(HIDDEN_CLASS);
                    // ⚠️ Si cierras un panel, automáticamente abrimos About
                    fallbackToAbout(); 
                }, TRANSITION_DURATION);

                return; // Detener el flujo para no abrir otro panel
            }
            
            // B) Apertura de un nuevo panel
            if (targetPanel) {
                
                // 1. Ocultar y desactivar todos los paneles activos (fade-out)
                contentPanels.forEach(panel => {
                    if (panel.classList.contains(ACTIVE_CLASS)) {
                        panel.classList.remove(ACTIVE_CLASS);
                        setTimeout(() => panel.classList.add(HIDDEN_CLASS), TRANSITION_DURATION);
                    }
                });

                // 2. Mostrar el panel seleccionado (fade-in)
                targetPanel.classList.remove(HIDDEN_CLASS);

                setTimeout(() => {
                    targetPanel.classList.add(ACTIVE_CLASS);

                    // CÓDIGO DE SCROLL
                    if (mountContainer) {
                        const offset = 90; 
                        const targetPosition = mountContainer.getBoundingClientRect().top + window.scrollY - offset;

                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                }, 50); 
            } else {
                // C) Fallback si el targetId no se encuentra
                 fallbackToAbout();
            }
        });
    });

    // ----------------------------------------------------
    // 4. INICIALIZACIÓN (Estado de la página al cargar)
    // ----------------------------------------------------
    const initialPanelId = 'content-about';
    const initialPanel = document.getElementById(initialPanelId);
    
    // 1. Ocultamos TODOS los paneles (estado de reposo)
    contentPanels.forEach(panel => {
        panel.classList.remove(ACTIVE_CLASS);
        panel.classList.add(HIDDEN_CLASS); 
    });

    // 2. Mostramos el panel inicial ('About')
    if (initialPanel) {
        // Aseguramos que se puede ver (display: block)
        initialPanel.classList.remove(HIDDEN_CLASS);
        
        // Aplicamos el estado activo (dispara el fade-in)
        setTimeout(() => {
            initialPanel.classList.add(ACTIVE_CLASS);
        }, 100); 
    }
});