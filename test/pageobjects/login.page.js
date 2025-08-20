class LoginPage {
    open() {
        return browser.url('https://www.saucedemo.com/');
    }

    get inputUsername() { return $('#user-name'); }
    get inputPassword() { return $('#password'); }
    get btnLogin() { return $('#login-button'); }
    get inventoryContainer() { return $('.inventory_container'); }
    get errorMessage() { return $('h3[data-test="error"]'); }
    get burgerMenu() { return $('#react-burger-menu-btn'); }
    get logoutButton() { return $('#logout_sidebar_link'); }
    get menuItems() { return $$('#menu_container .bm-item-list a'); }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }
}

export default new LoginPage();


