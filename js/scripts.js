//Business logic
// order constructor
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
    console.log("size Price:", this.sizePrice());
    console.log('topping total price:', this.price);
}

//User Interface logic
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
    newOrder.totalPrice();
    // ToDo: invoke clear form function
}

// clear form
const clearForm = () => {
    $("option:selected").removeAttr("selected");
    $("input:checked").prop('checked', false);
}

$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        createOrder();
        clearForm();
    });
});

