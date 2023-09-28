'use strict';

const cart = load();
drawCart(cart);

function save(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function load() {
    return JSON.parse(localStorage.getItem('cart') || '{}');
}

function animate(elem, stepX, stepY, quantitySteps) {
    function draw(elem, stepX, stepY, quantitySteps) {
        if (quantitySteps !== 0) {
            quantitySteps--;
            elem.style.left = `${parseInt(elem.style.left) + stepX}px`;
            elem.style.top = `${parseInt(elem.style.top) + stepY}px`;
            setTimeout(draw, 20, elem, stepX, stepY, quantitySteps);
        } else {
            elem.remove();
        }
    }

    setTimeout(draw, 20, elem, stepX, stepY, quantitySteps);
}

function createFlyingEl(e) {
    //Create El
    const product = e.target.closest('.product');
    const key = product.dataset.id;
    const flyingEl = document.createElement('img');
    // Get start X Y
    document.querySelector('body').insertAdjacentElement('afterbegin', flyingEl);
    flyingEl.classList.add('flying_el');
    flyingEl.src = product.querySelector('.product__image').src;

    const originImgRect = product.querySelector('.product__image').getBoundingClientRect();

    let startX = originImgRect.left + window.scrollX;
    let startY = originImgRect.top + window.scrollY;

    flyingEl.style.top = `${startY}px`;
    flyingEl.style.left = `${startX}px`;

    let finishImgRect;

    for (let cartProduct of document.querySelectorAll('.cart_product_wrp')) {
        if (cartProduct.dataset.id === key) {
            finishImgRect = cartProduct.querySelector('.cart__product-image').getBoundingClientRect()
            break;
        }
    }

    let finishX = finishImgRect.left + window.scrollX;
    let finishY = finishImgRect.top + ((finishImgRect.height - flyingEl.getBoundingClientRect().height) / 2) + window.scrollY;
    let quantitySteps = 20;
    let stepX = (finishX - startX) / quantitySteps;
    let stepY = (finishY - startY) / quantitySteps;
    animate(flyingEl, stepX, stepY, quantitySteps);
}


function removeFromCart(cart, key) {
    delete cart[key];
    save(cart);
    drawCart(cart);
}

function drawCart(cart) {
    document.querySelector('.cart__products').innerHTML = '';
    document.querySelector('.cart__products').style.display = 'none';
    for (let key of Object.keys(cart)) {
        document.querySelector('.cart__products').style.display = 'flex';

        const cartProduct = document.createElement('div');
        const cartProductImg = document.createElement('img');
        const cartProductCount = document.createElement('div');

        const productCardWrp = document.createElement('div');
        document.querySelector('.cart__products').appendChild(productCardWrp);
        productCardWrp.appendChild(cartProduct);
        cartProduct.appendChild(cartProductImg);
        cartProduct.appendChild(cartProductCount);

        cartProduct.classList.add('cart__product');
        cartProductImg.classList.add('cart__product-image');
        cartProductCount.classList.add('cart__product-count');
        productCardWrp.classList.add('cart_product_wrp');

        productCardWrp.dataset.id = key;
        cartProductImg.src = cart[key].imgSrc;
        cartProductCount.textContent = cart[key].quantity;

        const cartButtons = document.createElement('div');
        const btnRemove = document.createElement('div');
        const controls = document.createElement('div');
        const controlDec = document.createElement('div');
        const controlInc = document.createElement('div');

        productCardWrp.appendChild(cartButtons);
        cartButtons.appendChild(controls);
        controls.appendChild(controlDec);
        controls.appendChild(controlInc);
        cartButtons.appendChild(btnRemove);

        btnRemove.classList.add('product__remove');
        controls.classList.add('product__quantity-controls');
        controlDec.classList.add('cartProduct__quantity-control', 'product__quantity-control_dec');
        controlInc.classList.add('cartProduct__quantity-control', 'product__quantity-control_inc');

        btnRemove.append('Удалить');
        controlDec.append('-');
        controlInc.append('+');

        btnRemove.addEventListener('click', e => removeFromCart(cart, key));
    }
    for (let controlsInCart of document.querySelectorAll('.cartProduct__quantity-control')) {
        controlsInCart.addEventListener('click', e => changeQuantity(e, cart, '.cart_product_wrp'));
    }
    document.querySelector('.cart__title').style.display = document.querySelector('.cart__products').style.display;
}

function addToCart(e) {
    const product = e.target.closest('.product');
    const key = product.dataset.id;
    const img = product.querySelector('img');

    const quantityToAdd = parseInt(product.querySelector('.product__quantity-value').textContent.trim());

    if (cart[key]) {
        cart[key].quantity += quantityToAdd;
    } else {
        cart[key] = {quantity: quantityToAdd, imgSrc: img.src};
    }
    save(cart)
    drawCart(cart);
}

for (let btnAddToCart of document.querySelectorAll('.product__add')) {

    btnAddToCart.addEventListener('click', e => addToCart(e, cart));
    btnAddToCart.addEventListener('click', createFlyingEl);
}


function changeQuantity(e, cart, parentClass) {
    const key = e.target.closest(parentClass).dataset.id;

    let changingValueEl;
    if (parentClass === '.product') {
        changingValueEl = e.target.closest('.product__quantity-controls').querySelector('.product__quantity-value');
    } else {
        changingValueEl = e.target.closest('.cart_product_wrp').querySelector('.cart__product-count');
    }
    let quantityValue = parseInt(changingValueEl.textContent);

    quantityValue = e.target.classList.contains('product__quantity-control_dec') ? quantityValue - 1 : quantityValue + 1;
    quantityValue = quantityValue < 1 ? 1 : quantityValue;
    changingValueEl.textContent = quantityValue.toString();

    if (changingValueEl.classList.contains('cart__product-count')) {
        cart[key].quantity = quantityValue;
        save(cart)
        drawCart(cart);
    }
}

for (let controlsInProduct of document.querySelectorAll('.product__quantity-control')) {
    controlsInProduct.addEventListener('click', e => changeQuantity(e, cart, '.product'));
}



