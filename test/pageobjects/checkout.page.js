class CheckoutPage {
    // Локатори
    get checkoutHeader() { return $('.header_secondary_container .title'); }
    get firstNameInput() { return $('#first-name'); }
    get lastNameInput() { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }
    get continueButton() { return $('#continue'); }
    get overviewHeader() { return $('.header_secondary_container .title'); }
    get overviewItems() { return $$('.cart_item'); }
    get overviewItemNames() { return $$('div.cart_item div.inventory_item_name'); }
    get overviewItemPrices() { return $$('div.cart_item div.inventory_item_price'); }
    get totalPrice() { return $('.summary_total_label'); }
    get finishButton() { return $('#finish'); }
    get completeHeader() { return $('.header_secondary_container .title'); }
    get thankYouMessage() { return $('h2.complete-header'); }
    get backHomeButton() { return $('#back-to-products'); }

    // Методи
    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
    }

    async getOverviewItemName(index) {
        return await this.overviewItemNames[index].getText();
    }

    async getOverviewItemPrice(index) {
        return await this.overviewItemPrices[index].getText();
    }

    async getTotalPriceText() {
        return await this.totalPrice.getText();
    }

    async isThankYouMessageDisplayed() {
        return await this.thankYouMessage.isDisplayed();
    }
}

export default new CheckoutPage();


