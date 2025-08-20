import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import { step } from '../utils/utils.js';

describe('TC6: Login and verify product sorting visually + code', () => {

    before(async () => {
        await step('Open login page');
        await loginPage.open();

        await step('Login as standard_user');
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(inventoryPage.inventoryContainer).toBeDisplayed();
    });

    const sortOptions = [
        { value: 'az', description: 'Name A to Z', compare: (a, b) => a <= b },
        { value: 'za', description: 'Name Z to A', compare: (a, b) => a >= b },
        { value: 'lohi', description: 'Price Low to High', compare: (a, b) => a <= b },
        { value: 'hilo', description: 'Price High to Low', compare: (a, b) => a >= b },
    ];

    for (const option of sortOptions) {
        it(`should sort products by ${option.description}`, async () => {

            await step(`Select sort option: ${option.description}`);
            const selectElem = await inventoryPage.sortSelect;
            await selectElem.selectByAttribute('value', option.value);

            let items;
            if (option.value === 'lohi' || option.value === 'hilo') {
                const prices = await inventoryPage.getAllProductPrices();
                items = prices.map(price => parseFloat(price.replace('$', '')));
                console.log(`First 5 prices after sorting: ${items.slice(0, 5).join(', ')}`);
            } else {
                const names = await inventoryPage.getAllProductNames();
                items = names;
                console.log(`First 5 names after sorting: ${items.slice(0, 5).join(', ')}`);
            }

            for (let i = 0; i < items.length - 1; i++) {
                expect(option.compare(items[i], items[i + 1])).toBe(true);
            }

            await step('Sorting verification completed');
        });
    }

});


