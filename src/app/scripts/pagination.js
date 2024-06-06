// script.js
document.addEventListener('DOMContentLoaded', () => {
    const itemsPerPage = 5;
    let currentPage = 1;

    // Seleccionamos todos los divs con la clase 'card'
    const items = document.querySelectorAll('#grid-container > .card');
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageInfo = document.getElementById('page-info');

    const renderItems = () => {
        items.forEach((item, index) => {
            if (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        pageInfo.textContent = `${currentPage} / ${totalPages}`;

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    };

    prevButton.addEventListener('click', () => {
        currentPage--;
        renderItems();
    });

    nextButton.addEventListener('click', () => {
        currentPage++;
        renderItems();
    });

    renderItems();
});
