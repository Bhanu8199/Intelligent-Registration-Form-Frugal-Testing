import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Frugal Registration Form', () => {
  test.beforeEach(async ({ page }) => {
    const filePath = path.resolve(process.cwd(), 'index.html').replace(/\\/g, '/');
    await page.goto(`file:///${filePath}`);
  });

  test('should display the registration form', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Frugal Registration Form');
    await expect(page.locator('#registrationForm')).toBeVisible();
  });

  test('should submit form with valid data and show success alert', async ({ page }) => {
    // Fill in required fields
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#phone', '+911234567890');
    await page.selectOption('#country', 'India');
    await page.selectOption('#state', 'Maharashtra');
    await page.selectOption('#city', 'Mumbai');
    await page.fill('#password', 'Password123!');
    await page.fill('#confirmPassword', 'Password123!');
    await page.check('#genderMale');
    await page.check('#terms');

    // Submit the form
    await page.click('#submitButton');

    // Check for success alert
    await expect(page.locator('#successAlert')).toBeVisible();
    await expect(page.locator('#successAlert')).toContainText('Registration Successful!');
  });

  test('should validate required fields', async ({ page }) => {
    // Check that submit button is disabled
    await expect(page.locator('#submitButton')).toBeDisabled();

    // Check error messages are shown
    await expect(page.locator('#error-firstName')).toBeVisible();
    await expect(page.locator('#error-lastName')).toBeVisible();
    await expect(page.locator('#error-email')).toBeVisible();
    await expect(page.locator('#error-phone')).toBeVisible();
    await expect(page.locator('#error-country')).toBeVisible();
    await expect(page.locator('#error-state')).toBeVisible();
    await expect(page.locator('#error-city')).toBeVisible();
    await expect(page.locator('#error-password')).toBeVisible();
    await expect(page.locator('#error-confirmPassword')).toBeVisible();
    await expect(page.locator('#error-terms')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.fill('#email', 'invalid-email');
    await page.locator('#email').blur();

    // Check that email error is shown
    await expect(page.locator('#error-email')).toBeVisible();
    await expect(page.locator('#error-email')).toContainText('Enter a valid email address');
  });

  test('should validate password strength', async ({ page }) => {
    await page.fill('#password', 'weak');
    await page.locator('#password').blur();

    // Check that password error is shown
    await expect(page.locator('#error-password')).toBeVisible();
    await expect(page.locator('#error-password')).toContainText('Password must be at least 8 chars');
  });

  test('should validate password confirmation match', async ({ page }) => {
    await page.fill('#password', 'Password123!');
    await page.fill('#confirmPassword', 'DifferentPassword123!');
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#phone', '+911234567890');
    await page.selectOption('#country', 'USA');
    await page.selectOption('#state', 'California');
    await page.selectOption('#city', 'Los Angeles');
    await page.check('#genderMale');
    await page.check('#terms');

    // Check that confirm password error is shown
    await expect(page.locator('#error-confirmPassword')).toBeVisible();
    await expect(page.locator('#error-confirmPassword')).toContainText('Passwords do not match');
  });

  test('should validate phone number format based on country', async ({ page }) => {
    await page.selectOption('#country', 'USA');
    await page.fill('#phone', '1234567890'); // Does not start with country code +1
    await page.locator('#phone').blur();

    // Check that phone error is shown
    await expect(page.locator('#error-phone')).toBeVisible();
    await expect(page.locator('#error-phone')).toContainText('Phone must start with code +1 (for USA).');
  });



  test('should dynamically populate state and city dropdowns', async ({ page }) => {
    // Select USA
    await page.selectOption('#country', 'USA');

    // Check that states are populated
    await expect(page.locator('#state option')).toHaveCount(4); // 1 default + 3 states

    // Select a state
    await page.selectOption('#state', 'California');

    // Check that cities are populated
    await expect(page.locator('#city option')).toHaveCount(22); // 1 default + 21 cities

    // Select India
    await page.selectOption('#country', 'India');

    // Check that states are populated
    await expect(page.locator('#state option')).toHaveCount(11); // 1 default + 10 states
  });

  test('should validate terms acceptance', async ({ page }) => {
    // Fill all fields except terms
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#phone', '+911234567890');
    await page.selectOption('#country', 'USA');
    await page.selectOption('#state', 'California');
    await page.selectOption('#city', 'Los Angeles');
    await page.fill('#password', 'Password123!');
    await page.fill('#confirmPassword', 'Password123!');
    await page.check('#genderMale');

    // Don't check terms

    // Check that terms error is shown
    await expect(page.locator('#error-terms')).toBeVisible();
    await expect(page.locator('#error-terms')).toContainText('You must accept the terms');
  });

  test('should reset form after successful submission', async ({ page }) => {
    // Fill and submit form
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#phone', '+911234567890');
    await page.selectOption('#country', 'India');
    await page.selectOption('#state', 'Maharashtra');
    await page.selectOption('#city', 'Mumbai');
    await page.fill('#password', 'Password123!');
    await page.fill('#confirmPassword', 'Password123!');
    await page.check('#genderMale');
    await page.check('#terms');

    await page.click('#submitButton');

    // Wait for success alert and form reset
    await page.waitForTimeout(3500);

    // Check that form is reset
    await expect(page.locator('#firstName')).toHaveValue('');
    await expect(page.locator('#lastName')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#phone')).toHaveValue('');
    await expect(page.locator('#country')).toHaveValue('');
    await expect(page.locator('#state')).toHaveValue('');
    await expect(page.locator('#city')).toHaveValue('');
    await expect(page.locator('#password')).toHaveValue('');
    await expect(page.locator('#confirmPassword')).toHaveValue('');
    await expect(page.locator('#genderMale')).not.toBeChecked();
    await expect(page.locator('#terms')).not.toBeChecked();
  });

  test('should validate firstName minimum length', async ({ page }) => {
    await page.fill('#firstName', 'A'); // Less than min 2
    await page.locator('#firstName').blur();
    await expect(page.locator('#error-firstName')).toBeVisible();
  });

  test('should validate firstName maximum length', async ({ page }) => {
    const longName = 'A'.repeat(101); // Exceeds max 100
    await page.fill('#firstName', longName);
    await expect(page.locator('#firstName')).toHaveValue('A'.repeat(100)); // Maxlength truncates
  });

  test('should validate lastName minimum length', async ({ page }) => {
    await page.fill('#lastName', 'B'); // Less than min 2
    await page.locator('#lastName').blur();
    await expect(page.locator('#error-lastName')).toBeVisible();
  });

  test('should validate lastName maximum length', async ({ page }) => {
    const longName = 'B'.repeat(101); // Exceeds max 100
    await page.fill('#lastName', longName);
    await expect(page.locator('#lastName')).toHaveValue('B'.repeat(100)); // Maxlength truncates
  });

  test('should validate address maximum length', async ({ page }) => {
    const longAddress = 'A'.repeat(251); // Exceeds max 250
    await page.fill('#address', longAddress);
    await expect(page.locator('#address')).toHaveValue('A'.repeat(250)); // Maxlength truncates
  });

  test('should validate password maximum length', async ({ page }) => {
    const longPassword = 'A'.repeat(31); // Exceeds max 30
    await page.fill('#password', longPassword);
    await expect(page.locator('#password')).toHaveValue('A'.repeat(30)); // Maxlength truncates
  });
});
