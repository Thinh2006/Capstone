const getElement = (selector) => document.querySelector(selector);

const getProducts = () => {
    const promise = axios({
        url: "https://64959f57b08e17c9179268f6.mockapi.io/products",
        method: "GET",
    });

    promise
        .then(function (result) {
            renderProducts(result);
        })
        .catch(function (error) {
            alert(error);
        });
};
getProducts();

const renderProducts = (result) => {
    let content = "";
    for (let i in result.data) {
        let prd = result.data[i];
        content += `
        <div class="col-lg-3 col-md-6">
            <div class="card text-black h-100">
                <img src="${prd.img}" alt="Phone Image">
                <div class="card-body">
                    <div class="text-center">
                        <h5 class="card-title pt-3">${prd.name}</h5>
                        <span class="text-muted mb-2">$${prd.price}</span>
                        <span class="text-danger"><s>$${
                            prd.price + 100
                        }</s></span>
                    </div>
                    <div class="d-flex justify-content-between pt-3">
                        <button type="button" class="btn btn-primary w-50" onclick="addToCart('${
                            prd.id
                        }')">Add to cart</button>
                        <span class="text-success mt-2"><b>In Stock</b></span>
                    </div>
                </div>
            </div>
        </div>`;

        getElement("#phoneList").innerHTML = content;
    }
};

const selection = getElement("#selectList");
selection.onchange = function () {
    const promise = axios({
        url: "https://64959f57b08e17c9179268f6.mockapi.io/products",
        method: "GET",
    });

    promise.then(function (result) {
        let samsung = { data: [] };
        let iphone = { data: [] };

        for (let i in result.data) {
            let prd = result.data[i];
            if (prd.type === "Samsung") {
                samsung["data"].push(prd);
            } else {
                iphone["data"].push(prd);
            }
        }

        if (selection.value === "Apple") {
            renderProducts(iphone);
            console.log(iphone);
        } else if (selection.value === "Samsung") {
            renderProducts(samsung);
        } else {
            renderProducts(result);
        }
    });
};

const findItem = (cart, id) => {
    let item;
    cart.forEach((element) => {
        if (element.product.id === id) {
            return (item = element);
        }
    });
    return item;
};

let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const addToCart = (id) => {
    const promise = axios({
        url: `https://64959f57b08e17c9179268f6.mockapi.io/products/${id}`,
        method: "GET",
    });

    promise.then(function (result) {
        const {
            id,
            name,
            price,
            screen,
            backCamera,
            frontCamera,
            img,
            desc,
            type,
        } = result.data;
        let product = new Product(
            id,
            name,
            price,
            screen,
            backCamera,
            frontCamera,
            img,
            desc,
            type
        );

        let cartitem = new CartItem(product, 1);
        let item = findItem(cart, cartitem.product.id);
        item ? (item.quantity += 1) : cart.push(cartitem);

        renderCart(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
    });
};

const renderCart = (cart) => {
    let content = "";
    let sum = 0;
    cart.forEach((ele) => {
        content += `<div class="product">
    <div class="product__up">
      <div class="product__thumbnail">
        <img src=${ele.product.img}>
      </div>
      <div class="product__details">
        <div style="margin-bottom: 8px;"><b>${ele.product.name}</b></div>
        <div style="font-size: 90%;">Screen: <span class="phone__details">${
            ele.product.screen
        }</span></div>
        <div style="font-size: 90%;">Back Camera: <span class="phone__details">${
            ele.product.backCamera
        }</span></div>
        <div style="font-size: 90%;">Front Camera: <span class="phone__details">${
            ele.product.frontCamera
        }</span></div>
      </div>
    </div>
    <div class="product__mid">
        <div class="product__remove" style="margin: 15px;">
            <button class="remove-btn btn btn-danger" href="#!" onclick ="removeProduct('${
                ele.product.id
            }')">Remove</button>
        </div>
        <div class="product__quantity" style="margin-top: 5px">
            <span><b>Quantity:</b> </span> &nbsp &nbsp
            <span class="minus bg-dark text-white" onclick ="productMinus('${
                ele.product.id
            }')" id="btnMinus${
                ele.product.id}">-</span>
            <span class="quantityResult mx-2">${ele.quantity}</span>
            <span class="plus bg-dark text-white" onclick ="productAdd('${
                ele.product.id
            }')">+</span>
            <div class="product__price" id="productPrice" style="color:red"><b>$${
                ele.quantity * ele.product.price
            }</b></div>
        </div>
    </div>
  </div>`;

        sum += ele.quantity
    });
    getElement("#products__info").innerHTML = content;

    getElement('#noti__span').innerHTML = sum;

    const subtotal = calSub()
    const shipping = subtotal >0 ? 15 : 0;
    const tax = subtotal*0.1
    getElement("#subTotal").innerHTML = `$${subtotal}`
    getElement("#shipping").innerHTML = `$${shipping}`
    getElement("#tax").innerHTML = `$${tax}`
    getElement("#priceTotal").innerHTML = `$${subtotal+shipping+tax}`
};

const calSub = () => {
    let sum =0;
    cart.forEach(ele =>{
        sum+= ele.quantity*ele.product.price
    })
    return sum
}

renderCart(cart);

const removeProduct = (id) => {
    let item = findItem(cart, id);
    let index = cart.indexOf(item);
    cart.splice(index, 1);

    renderCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
};

const productMinus = (id) => {
    let item = findItem(cart, id);
    preventMinus(item,id)
    item.quantity -= 1;

    renderCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
};

const preventMinus = (item,id) => {
    if (item.quantity <= 1){
        getElement(`#btnMinus${id}`.onclick) = null;
        // getElement(`#btnMinus${id}`.setAtrribute("style","color:red !important"))
    } else {
        getElement(`#btnMinus${id}`).onclick = "productMinus('${ele.product.id}')"
    }
};

const productAdd = (id) => {
    let item = findItem(cart, id);
    item.quantity += 1;

    renderCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
}

const emptyCart = () =>{
    cart = []

    renderCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
}

getElement('#payNow').onclick = () =>{
    if (cart.length <=0) {
        getElement('#icon__img').className = "fa-regular fa-circle-xmark"
        getElement('#icon__img').style = "color: red"
        getElement('.order__content').innerHTML = "Your cart is empty"
    } else {
        getElement('#icon__img').className = "fa-regular fa-circle-check"
        getElement('#icon__img').style = "color: green"
        getElement('.order__content').innerHTML = "Order completed"
        emptyCart()
    }
}

