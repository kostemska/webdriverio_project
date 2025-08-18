import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import { expect } from 'chai';

const STEP_DELAY = 2000; // час паузи для візуального спостереження

async function step(description, pauseTime = STEP_DELAY) {
    console.log(description);
    await browser.pause(pauseTime);
}

describe('TC6: Login and verify product sorting visually + code', () => {

    before(async () => {
        await step('Open login page');
        await LoginPage.open();

        await step('Login as standard_user');
        await LoginPage.login('standard_user', 'secret_sauce');

        expect(await InventoryPage.inventoryContainer.isDisplayed()).to.be.true;
    });

    const sortOptions = [
        { value: 'az', description: 'Name A to Z', compare: (a, b) => a <= b },
        { value: 'za', description: 'Name Z to A', compare: (a, b) => a >= b },
        { value: 'lohi', description: 'Price Low to High', compare: (a, b) => a <= b },
        { value: 'hilo', description: 'Price High to Low', compare: (a, b) => a >= b },
    ];

    for (const option of sortOptions) {
        it(`should sort products by ${option.description}`, async () => {

            // --- Скрол до хедера перед взаємодією ---
            await browser.execute(() => {
                const header = document.querySelector('.header_secondary_container');
                if (header) header.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            await browser.pause(1000);

            // --- Візуальна анімація: відкрити випадаючий список ---
            await step(`Open sort dropdown for: ${option.description}`);
            const selectElem = await InventoryPage.sortSelect;
            await selectElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await browser.pause(500);

            // Використаємо JS для відкриття списку
            await browser.execute(el => el.focus(), selectElem);
            await selectElem.click(); // клік, щоб відкрити список
            await browser.pause(800); // пауза, щоб побачити відкриття

            // --- Вибір потрібної опції ---
            await selectElem.selectByAttribute('value', option.value);
            await browser.pause(1000); // пауза, щоб побачити зміну

            // --- Скрол до контейнера товарів після сортування ---
            await InventoryPage.inventoryContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            await browser.pause(1500);

            // --- Отримання даних для перевірки ---
            let items;
            if (option.value === 'lohi' || option.value === 'hilo') {
                const prices = await InventoryPage.getAllProductPrices();
                items = prices.map(price => parseFloat(price.replace('$', '')));
                console.log(`First 5 prices after sorting: ${items.slice(0, 5).join(', ')}`);
            } else {
                const names = await InventoryPage.getAllProductNames();
                items = names;
                console.log(`First 5 names after sorting: ${items.slice(0, 5).join(', ')}`);
            }

            // --- Кодова перевірка сортування ---
            for (let i = 0; i < items.length - 1; i++) {
                expect(option.compare(items[i], items[i + 1])).to.be.true;
            }

            await step('Pause to visually see sorted products', 2000);
        });
    }

    after(async () => {
        await browser.pause(2000);
        await browser.deleteSession();
    });

});



