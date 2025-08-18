class CheckoutPage {
    // Заголовок Checkout Step 1
    get checkoutHeader() { return $('.header_secondary_container .title'); }

    // Поля форми
    get firstNameInput() { return $('#first-name'); }
    get lastNameInput() { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }

    // Кнопка Continue
    get continueButton() { return $('#continue'); }

    // Заголовок Overview
    get overviewHeader() { return $('.header_secondary_container .title'); }

    // Список продуктів на Overview
    get overviewItems() { return $$('.cart_item'); }
    get overviewItemNames() { return $$('div.cart_item div.inventory_item_name'); }
    get overviewItemPrices() { return $$('div.cart_item div.inventory_item_price'); }

    // Total price
    get totalPrice() { return $('.summary_total_label'); }

    // Кнопка Finish
    get finishButton() { return $('#finish'); }

    // Заголовок Checkout Complete
    get completeHeader() { return $('.header_secondary_container .title'); }
    get thankYouMessage() { return $('h2.complete-header'); }

    // Кнопка Back Home
    get backHomeButton() { return $('#back-to-products'); }
}

export default new CheckoutPage();

