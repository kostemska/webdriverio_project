# WebDriverIO Test Automation Project

This project represents my first hands-on experience in test automation, developed as part of a test assignment to practice automation techniques and demonstrate the ability to learn and adapt.

The project contains **functional end-to-end tests** for the [Swag Labs demo website](https://www.saucedemo.com), focusing on key user scenarios.

## Test Cases

- **tc1.login.valid** – Login with valid credentials  
- **tc2.login.invalid** – Login with invalid password  
- **tc3.login.invalid** – Login with invalid login  
- **tc4.logout** – Logout  
- **tc5.cart** – Saving the cart after logout  
- **tc6.sorting** – Sorting  
- **tc7.footer** – Footer social media links  
- **tc8.checkout.valid** – Valid checkout  
- **tc9.checkout.invalid** – Checkout without products  

## How to run

1. Clone this repository:

```bash
git clone https://github.com/kostemska/webdriverio_project.git
```

2. Open a terminal and navigate to the project folder:
   
```bash
cd webdriverio_project
```

3. Install dependencies:
   
```bash
npm install
```

4. Run tests:

```bash
npx wdio run wdio.conf.js
```

## Project Structure

```bash
my_wdio_project/
├─ errorShots/       # Failed test screenshots
├─ node_modules/     # Dependencies
├─ test/
│   ├─ pageobjects/  # Page Object Models
│   ├─ specs/        # Test cases
│   └─ utils/        # Utilities
├─ .gitignore
├─ package.json
├─ package-lock.json
└─ wdio.conf.js
```
