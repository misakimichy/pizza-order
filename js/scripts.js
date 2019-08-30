//Business logic
// Pizza order constructor
function Order (size, proteins, veggies, others) {
    this.size = size,
    this.proteins = proteins;
    this.veggies = veggies;
    this.others = others;
    this.price = 0
}

// Calc base pizza price depends on the pizza size
Order.prototype.sizePrice = function() {
    if(this.size === "small"){
        return 8;
    } else if (this.size === "medium") {
        return 9;
    } else {
        return 10;
    }
}

// Update this.price depends on toppings
Order.prototype.toppingPrice = function() {
    let cost = 0;
    this.proteins.forEach(() => {
        cost += 2.5;
    });
    this.veggies.forEach(() => {
        cost += 2;
    });
    this.others.forEach(() => {
        cost += 1.5;
    });
    console.log("topping total:", cost);
    return cost;
}

// Calc pizza size + toppings
Order.prototype.totalPrice = function() {
    this.price = this.sizePrice() + this.toppingPrice();
    return this.price;
}

// Customer info constructor
function Customer (name, address, phone, payment) {
    this.name = name,
    this.address = address,
    this.phone = phone,
    this.payment = payment
}


// User Interface logic
const createOrder = () => {
    const size = $("option:selected").val();

    // make arrays of checked items
    let proteins = [];
    $(".proteins input[name=proteins]:checked").each(function() {
        proteins.push($(this).val());
    });
    let veggies = [];
    $(".veggies input[name=veggies]:checked").each(function() {
        veggies.push($(this).val());
    });
    let others = [];
    $(".others input[name=others]:checked").each(function() {
        others.push($(this).val());
    });
    const newOrder = new Order(size, proteins, veggies, others);
    return newOrder;
}

// Show cart
const showCart = (thisOrder) => {
    $("#list").append(`<li>Size: <span class="size">${thisOrder.size}</span></li>`);
    $("#list").append(`<li>Protein: <span id="proteins-topping">${thisOrder.proteins}</span></li>`);
    $("#list").append(`<li>Veggies: <span id="veggies-topping">${thisOrder.veggies}</span></li>`);
    $("#list").append(`<li>Others: <span id="others-topping">${thisOrder.others}</span></li>`);
    $("#list").append(`<p id="total">$<span id="show">${thisOrder.totalPrice()}</span></p>`);
    $("#cart").show();
}

// clear form
const clearForm = () => {
    $("option:selected").removeAttr("selected");
    $("input:checked").prop('checked', false);
}

$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        const thisOrder = createOrder();
        showCart(thisOrder);
        clearForm();
    });
});