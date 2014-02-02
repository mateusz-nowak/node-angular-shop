module.exports = function(req)
{
    return {
        cart: req.session.cart || [],

        getCart: function()
        {
            return this.cart;
        },

        addProduct: function(product)
        {
            if (!this.isInCart(product)) {
                this.cart.push(product);
            }
            this.updateCart();
        },

        removeProduct: function(product)
        {
            this.cart = this.cart.filter(function(itProduct) {
                return itProduct.id != product.id;
            });
            this.updateCart();
        },

        isInCart: function(product)
        {
            return this.cart.filter(function(itProduct) {
                return itProduct.id == product.id;
            }).length != 0;
        },

        updateCart: function()
        {
            req.session.cart = this.cart;
        }
    };
};
