'use strict';

let products = {
    1: {title: 'Икра минтая', image: 'https://pokushai.kz/uploads/files/640x480_f8f13b9f33dbb71ced4a24d4a9e09c89.jpg'},
    2: {
        title: 'Повар взрослый',
        image: 'https://pokushai.kz/uploads/files/640x480_f8f13b9f33dbb71ced4a24d4a9e09c89.jpg'
    },
    3: {title: 'Щука', image: 'https://pokushai.kz/uploads/files/640x480_f8f13b9f33dbb71ced4a24d4a9e09c89.jpg'},
    4: {title: 'Краб', image: 'https://pokushai.kz/uploads/files/640x480_f8f13b9f33dbb71ced4a24d4a9e09c89.jpg'},
}
const productsDiv = document.createElement('div');
document.querySelector('body').appendChild(productsDiv);
productsDiv.classList.add('products');

for (let productId of Object.keys(products)) {
    const product = products[productId];
    const productDiv = document.createElement('div');
    productsDiv.appendChild(productDiv);
    productDiv.insertAdjacentHTML("beforeend",`<div class="product" data-id="${product[productId]}">
        <h3 class="product__title">
            ${product.title}
        </h3>
        <img alt="" class="product__image" src="${product.image}">
        <div class="product__controls">
            <div class="product__quantity">
                <div class="product__quantity-title">
                    Введите количество
                </div>
                <div class="product__quantity-controls">
                    <div class="product__quantity-control product__quantity-control_dec">
                        -
                    </div>
                    <div class="product__quantity-value">
                        1
                    </div>
                    <div class="product__quantity-control product__quantity-control_inc">
                        +
                    </div>
                </div>
                <div class="product__add">
                    Добавить в корзину
                </div>
            </div>
        </div>
    </div>` );
}



