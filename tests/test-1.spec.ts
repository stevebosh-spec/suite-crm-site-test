import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://suitecrm.com/');
  await page.getByRole('navigation', { name: 'Main Menu' }).getByRole('link', { name: 'Contact Us' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).click();
  await page.getByRole('textbox', { name: 'Last name *' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last name *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Work email *' }).fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'Work email *' }).press('Tab');
  await page.getByRole('textbox', { name: 'Job title' }).fill('Test');
  await page.getByRole('textbox', { name: 'Job title' }).press('Tab');
  await page.getByRole('textbox', { name: 'Company name *' }).fill('Testing');
  await page.getByRole('textbox', { name: 'Company name *' }).press('Tab');
  await page.getByLabel('Country').selectOption('Albania');
  await page.getByRole('textbox', { name: 'Your message *' }).click();
  await page.getByRole('textbox', { name: 'Your message *' }).fill('This is a test');
  await page.getByText('I have read the Privacy').click();
  await page.getByRole('checkbox', { name: 'I have read the Privacy' }).check();
  await page.getByRole('button', { name: 'Send message' }).click();
});