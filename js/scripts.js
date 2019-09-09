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
        return 7;
    } else if (this.size === "medium") {
        return 8;
    } else {
        return 9;
    }
}

// Update this.price depends on toppings
Order.prototype.toppingPrice = function() {
    return (this.proteins.length * 2.50) + (this.veggies.length * 2) + (this.others.length * 1.5);
}

// Calc pizza size + toppings
Order.prototype.pizzaPrice = function() {
    this.price = this.sizePrice() + this.toppingPrice();
    return this.price;
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
    $("#cart").append(`<ul id="list"></ul>`);
    $("#list").append(`<li>Size: <span class="size">${thisOrder.size}</span></li>`);
    $("#list").append(`<li>Protein: <span id="proteins-topping">${thisOrder.proteins}</span></li>`);
    $("#list").append(`<li>Veggies: <span id="veggies-topping">${thisOrder.veggies}</span></li>`);
    $("#list").append(`<li>Others: <span id="others-topping">${thisOrder.others}</span></li>`);
    $("#list").append(`<li>$<span id="show">${thisOrder.pizzaPrice()}</span></li>`);
    $("#cart").show();
}

// clear form
// Todo: fix dropdown list reset
const clearForm = () => {
    $("select option").find('option:first').attr('selected', 'selected');
    $("input:checked").prop('checked', false);
}

$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        const thisOrder = createOrder();
        showCart(thisOrder);
        $("button#order-more").click(function(event){
            event.preventDefault();
            clearForm();
        })
    });
});