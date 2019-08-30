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
        return 10;
    } else {
        return 11;
    }
}

// Update this.price depends on toppings
Order.prototype.toppingPrice = function() {
    let cost = 0;
    console.log('proteins in toppingPrice', this.proteins);
    this.proteins.forEach(() => {
        cost += 3;
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

Order.prototype.totalPrice = function() {
    this.price = this.sizePrice() + this.toppingPrice();
    console.log("size Price:", this.sizePrice());
    console.log('topping total price:', this.price);
}

//User Interface logic
const createOrder = () => {
    // size, three toppings]
    const size = $("option:selected").val();
    // make arrays of checked items
    let proteins = [];
    $(".proteins input[name=proteins]:checked").each(function() {
        proteins.push($(this).val());
    });
    console.log('proteins', proteins);
    let veggies = [];
    $(".veggies input[name=veggies]:checked").each(function() {
        veggies.push($(this).val());
    });
    console.log('veggies', veggies);
    let others = [];
    $(".others input[name=others]:checked").each(function() {
        others.push($(this).val());
    });
    console.log('others', others);
    const newOrder = new Order(size, proteins, veggies, others);
    console.log(newOrder);
    newOrder.totalPrice();
    // ToDo: invoke clear form function

}

$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        createOrder();

    });
});

