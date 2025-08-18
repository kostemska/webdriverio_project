class LoginPage {
    // URL сторінки логіну
    open() {
        return browser.url('https://www.saucedemo.com/');
    }

    // Поля логіну/пароля
    get inputUsername() { return $('#user-name'); }
    get inputPassword() { return $('#password'); }

    // Кнопка Login
    get btnLogin() { return $('#login-button'); }

    // Контейнер після успішного логіну
    get inventoryContainer() { return $('.inventory_container'); }

    // Помилка
    get errorMessage() { return $('h3[data-test="error"]'); }

    // Метод логіну
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }
    // Burger menu + Logout
    get burgerMenu() { return $('#react-burger-menu-btn'); }
    get logoutButton() { return $('#logout_sidebar_link'); }
    get menuItems() { return $$('#menu_container .bm-item-list a'); }

}
export default new LoginPage();



