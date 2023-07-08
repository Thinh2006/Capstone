function getElement(selector) {
    return document.querySelector(selector);
}

function getProducts() {
    const promise = axios({
        url: "https://64959f57b08e17c9179268f6.mockapi.io/products",
        method: "GET",
    });

    promise
        .then(function (result) {
            console.log("result", result.data);
            renderProducts(result);
        })
        .catch(function (error) {
            console.log(error);
        });
}
getProducts();

function renderProducts(result) {
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
                        <button type="button" class="btn btn-primary w-50" onclick="btnAddToCart('1')">Add to cart</button>
                        <span class="text-success mt-2"><b>In Stock</b></span>
                    </div>
                </div>
            </div>
        </div>`;

        getElement("#phoneList").innerHTML = content;
    }
}

const selection = getElement("#selectList")
selection.onchange = function () {
    let arr = [];
};
