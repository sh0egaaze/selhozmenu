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
        this.showCartNotification();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    showCartNotification() {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '15px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        notification.textContent = 'Товар добавлен в корзину!';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 2000);
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
    
    // Визуальный фидбек на кнопке
    button.textContent = 'Добавлено';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = 'В корзину';
        button.style.backgroundColor = '';
    }, 2000);
}