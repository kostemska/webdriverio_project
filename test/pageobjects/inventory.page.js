class InventoryPage {
    get inventoryContainer() { return $('#inventory_container'); }
    get cartIcon() { return $('.shopping_cart_link'); }
    get burgerMenu() { return $('#react-burger-menu-btn'); }
    get logoutBtn() { return $('#logout_sidebar_link'); }
    get menuItems() { return $$('#menu_button_container .bm-item-list a'); }
    get sortSelect() { return $('.product_sort_container'); }
    get productPrices() { return $$('div.inventory_item_price'); }
    get productNames() { return $$('div.inventory_item_name'); }
    get twitterIcon() { return $('footer .social_twitter a'); }
    get facebookIcon() { return $('footer .social_facebook a'); }
    get linkedinIcon() { return $('footer .social_linkedin a'); }
    get footer() { return $('footer'); }
    get addToCartButtons() { return $$('button.btn_inventory'); }
    get firstAddToCartBtn() { return this.addToCartButtons[0]; }
    get cartBadge() { return $('.shopping_cart_badge'); }
    get cartButton() { return $('.shopping_cart_link'); }
    get inventoryHeader() { return $('.header_secondary_container .title'); }

    async selectSortOption(value) {
        await this.sortSelect.selectByAttribute('value', value);
    }

    async getAllProductPrices() {
        const prices = [];
        const elements = await this.productPrices;
        for (let el of elements) {
            prices.push(await el.getText());
        }
        return prices;
    }

    async getAllProductNames() {
        const names = [];
        const elements = await this.productNames;
        for (let el of elements) {
            names.push(await el.getText());
        }
        return names;
    }
    
    async openBurgerMenu() {
        await this.burgerMenu.click();
    }

    async logout() {
        await this.logoutBtn.click();
    }

    async getFirstProductName() {
        return await this.productNames[0].getText();
    }

    async addFirstProductToCart() {
        await this.firstAddToCartBtn.click();
    }

    async goToCart() {
        await this.cartButton.click();
    }

    async openSocialLink(element) {
        const mainWindow = await browser.getWindowHandle();
        await element.click();
        const allWindows = await browser.getWindowHandles();
        const newWindow = allWindows.find(handle => handle !== mainWindow);
        await browser.switchToWindow(newWindow);
        return mainWindow;
    }

    async closeAndReturn(mainWindow) {
        await browser.closeWindow();
        await browser.switchToWindow(mainWindow);
    }

}

export default new InventoryPage();




