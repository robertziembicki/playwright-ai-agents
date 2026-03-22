import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';

import invalidDepartureData from '../data/flightData_invalid_departure_unknown.json';
import invalidDestinationData from '../data/flightData_invalid_destination_unknown.json';

const invalidFlightSearchScenarios = [
  {
    name: 'rejects an unknown departure city before searching for flights',
    flightData: invalidDepartureData,
    assertion: async (homePage, { departureCity }) => {
      await expect(homePage.selectDepartureCity(departureCity)).rejects.toThrow(
        new RegExp(`Departure city '${departureCity}' not found`),
      );
    },
  },
  {
    name: 'rejects an unknown destination city before searching for flights',
    flightData: invalidDestinationData,
    assertion: async (homePage, { departureCity, destinationCity }) => {
      await homePage.selectDepartureCity(departureCity);
      await expect(homePage.selectDestinationCity(destinationCity)).rejects.toThrow(
        new RegExp(`Destination city '${destinationCity}' not found`),
      );
    },
  },
];

test.describe('Negative BlazeDemo flight search validation', () => {
  for (const { name, flightData, assertion } of invalidFlightSearchScenarios) {
    test(name, async ({ page }) => {
      test.setTimeout(15000);

      const homePage = new HomePage(page);

      await homePage.goto();
      await homePage.verifyHomePageLoaded();
      await assertion(homePage, flightData);

      await expect(page).toHaveURL(/https:\/\/blazedemo\.com\/?$/, { timeout: 2000 });
      await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!', {
        timeout: 2000,
      });
    });
  }
});
