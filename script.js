let cart = [];
let total = 0;

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - Q${item.price.toFixed(2)}`;
        cartItems.appendChild(itemElement);
    });

    document.getElementById('total').textContent = `Total: Q${total.toFixed(2)}`;
}

function checkout() {
    alert(`Gracias por tu compra. El total es Q${total.toFixed(2)}`);
    cart = [];
    total = 0;
    updateCart();
}

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
