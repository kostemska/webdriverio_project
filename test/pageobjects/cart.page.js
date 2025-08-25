class CartPage {
    // Локатори
    get cartHeader() { return $('.header_secondary_container .title'); }
    get checkoutButton() { return $('#checkout'); }
    get cartItems() { return $$('.cart_item'); }
    get cartItemNames() { return $$('div.cart_item div.inventory_item_name'); }
    get cartItemPrices() { return $$('div.cart_item div.inventory_item_price'); }
    get emptyCartMessage() { return $('#empty-cart-message'); }

    // Методи
    async getCartItemName(index) {
        const items = await this.cartItems;
        return await items[index].$('.inventory_item_name').getText();
    }

    async getCartItemPrice(index) {
        return await this.cartItemPrices[index].getText();
    }

    async getNumberOfItems() {
        return await this.cartItems.length;
    }

    async isEmptyCartMessageDisplayed() {
        return await this.emptyCartMessage.isDisplayed();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

}

export default new CartPage();
