// Definición de Tipos
type ProductData = {
    title: string;
    description: string;
    price: string;
    image: string;
    stock: number;
    size: string;
};

type CartItem = {
    id: string;
    title: string;
    price: string;
    size: string;
    quantity: number;
};

// Extraer los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id') as string;
const url = `http://localhost:5000/api/products/${id}`;
console.log(url + "    ID:" + id);

// Nombre de la clave en localStorage
const localStorageKey = 'ProductsList';

// Declaración de variables
let maxStock: number;
let selectedSize: string;

// Función para construir la URL del producto
function getProductUrl(id: string): string {
    return `http://localhost:5000/api/products/${id}`;
}

// Función asincrónica para obtener los datos del producto desde la API
async function fetchProductData(id: string): Promise<ProductData | undefined> {
    const url = getProductUrl(id);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Datos obtenidos:", data);

        // Extraer los datos necesarios
        const title = data.title;
        const description = data.description;
        const price = data.regular_price;
        const image = data.picture;
        const stock = data.stock_quantity;
        const size = data.size;

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
function updateUI(data: ProductData, id: string): void {
    if (data) {
        document.getElementById('title')!.textContent = data.title;
        document.getElementById('description')!.textContent = data.description;
        document.getElementById('price')!.textContent = `${data.price}$`;
        document.getElementById('id')!.textContent = id;
        document.getElementById('image')!.setAttribute('src', data.image);
    } else {
        console.error("No se pudo actualizar la UI: Datos de producto indefinidos");
    }
}

// BUY FUNCTION
function buyItem(): void {
    if (selectedSize !== undefined) {
        // Recuperar el array de localStorage y parsearlo
        let arrayExistente: CartItem[] = JSON.parse(localStorage.getItem(localStorageKey)!) || [];

        // Crear un nuevo objeto con el nuevo ítem
        let newItem: CartItem = {
            id: id,
            title: document.getElementById('title')!.textContent || '',
            price: document.getElementById('price')!.textContent || '',
            size: selectedSize,
            quantity: 1
        };

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
            localStorage.setItem(localStorageKey, JSON.stringify(arrayExistente));
        } else {
            alert('¡Límite de stock alcanzado para este producto!');
            return; // Salir de la función si se ha alcanzado el límite de stock
        }

        // Actualizar el total de la cantidad y el precio en la interfaz de usuario
        let totalQuantity = arrayExistente.reduce((total, product) => {
            return total + product.quantity;
        }, 0);

        document.getElementById('shopping-cart-alert-text')!.textContent = totalQuantity.toString();

        let totalPrice = arrayExistente.reduce((total, product) => {
            let priceNumber = parseFloat(product.price.replace(/[^\d.-]/g, ''));
            return total + (isNaN(priceNumber) ? 0 : priceNumber) * product.quantity;
        }, 0);

        document.getElementById('total-price')!.textContent = 'Total: ' + totalPrice + '$';

        // Redirigir a otra página
        window.location.href = '/checkout';
    } else {
        alert("Select one size");
    }
}

// Event Listeners para botones de añadir y comprar
document.addEventListener('DOMContentLoaded', () => {
    fetchProductData(id).then(data => {
        if (data) {
            updateUI(data, id);
            maxStock = data.stock;
        }
    });

    const buyButton = document.getElementById('buy-btn');
    const addBigButton = document.getElementById('add-big-btn');
    const addSmallButton = document.getElementById('add-small-btn');
    const sizeBTNs = document.querySelectorAll<HTMLButtonElement>('.sizeBTN');

    if (buyButton) {
        buyButton.addEventListener('click', buyItem);
    }

    if (addBigButton) {
        addBigButton.addEventListener('click', addItem);
    }

    if (addSmallButton) {
        addSmallButton.addEventListener('click', addItem);
    }

    sizeBTNs.forEach((boton) => {
        boton.addEventListener('focus', () => {
            sizeBTNs.forEach(btn => btn.classList.remove('bg-[#FB823B]'));
            boton.classList.add('bg-[#FB823B]');
            selectedSize = boton.textContent!;
        });
    });
});


function addItem(): void {
    if (selectedSize !== undefined) {
        let arrayExistente: CartItem[] = JSON.parse(localStorage.getItem(localStorageKey)!) || [];

        let newItem: CartItem = {
            id: id,
            title: document.getElementById('title')!.textContent || '',
            price: document.getElementById('price')!.textContent || '',
            size: selectedSize,
            quantity: 1
        };

        // Calcular la cantidad total de elementos que tienen la misma ID que el nuevo elemento
        let totalQuantitySameId = arrayExistente.reduce((total, product) => {
            if (product.id === newItem.id) {
                return total + product.quantity;
            } else {
                return total;
            }
        }, 0);

        if (totalQuantitySameId + 1 <= maxStock) {
            let existingItem = arrayExistente.find(product => product.id === newItem.id && product.size === newItem.size);

            if (existingItem) {
                if (existingItem.quantity < maxStock) {
                    existingItem.quantity += 1;
                } else {
                    alert('Stock Superado');
                }
            } else {
                arrayExistente.push(newItem);
            }
            localStorage.setItem(localStorageKey, JSON.stringify(arrayExistente));

            let totalQuantity = arrayExistente.reduce((total, product) => {
                return total + product.quantity;
            }, 0);

            document.getElementById('shopping-cart-alert-text')!.textContent = totalQuantity.toString();

            let totalPrice = arrayExistente.reduce((total, product) => {
                let priceNumber = parseFloat(product.price.replace(/[^\d.-]/g, ''));
                return total + (isNaN(priceNumber) ? 0 : priceNumber) * product.quantity;
            }, 0);

            document.getElementById('total-price')!.textContent = 'Total: ' + totalPrice + '$';
        } else {
            alert("No more Available");
        }
    } else {
        alert("Select one size");
    }
}

