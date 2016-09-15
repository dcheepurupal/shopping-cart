var cartListing = {};
$(document).ready(function(){

    var productTemplateScript = $("#product-template").html();
    var compileProductTemplate = Handlebars.compile(productTemplateScript);

    ShoppingCarHandlebarsHelpers.ifCond();
    $.getJSON("cart.json", function(json) {
        ShoppingCarHandlebarsHelpers.debug();

        cartListing = JSON.parse(JSON.stringify(json));
        var compiledHtml = compileProductTemplate(cartListing);
        $('#products-placeholder').html(compiledHtml);

        $(".edit-btn").click(overlayContent);
        $('.close').click(function(){
            $(".product-overlay").hide();
        });

        populateFooter(cartListing);
       // ShoppingCarHandlebarsHelpers.cartSize();
        ShoppingCarHandlebarsHelpers.cartSubTotal();
    });
});


function overlayContent(){
    var selectedItemId = $(this).data("itemId");
    if(cartListing){
        for(var key in cartListing.productsInCart){
            if(cartListing.productsInCart[key].p_id == selectedItemId){
                populateOverlay(cartListing.productsInCart[key]);
                console.table(cartListing.productsInCart[key]);
            }
        }
    }
    $(".product-overlay").show();
}

function populateOverlay(selectedItem){
    var modalTemplateScript = $("#editProduct-template").html();
    var compileModalTemplate = Handlebars.compile(modalTemplateScript);
    var compiledModalHtml =  compileModalTemplate(selectedItem);
    $("#modalContent-placeholder").html(compiledModalHtml);
}

//
function populateFooter(cartListing){
    var cartSummaryCompile = Handlebars.compile($("#cartSummary-template").html());
    var carSummaryCompiledHTML =  cartSummaryCompile(cartListing);
    $("#cartSummary-placeholder").html(carSummaryCompiledHTML);
}


var ShoppingCarHandlebarsHelpers = {
    debug : function(){
        Handlebars.registerHelper("debug", function(optionalValue) {
            console.log("Current Context");
            console.log(this);
        });
    },
    ifCond : function(){
        Handlebars.registerHelper('ifCond', function(v1, v2, options) {
            if(v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        });
    },
    cartSize : function(){
        Handlebars.registerHelper("cartSize", function(cartListing) {
            console.table(cartListing.productsInCart.length);
            return cartListing.productsInCart.length;
        });

    },
    cartSubTotal : function(){
        Handlebars.registerHelper("cartSubTotal", function(cartListing) {
            alert(Hello);
            var subtotal = 0;
            for(var key in cartListing.productsInCart){
                subtotal = subtotal + cartListing.productsInCart[key].p_price;
            }
            console.log(subtotal);
            return subtotal;
        });

    }
};

