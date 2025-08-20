import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { step } from '../utils/utils.js';

describe('TC5: Add to cart, logout, login again and check cart', () => {
    it('should add product, logout, login again, and verify cart', async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Login');
        await loginPage.inputUsername.setValue('standard_user');
        await expect(loginPage.inputUsername).toHaveValue('standard_user');
        await loginPage.inputPassword.setValue('secret_sauce');
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
        await loginPage.btnLogin.click();

        await step('Verify inventory page');
        await expect(inventoryPage.inventoryContainer).toBeDisplayed();

        await step('Add first product to cart');
        await inventoryPage.addToCartButtons[0].click();
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await step('Open burger menu');
        await inventoryPage.burgerMenu.click();
        const menuItems = await inventoryPage.menuItems;
        await expect(menuItems.length).toBeGreaterThanOrEqual(4);

        await step('Logout');
        await inventoryPage.logoutBtn.click();

        await step('Login again');
        await loginPage.inputUsername.setValue('standard_user');
        await expect(loginPage.inputUsername).toHaveValue('standard_user');
        await loginPage.inputPassword.setValue('secret_sauce');
        await expect(loginPage.inputPassword).toHaveAttribute('type', 'password');
        await loginPage.btnLogin.click();

        await step('Verify inventory page after login');
        await expect(inventoryPage.inventoryContainer).toBeDisplayed();

        await step('Open cart page and verify product');
        await inventoryPage.cartButton.click();
        await expect(inventoryPage.cartBadge).toBeDisplayed();
    });
});


