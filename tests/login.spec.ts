import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/* Fixture version
import { expect} from '@playwright/test';
import { test } from '../fixtures/login.fixture';
*/


// Ejemplo de uso de tags a nivel de suite.
//test.describe('Login suite', { tag: ['@smoke', '@prod-only'] }, () => { 

test.describe('Login suite', () => {       

    let loginPage: LoginPage;
    
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('@smoke Successful login with valid credentials', async ({page}) => {
        await loginPage.login('validUser', 'validPassword');
        await expect(page).toHaveURL('www.example.com/dashboard');
        await expect(loginPage.loginForm).not.toBeVisible();
    });

    test('@prod-only Unsuccessful login with invalid credentials', async () => {
        await loginPage.login('invalidUser', 'invalidPassword');
        await expect(loginPage.loginForm).toBeVisible();
    });

     /* Fixture version
     test('Successful login with valid credentials', async ({loginPage, page}) => {
        await loginPage.login('validUser', 'validPassword');
        await expect(page).toHaveURL('http://localhost:3000/dashboard');
        await expect(loginPage.loginForm).not.toBeVisible();
    }); */
});