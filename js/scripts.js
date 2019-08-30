//Business logic
// order constructor
function Order (size, toppings) {
    this.size = size,
    this.toppings = toppings,
    this.proteinToppings = [],
    this.veggieToppings = [],
    this.otherToppings = [],
    this.price = 0
}

// Calc base pizza price depends on the pizza size
Order.prototype.sizePrice = function() {
    if(this.size === "small"){
        this.price = 8;
    } else if (this.size === "medium") {
        this.price = 10;
    } else {
        this.price = 11;
    }
}

// Push protein toppings
Order.prototype.proteinPrice = function(protein) {
    this.proteinToppings.push(protein);
    this.proteinToppings.forEach(() => {
        this.cost += 3;
    })
}

// Push veggie toppings
Order.prototype.veggiePrice = function(veggie) {
    this.veggieToppings.push(veggie);
    this.veggieToppings.forEach(() => {
        this.cost += 2;
    })
}

// Push other toppings
Order.prototype.otherPrice = function(other) {
    this.otherToppings.push(other);
    this.otherToppings.forEach(() => {
        this.cost += 1.5;
    })
}

Order.prototype.totalPrice = function() {
    this.price = this.sizePrice() + this.proteinPrice() + this.veggiePrice() + this.otherToppings();
    console.log('order price:', this.price);
}

//User Interface logic
const createOrder = () => {
    const size = $("option:selected").val();
    const proteinTopping = $("input[name=protein]:checked").val();
    const veggieTopping = $("input[name=veggies]:checked").val();
    const otherTopping = $("input[name=others]:checked").val();
    console.log('size:', size);
    console.log('protein:', proteinTopping);
    console.log('veggie:', veggieTopping);
    console.log('others:', otherTopping);
}

$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        createOrder();
    });
});

