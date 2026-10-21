import { test, expect } from "@playwright/test";

// Hook created below , because all tests will go to 'Contact Us' page
test.beforeEach(async ({ page }) => {
  await page.goto("https://suitecrm.com/");
  // Assert correct page has loaded -
  await page.getByRole("link", { name: "SuiteCRM Logo" });
  // Click on the 'ABOUT' link and select 'Contact Us'
  await page
    .getByRole("navigation", { name: "Main Menu" })
    .getByTitle("About")
    .click();
  await page
    .getByRole("navigation", { name: "Main Menu" })
    .getByRole("link", { name: "Contact Us" })
    .click();
  // assert the 'contact us' page has loaded - find by exact text
  await expect(
    page.locator(':text-is("Contact the SuiteCRM Team")'),
  ).toBeVisible();
  // Select 'route' before filling in form -
  await page.getByText("I'm exploring SuiteCRMWhether").click();
  // Fill in contact us fields -
});

test("SuiteCrm contact us E2E", async ({ page }) => {
  await page.getByRole("textbox", { name: "First name *" }).fill("Steven");
  await page.getByRole("textbox", { name: "Last name *" }).fill("Testing");
  await page
    .getByRole("textbox", { name: "Work email *" })
    .fill("testers@testing.co.uk");
  await page.getByRole("textbox", { name: "Job title" }).fill("Job title test");
  await page
    .getByRole("textbox", { name: "Company name *" })
    .fill("Bosher Corp ltd");
  // Select an option from the dropdown menu - standard example using COMBOBOX
  await page.getByRole("combobox").selectOption("United Kingdom");
  // Enter some text in the 'Your message' text field -
  await page
    .getByRole("textbox", { name: "Your message *" })
    .fill(" This is a test message......");
  //Click on 'Privacy Policy' checkbox -
  await page.getByRole("checkbox", { name: "I have read the Privacy" }).click();
  // reCAPTCHA check box - need a library to obtain the -grecaptcha-response token ?
});

test.describe("test of validation error messages", () => {
  // Assert that the correct validation error message is displayed for individual fields

  test("Validation error first name", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.locator(':text-is("Please Enter Your First Name")'),
    ).toHaveText("Please Enter Your First Name");
  });

  test("Validation error last name", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.locator(':text-is("Please Enter Your Last Name")'),
    ).toHaveText("Please Enter Your Last Name");
  });
  test("Validation errors Company Name", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.locator(':text-is("Please Enter Your Company Name")'),
    ).toHaveText("Please Enter Your Company Name");
  });

  test("Validation errors Country dropdown", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.locator(':text-is("Please Select Your Country")'),
    ).toHaveText("Please Select Your Country");
  });

  test("Validation error check for Your message", async ({ page }) => {
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(
      page.locator(':text-is("Please Enter Your Message")'),
    ).toHaveText("Please Enter Your Message");
  });

  test.describe("test of validation error messages quick version?", () => {
    // Assert that the correct validation error message is displayed for ALL fields
    // This actually worked !

    test("Will this do all tests at once?", async ({ page }) => {
      await page.getByRole("button", { name: "Send message" }).click();
      await expect(page.locator(':text-is("Please Enter Your First Name")'),).toHaveText("Please Enter Your First Name");
      await expect(page.locator(':text-is("Please Enter Your Last Name")'),).toHaveText("Please Enter Your Last Name");
      await expect(page.locator(':text-is("Please Enter Your Company Name")'),).toHaveText("Please Enter Your Company Name");
      await expect(page.locator(':text-is("Please Select Your Country")'),).toHaveText("Please Select Your Country");
      await expect(page.locator(':text-is("Please Enter Your Message")'),).toHaveText("Please Enter Your Message");
    });
  });
});
