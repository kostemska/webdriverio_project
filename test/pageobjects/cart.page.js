class CartPage {
    // Заголовок сторінки кошика
    get cartHeader() { return $('.header_secondary_container .title'); }

    // Кнопка Checkout
    get checkoutButton() { return $('#checkout'); }

    // Список продуктів у кошику
    get cartItems() { return $$('.cart_item'); }

    // Назви продуктів у кошику
    get cartItemNames() { return $$('div.cart_item div.inventory_item_name'); }

    // Ціни продуктів у кошику
    get cartItemPrices() { return $$('div.cart_item div.inventory_item_price'); }

    // Повідомлення про порожній кошик
    get emptyCartMessage() { return $('#empty-cart-message'); }
}

export default new CartPage();

