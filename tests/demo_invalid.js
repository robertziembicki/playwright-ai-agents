import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';

import flightData from '../data/flightData_invalid.json';

// Test: Attempt booking with invalid data
// This test checks that invalid cities fail fast and do not proceed further.

test('Attempt booking with invalid data', async ({ page }) => {
  const { departureCity, destinationCity } = flightData;
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.verifyHomePageLoaded();
  try {
    await homePage.selectDepartureCity(departureCity);
  } catch (e) {
    throw new Error(`Departure city '${departureCity}' not found: ${e.message}`);
  }
  try {
    await homePage.selectDestinationCity(destinationCity);
  } catch (e) {
    throw new Error(`Destination city '${destinationCity}' not found: ${e.message}`);
  }
});
