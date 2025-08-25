import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { step } from '../utils/utils.js';

describe('TC5: Add to cart, logout, login again and check cart', () => {
    it('should add product, logout, login again, and verify cart', async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Login with valid credentials');
        await loginPage.login('standard_user', 'secret_sauce');

        await step('Verify inventory page');
        await expect(inventoryPage.inventoryContainer).toBeDisplayed();

        await step('Add first product to cart');
        await inventoryPage.addFirstProductToCart();
        await expect(inventoryPage.cartBadge).toHaveText('1');

        await step('Open burger menu and logout');
        await inventoryPage.openBurgerMenu();
        await inventoryPage.logout();

        await step('Login again');
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(inventoryPage.inventoryContainer).toBeDisplayed();

        await step('Open cart page and verify product');
        await inventoryPage.goToCart();
        await expect(inventoryPage.cartBadge).toBeDisplayed();
    });
});



