# pw-ts-training

1- Install Playwright

npm init playwright@latest

2- Browser (They should be installed in the first step)

npx playwright install

3- Create pages folder for selectors: E.G: LoginPage.ts

4 - Create test: E.G: login.spec.ts

--- Run test:

. Correo todo
npx playwright test


. Corre todo menos los de prod
- run: npx playwright test --project=preprod --grep-invert @prod-only



// 4 workers en paralelo
- run: npx playwright test --workers=4