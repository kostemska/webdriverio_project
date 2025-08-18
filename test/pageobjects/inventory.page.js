class InventoryPage {
    
    // Контейнер сторінки інвентарю (для перевірки після логіну)
    get inventoryContainer() { return $('#inventory_container'); }

    // Іконка кошика (для перевірки після логіну)
    get cartIcon() { return $('.shopping_cart_link'); }

    // Селектор бургер-меню
    get burgerMenu() { return $('#react-burger-menu-btn'); }

    // Селектор кнопки Logout у меню
    get logoutBtn() { return $('#logout_sidebar_link'); }

    // Селектор всіх пунктів меню (для перевірки)
    get menuItems() { return $$('#menu_button_container .bm-item-list a'); }

    // Селектор контейнера inventory (для перевірки)
    get inventoryContainer() { return $('#inventory_container'); }

    // Селектор для контейнера сортування
    get sortSelect() { return $('.product_sort_container'); }

    // Селектор для цін продуктів
    get productPrices() { return $$('div.inventory_item_price'); }

    // Селектор для назв продуктів
    get productNames() { return $$('div.inventory_item_name'); }

    // Метод для вибору опції сортування
    async selectSortOption(value) {
        await this.sortSelect.selectByAttribute('value', value);
    }

    // Метод для отримання всіх цін продуктів у вигляді масиву тексту
    async getAllProductPrices() {
        const prices = [];
        const elements = await this.productPrices;
        for (let el of elements) {
            prices.push(await el.getText());
        }
        return prices;
    }

    // Метод для отримання всіх назв продуктів
    async getAllProductNames() {
        const names = [];
        const elements = await this.productNames;
        for (let el of elements) {
            names.push(await el.getText());
        }
        return names;
    }

    // Селектори для соціальних іконок у футері
    get twitterIcon() { return $('footer .social_twitter a'); }
    get facebookIcon() { return $('footer .social_facebook a'); }
    get linkedinIcon() { return $('footer .social_linkedin a'); }

    // Селектор для футера
    get footer() { return $('footer'); }
    
    // Селектори для кнопок "Add to cart"
    get addToCartButtons() { return $$('button.btn_inventory'); }
    
    // Доданий селектор для першого товару
    get firstAddToCartBtn() { return this.addToCartButtons[0]; }

    // Селектор для бейджу кошика (кількість товарів)
    get cartBadge() { return $('.shopping_cart_badge'); }

    // Кнопка переходу у кошик
    get cartButton() { return $('.shopping_cart_link'); }

    // Заголовок сторінки продуктів
    get inventoryHeader() { return $('.header_secondary_container .title'); }
}

export default new InventoryPage();




