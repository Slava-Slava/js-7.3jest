const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { user, password } = require("../user.js");

test('SuccessfulAuthorization', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
  });
  const page = await browser.newPage();
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();
  await expect(page).toHaveTitle("Моё обучение");
  await page.close;
  await browser.close;
});

test('UnsuccessfulAuthorization', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
  });
  const page = await browser.newPage();
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(user);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill('password');
  await page.getByTestId('login-submit-btn').click();
  await expect(page.getByTestId("login-error-hint")).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
  await page.close;
  await browser.close;
});