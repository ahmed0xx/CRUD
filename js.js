let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let tmp;
let mood = 'create';
// GET TOTAL
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value
            + +ads.value) - +discount.value;
        total.innerText = result;
        total.style.backgroundColor = "green";
    }
    else {
        total.innerText = '';
        total.style.backgroundColor = "red";
    }
}

// CREATE PRODUCT
let data;
if (localStorage.product != null) {
    data = JSON.parse(localStorage.product);
}
else {
    data = [];
}
submit.onclick = function () {
    let product = {
        "title": title.value,
        "price": price.value,
        "taxes": taxes.value,
        "ads": ads.value,
        "discount": discount.value,
        "total": total.innerHTML,
        "count": count.value,
        "category": category.value,
    }
    if (mood === 'create') {
        if (count.value <= 1) {
            data.push(product);
        } else {
            for (let i = 0; i < count.value; i++) {
                data.push(product);
            }
        }
    }else{
        data[tmp]=product;
        mood="create";
        submit.innerHTML='Create';
        count.style.display="block";
    }
    localStorage.setItem("product", JSON.stringify(data));
    clearData();
    showData();
}

//CLEAR INPUTS
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

showData();
// READ DATA 
function showData() {
    getTotal()
    let table = '';
    for (let i = 0; i < data.length; i++) {
        table += `
    <tr>
    <td>${i + 1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button onclick="updateItem(${i})" id="update">Update</button></td>
    <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
    </tr>

    `;
    }
    document.getElementById("tbody").innerHTML = table;
}
// DELETE PRODUCT
function deleteItem(i) {
    data.splice(i, 1);
    localStorage.product = JSON.stringify(data);
    showData();
}   

// UPDATE ITEM
function updateItem(i) {
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    category.value = data[i].category;
    count.style.display = "none";
    submit.innerHTML = "Update";
    getTotal();
    mood = "update";
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

