// Extraer los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const url = `http://localhost:5000/api/products/` + id;

// Función para construir la URL del producto
function getProductUrl(id) {
    return `http://localhost:5000/api/products/` + id;
}

// Función asincrónica para obtener los datos del producto desde la API
async function fetchProductData(id) {
    const url = getProductUrl(id);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Extraer los datos necesarios
        const title = data.title;
        const description = data.description;
        const price = data.regular_price;
        const image = data.picture;
        const stock = data.stock_quantity;
        const size = data.size;

        console.log(size);
        // Retornar los datos
        return {
            title,
            description,
            price,
            image,
            size,
            stock
        };

    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

// Función para actualizar la interfaz de usuario con los datos obtenidos
function updateUI(data, id) {
    if (data) {
        document.getElementById('title').textContent = data.title;
        document.getElementById('description').textContent = data.description;
        document.getElementById('price').textContent = `${data.price}$`;
        document.getElementById('id').textContent = id;
        document.getElementById('image').setAttribute('src', data.image);
    }
}

let maxStock;

document.addEventListener('DOMContentLoaded', () => {
    fetchProductData(id).then(data => {
        updateUI(data, id)
        maxStock = data.stock;
    });


});


// Nombre de la clave en localStorage
var clave = 'ProductsList';


const buyButton = document.getElementById('buy-btn');
const sizeBTNS = document.querySelectorAll('.sizeBTN');
const addBigButton = document.getElementById('add-big-btn');
const addSmallButton = document.getElementById('add-small-btn');

if (buyButton){
    buyButton.addEventListener('click', buyItem);
}

if (addBigButton){
    addBigButton.addEventListener('click', addItem);
}

if (addSmallButton){
    addSmallButton.addEventListener('click', addItem);
}



let selectedSize;

sizeBTNS.forEach(function (boton) {
    boton.addEventListener('focus', function () {
        // Elimina la clase de foco de todos los botones
        sizeBTNS.forEach(btn => btn.classList.remove('bg-[#FB823B]'));

        // Agrega la clase de foco al botón seleccionado
        boton.classList.add('bg-[#FB823B]');

        selectedSize = boton.textContent
    });
});


// BUY FUNCTION
function buyItem() {
    if (selectedSize !== undefined) {
        // Recuperar el array de localStorage y parsearlo
        var arrayExistente = JSON.parse(localStorage.getItem(clave)) || [];

        // Crear un nuevo objeto con el nuevo ítem
        let newItem = {
            id: id,
            title: '',
            price: "",
            size: "",
            quantity: 1
        };

        newItem.title = document.getElementById('title').textContent;
        newItem.price = document.getElementById('price').textContent;
        newItem.size = selectedSize;

        console.log(newItem.size);

        // Calcular la cantidad total de elementos que tienen la misma ID que el nuevo elemento
        let totalQuantitySameId = arrayExistente.reduce((total, product) => {
            if (product.id === newItem.id) {
                return total + product.quantity;
            } else {
                return total;
            }
        }, 0);

        // Verificar si la cantidad total de elementos con la misma ID más la cantidad del nuevo elemento excede el límite de stock
        if (totalQuantitySameId + 1 <= maxStock) {
            let existingItem = arrayExistente.find(product => product.id === newItem.id && product.size === newItem.size);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                arrayExistente.push(newItem);
            }
            localStorage.setItem(clave, JSON.stringify(arrayExistente));
        } else {
            alert('¡Límite de stock alcanzado para este producto!');
            return; // Salir de la función si se ha alcanzado el límite de stock
        }

        // Actualizar el total de la cantidad y el precio en la interfaz de usuario
        let totalQuantity = arrayExistente.reduce((total, product) => {
            return total + product.quantity;
        }, 0);

        document.getElementById('shopping-cart-alert-text').textContent = totalQuantity;

        let totalPrice = arrayExistente.reduce((total, product) => {
            let priceNumber = parseFloat(String(product.price).replace(/[^\d.-]/g, ''));
            return total + (isNaN(priceNumber) ? 0 : priceNumber) * product.quantity;
        }, 0);

        document.getElementById('total-price').textContent = 'Total: ' + totalPrice + '$';

        // Redirigir a otra página
        window.location.href = '/checkout'; // Cambia 'nueva_pagina.html' por la URL a la que quieres redirigir
    } else {
        alert("Select one size")
    }

}



function addItem() {

    if (selectedSize !== undefined) {
        // Recuperar el array de localStorage y parsearlo
        var arrayExistente = JSON.parse(localStorage.getItem(clave));

        // Crear un nuevo objeto con el nuevo ítem
        let newItem = {
            id: id,
            title: '',
            price: "",
            size: "",
            quantity: 1
        };

        newItem.title = document.getElementById('title').textContent;
        newItem.price = document.getElementById('price').textContent;
        newItem.size += selectedSize;

        console.log(newItem.size)

        // Buscar si el item con la misma id ya existe
        if (Array.isArray(arrayExistente)) {
            if (arrayExistente.length === 0) {
                // Agregar el nuevo item al array
                arrayExistente.push(newItem);

                // Guardar el array actualizado en localStorage
                localStorage.setItem(clave, JSON.stringify(arrayExistente));


                let totalPrice = arrayExistente.reduce((total, product) => {
                    // Asegurarse de que price es una cadena y usar una expresión regular para extraer el número
                    let priceString = String(product.price);
                    let priceNumber = parseFloat(priceString.replace(/[^\d.-]/g, ''));

                    // Asegurarse de que quantity es una cadena y usar una expresión regular para extraer el número
                    let quantityString = String(product.quantity);
                    let quantityNumber = parseFloat(quantityString.replace(/[^\d.-]/g, ''));

                    return total + (isNaN(priceNumber) ? 0 : priceNumber) * (isNaN(quantityNumber) ? 0 :
                        quantityNumber);
                }, 0);

                document.getElementById('total-price').textContent = 'Total: ' + totalPrice + '$';

                // Calcular la cantidad total y el precio total de los productos existentes, incluyendo el nuevo item si se agregó
                let totalQuantity = arrayExistente.reduce((total, product) => {
                    // Asegurarse de que quantity es una cadena y usar una expresión regular para extraer el número
                    let quantityString = String(product.quantity);
                    let quantityNumber = parseFloat(quantityString.replace(/[^\d.-]/g, ''));

                    return total + (isNaN(quantityNumber) ? 0 : quantityNumber);
                }, 0);

                document.getElementById('shopping-cart-alert-text').textContent = totalQuantity;


            } else {
                //console.log('no esta vacio');
                let existingItem = arrayExistente.find(product => product.id === newItem.id && product.size === newItem.size);

                // Calcular la cantidad total de elementos que tienen la misma ID que el nuevo elemento
                let totalQuantitySameId = arrayExistente.reduce((total, product) => {
                    if (product.id === newItem.id) {
                        return total + product.quantity;
                    } else {
                        return total;
                    }
                }, 0);

                if (totalQuantitySameId + 1 <= maxStock) {
                    if (existingItem) {

                        if (existingItem.quantity < maxStock) {

                            existingItem.quantity += 1;
                            localStorage.setItem(clave, JSON.stringify(arrayExistente));

                        } else {
                            alert('Stock Superado')
                        }

                    } else {

                        let sameIdDifferentSizeItem = arrayExistente.find(product => product.id === newItem.id && product.size !== newItem.size);
                        if (sameIdDifferentSizeItem) {
                            // Si existe un elemento con la misma ID pero un tamaño diferente, agregar el nuevo item al array
                            arrayExistente.push(newItem);
                            localStorage.setItem(clave, JSON.stringify(arrayExistente));
                        } else {
                            // Si no hay un elemento existente con la misma ID y tamaño, agregar el nuevo item al array
                            arrayExistente.push(newItem);
                            localStorage.setItem(clave, JSON.stringify(arrayExistente));
                        }
                    }
                } else {
                    alert("No more Avialiable");
                }




                // Calcular la cantidad total y el precio total de los productos existentes, incluyendo el nuevo item si se agregó
                let totalQuantity = arrayExistente.reduce((total, product) => {
                    // Asegurarse de que quantity es una cadena y usar una expresión regular para extraer el número
                    let quantityString = String(product.quantity);
                    let quantityNumber = parseFloat(quantityString.replace(/[^\d.-]/g, ''));

                    return total + (isNaN(quantityNumber) ? 0 : quantityNumber);
                }, 0);

                document.getElementById('shopping-cart-alert-text').textContent = totalQuantity;

                let totalPrice = arrayExistente.reduce((total, product) => {
                    // Asegurarse de que price es una cadena y usar una expresión regular para extraer el número
                    let priceString = String(product.price);
                    let priceNumber = parseFloat(priceString.replace(/[^\d.-]/g, ''));

                    // Asegurarse de que quantity es una cadena y usar una expresión regular para extraer el número
                    let quantityString = String(product.quantity);
                    let quantityNumber = parseFloat(quantityString.replace(/[^\d.-]/g, ''));

                    return total + (isNaN(priceNumber) ? 0 : priceNumber) * (isNaN(quantityNumber) ? 0 :
                        quantityNumber);
                }, 0);

                document.getElementById('total-price').textContent = 'Total: ' + totalPrice + '$';

            }
        }
    } else {
        alert("Select one size")
    }

};