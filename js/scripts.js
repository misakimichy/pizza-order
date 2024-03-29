//Business logic
// Pizza order constructor
class Order {
    constructor(size, proteins, veggies, others) {
        this.size = size,
        this.proteins = proteins;
        this.veggies = veggies;
        this.others = others;
        this.price = 0;
    }

    // Calc base pizza price depends on the pizza size
    sizePrice() {
        if(this.size === "small"){
            return 7;
        } else if (this.size === "medium") {
            return 8;
        } else {
            return 9;
        }
    }

    // Update this.price depends on toppings
    toppingPrice() {
        return (this.proteins.length * 2.50) + (this.veggies.length * 2) + (this.others.length * 1.5);
    }
    
    // Calc pizza size + toppings
    pizzaPrice() {
        this.price = this.sizePrice() + this.toppingPrice();
        return this.price;
    }
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
};

// Show cart
const showCart = (thisOrder) => {
    $("#cart").append(`<ul id="list"></ul>`);
    $("#list").append(`<li>Size: <span class="size">${thisOrder.size}</span></li>`);
    $("#list").append(`<li>Protein: <span id="proteins-topping">${thisOrder.proteins}</span></li>`);
    $("#list").append(`<li>Veggies: <span id="veggies-topping">${thisOrder.veggies}</span></li>`);
    $("#list").append(`<li>Others: <span id="others-topping">${thisOrder.others}</span></li>`);
    $("#list").append(`<li>$<span id="show">${thisOrder.pizzaPrice()}</span></li>`);
    $("#cart").show();
};

// clear form
const clearOrderForm = () => {
    $("select#size").prop('selectedIndex', 0);
    $("input:checked").prop('checked', false);
};

$(document).ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        const thisOrder = createOrder();
        clearOrderForm();
        showCart(thisOrder);
        $("button#place-order").click(function(event){
            event.preventDefault();
            $("#info").show();
        });
        $("button#submit-info").click(function(event){
            event.preventDefault();
            $("#info").hide();
            $("#cart").remove();
            $("#cart").hide();
            $(".modal").modal();
            $(".close").click(function(){
                $(".modal").modal('hide');
            });
        });
    });
});