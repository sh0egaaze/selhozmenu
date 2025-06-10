class Cart {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('cart')) || {};
    }

    addItem(product) {
        if (this.cartItems[product.id]) {
            this.cartItems[product.id].quantity++;
        } else {
            this.cartItems[product.id] = {
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            };
        }
        this.saveCart();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
}

const cart = new Cart();

function addToCart(button) {
    const product = {
        id: button.dataset.productId,
        name: button.dataset.productName,
        price: parseInt(button.dataset.productPrice),
        image: button.dataset.productImage
    };

    cart.addItem(product);
    
    button.textContent = 'Добавлено';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = 'В корзину';
        button.style.backgroundColor = '';
    }, 2000);
}
