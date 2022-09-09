import { dataDB } from "./js/data.js";

const contentShoes = document.querySelector(".content_shoes");
const contentCartBody = document.querySelector(".content_cart-body");
const contTotal = document.querySelector("#total");


let html = ''
let cart = {};

dataDB.forEach(({ id, name, price, stock, urlImages }) => {
    html += `
        <div class="shoes">
            <div class="shoes__img"> 
                <img src="${urlImages}" alt="${name}">
            </div>
             <div class="shoes__body" id="${id}">
                <h2 class="shoes__body-title">${name}</h2>
                <p>Precio: ${price}</p>
                <p>Stock: ${stock}</p>
                <button class="btn btn__add">Agregar</button>
            </div>
        </div>        
    `;

});

contentShoes.innerHTML = html;

const iconCart = document.querySelector("#icon_cart");
const contentCart = document.querySelector("#contentCart");

iconCart.addEventListener("click", () => {
    contentCart.classList.toggle("content_cart-show");
});


function printShoeInCart() {
    let html = "";

    const arrayCart = Object.values(cart);

    arrayCart.forEach(({ id, name, urlImages, amount }) => {
        html += `
            <div class="item_cart">
                <div class="item_cart-img">
                    <img src="${urlImages}" alt="">
                </div>

                <h4 class="item_cart-title">${name}</h4>
                <div class="item_cart-options" id="${id}">
                    <i class='bx bx-minus'></i>
                    <span id="amount">${amount}</span>
                    <i class='bx bx-plus-medical'></i>
                    <i class='bx bx-trash'></i>
                </div>
            </div>
        `;
    });

    contentCartBody.innerHTML = html;
}


contentShoes.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn__add")) {
        const idShoe = +e.target.parentElement.id;

        const findShoe = dataDB.find((item) => item.id === idShoe);

        if (cart[idShoe]) {
            cart[idShoe].amount++;
            contTotal.innerHTML = +contTotal.innerHTML+(cart[idShoe].price);
        } else {
            cart[idShoe] = findShoe;
            cart[idShoe].amount = 1;
            contTotal.innerHTML = +contTotal.innerHTML+(cart[idShoe].price);
        }

        printShoeInCart();
    }
});

contentCartBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("bx-minus")) {
        const idShoe = +e.target.parentElement.id;
        cart[idShoe].amount--;
        contTotal.innerHTML = +contTotal.innerHTML-(cart[idShoe].price);

        if(cart[idShoe].amount === 0) {
            delete cart[idShoe];
        }
    }

    if (e.target.classList.contains("bx-plus-medical")) {
        const idShoe = +e.target.parentElement.id;
        cart[idShoe].amount++;
        contTotal.innerHTML = +contTotal.innerHTML+(cart[idShoe].price);

        if(cart[idShoe].amount > cart[idShoe].stock) {
            alert("No hay mas producto");
            cart[idShoe].amount = cart[idShoe].stock;
        }
    }

    if (e.target.classList.contains("bx-trash")) {
        const idShoe = +e.target.parentElement.id;
        contTotal.innerHTML = +contTotal.innerHTML-(cart[idShoe].price);
        delete cart[idShoe];
    }

    printShoeInCart();
});