// Espera a que todo el contenido HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Selecciona todos los botones de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // 2. Selecciona todas las secciones de trabajo que tienen una categoría
    const workSections = document.querySelectorAll('.work-section[data-category]');

    // 3. Añade un "oyente" de clic a CADA botón
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // Obtiene el valor del filtro del botón (ej: "all", "pantallas", "motion")
            const filterValue = button.dataset.filter;

            // --- Lógica para activar/desactivar botones ---
            // Primero, quita la clase "active" de TODOS los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Luego, añade la clase "active" SOLO al botón que clickeaste
            button.classList.add('active');


            // --- Lógica para mostrar/ocultar secciones ---
            workSections.forEach(section => {
                
                // Si el filtro es "all"
                if (filterValue === 'all') {
                    // Muestra la sección (quitando la clase que la oculta)
                    section.classList.remove('hidden-by-filter');
                
                // Si el filtro NO es "all"
                } else {
                    // Comprueba si la categoría de la sección coincide con el filtro
                    if (section.dataset.category === filterValue) {
                        // Si coincide, muéstrala
                        section.classList.remove('hidden-by-filter');
                    } else {
                        // Si NO coincide, ocúltala
                        section.classList.add('hidden-by-filter');
                    }
                }
            });
        });
    });
});

