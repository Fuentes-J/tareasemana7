// Variables
const allContainerCart = document.querySelector('.products');
const containerBuyCart = document.querySelector('.card-items');
const priceTotal = document.querySelector('.price-total');
const amountProduct = document.querySelector('.count-product');
const btnPay = document.querySelector('.btn-pay'); // Nuevo

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

// Functions
function loadEventListeners() {
    allContainerCart.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);
    btnPay.addEventListener('click', handlePayment); // Nuevo
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id === deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard -= priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct -= 1; // Updated countProduct correctly

        if (buyThings.length === 0) {
            priceTotal.innerHTML = '0';
            amountProduct.innerHTML = '0';
        }
        loadHtml();
    }
}

function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    };

    totalCard = (parseFloat(totalCard) + parseFloat(infoProduct.price)).toFixed(2);

    const existingProduct = buyThings.find(product => product.id === infoProduct.id);
    if (existingProduct) {
        existingProduct.amount++;
    } else {
        buyThings.push(infoProduct);
        countProduct++;
    }
    
    loadHtml();
}

function loadHtml() {
    clearHtml();
    buyThings.forEach(product => {
        const { image, title, price, amount, id } = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">Q${price}</h5>
                <h6>Amount:${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        containerBuyCart.appendChild(row);
    });

    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = countProduct;
}

function clearHtml() {
    containerBuyCart.innerHTML = '';
}

// Nueva función para manejar el pago
function handlePayment() {
    if (buyThings.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    // Aquí puedes agregar lógica para redirigir al usuario a una página de pago,
    // mostrar un mensaje de confirmación, o procesar el pago de cualquier manera
    alert(`El total a pagar es Q ${totalCard}. Proceso de pago en desarrollo...`);

    // Por ejemplo, redirigir a una página de pago
    // window.location.href = 'pago.html';
}

// Inicializar
loadEventListeners();

document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener el nombre y comentario del formulario
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    // Crear un nuevo elemento de comentario
    const commentItem = document.createElement('li');
    commentItem.classList.add('comment-item');
    commentItem.textContent = `${name}: ${comment}`;

    // Agregar el comentario a la lista
    document.getElementById('commentList').appendChild(commentItem);

    // Limpiar el formulario
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
});