import { test, expect } from '@playwright/test';

test.describe('UI Components Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'UI Components Demo' })).toBeVisible();
  });

  test('should have all component sections', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Buttons' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Input Fields' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Modal' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Data Table' })).toBeVisible();
  });

  test('buttons should be interactive', async ({ page }) => {
    const primaryButton = page.getByRole('button', { name: 'Primary Button' });
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toBeEnabled();
    
    const disabledButton = page.getByRole('button', { name: 'Disabled' });
    await expect(disabledButton).toBeDisabled();
  });

  test('modal should open and close', async ({ page }) => {
    // Open modal
    await page.getByRole('button', { name: 'Open Modal' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Example Modal')).toBeVisible();
    
    // Close modal with cancel button
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
    
    // Open modal again and close with escape key
    await page.getByRole('button', { name: 'Open Modal' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('data table should be sortable', async ({ page }) => {
    const nameHeader = page.getByRole('columnheader', { name: 'Name' });
    await expect(nameHeader).toBeVisible();
    
    // Click to sort
    await nameHeader.click();
    
    // Verify table content is present
    await expect(page.getByText('John Doe')).toBeVisible();
    await expect(page.getByText('jane@example.com')).toBeVisible();
  });

  test('input validation works', async ({ page }) => {
    const emailInput = page.getByLabel('Email');
    const submitButton = page.getByRole('button', { name: 'Submit Form' });
    
    // Try to submit without value
    await submitButton.click();
    await expect(page.getByText('This field is required')).toBeVisible();
    
    // Enter value and submit
    await emailInput.fill('test@example.com');
    await submitButton.click();
    
    // Should show loading state
    await expect(page.getByRole('button', { name: 'Submitting...' })).toBeVisible();
  });
});