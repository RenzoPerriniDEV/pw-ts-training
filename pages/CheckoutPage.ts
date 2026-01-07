import { Page, Locator } from '@playwright/test';


class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly email: Locator;
  readonly address: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly zip: Locator;
  readonly cardName: Locator;
  readonly cardNumber: Locator;
  readonly expMonth: Locator;
  readonly expYear: Locator;
  readonly cvv: Locator;
  readonly shippingAdress: Locator;
  readonly continueSubmit: Locator;
  readonly cartTotal: Locator;
  readonly productsPrice: Locator;
  readonly selectOption: Locator;

  constructor(page: Page) {
    this.page = page;

    // Billing Address
    this.firstName = page.locator('input[name="firstname"]');
    this.email = page.locator('input[name="email"]');
    this.address = page.locator('input[name="address"]');
    this.city = page.locator('input[name="city"]');
    this.state = page.locator('input[name="state"]');
    this.zip = page.locator('input[name="zip"]');
    // Payment
    this.cardName = page.locator('input[name="cardname"]');
    this.cardNumber = page.locator('input[name="cardnumber"]');
    this.expMonth = page.locator('select[name="expmonth"]');
    this.expYear = page.locator('input[name="expyear"]');
    this.cvv = page.locator('input[name="cvv"]');
    this.shippingAdress = page.locator('input[name="sameadr"]');
    this.continueSubmit = page.getByRole('button', { name: 'Continue to checkout' });
    // Cart
    this.cartTotal = page.locator('p').filter({ hasText: 'Total' }).locator('b');
    this.productsPrice = page.locator('p').filter({ hasNotText: 'Total' }).locator('span.price');

    //Select example
    this.selectOption = page.locator('select#exampleSelect');

    
  }

  // Fill billing address and payment form
  async fillBillingAndPaymentInfo(firstName: string, email: string, address: string, city: string, state: string, zip: string, cardName: string, cardNumber: string, expMonth: string, expYear: string, cvv: string) {
    await Promise.all([
      this.firstName.fill(firstName),
      this.email.fill(email),
      this.address.fill(address),
      this.city.fill(city),
      this.state.fill(state),
      this.zip.fill(zip),
      this.cardName.fill(cardName),
      this.cardNumber.fill(cardNumber),
      this.expMonth.selectOption(expMonth),
      this.expYear.fill(expYear),
      this.cvv.fill(cvv),
    ]);
  }

  // Check Shipping address checkbox
  async checkShippingAddress() {
    if (!(await this.shippingAdress.isChecked())) {
      await this.shippingAdress.check();
    }
  }

  // Uncheck Shipping address checkbox
  async uncheckShippingAddress() {
    if (await this.shippingAdress.isChecked()) {
      await this.shippingAdress.uncheck();
    }
  }

  // Check alert if is present
  async validateAlertMessageIsPresent() {
    let dialogDetected = false;
    this.page.on('dialog', async (dialog) => {
      dialogDetected = true;
    });
    return dialogDetected;
  }

  // Confirm dialog
  async confirmAlertMessage() {
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
  }

  // Submit checkout form
  async submitCheckoutForm() {
    await this.continueSubmit.click();
  }

  // Check total for all products in the cart
  async getTotalSumOfProducts() {
    const pricesText = await this.productsPrice.allInnerTexts();
    const prices = pricesText.map(price => {
      return parseFloat(price.replace('$', '').trim());
    });
    return prices.reduce((sum, price) => sum + price, 0);
  }

  // Get the total displayed in the cart
  async getTotalDisplayed() {
    const totalCartDisplayed = await this.cartTotal.textContent();
    return parseFloat((totalCartDisplayed || '0').replace('$', '').trim());
  }

  async selectExample(optionValue: string) {
    await this.selectOption.selectOption(optionValue);
    // await page.getByRole('combobox').click();
    // await page.getByText('Argentina').click();
  }
}
export default CheckoutPage;
