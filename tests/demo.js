// tests/flightReservation.spec.js

import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { FlightsPage } from '../Pages/FlightsPage';
import { PurchasePage } from '../Pages/PurchasePage';
import { ConfirmationPage } from '../Pages/ConfirmationPage';

// Import test data
import flightData from '../data/flightData.json';
import passengerInfo from '../data/passengerInfo.json';
import paymentInfo from '../data/paymentInfo.json';

test('Search and Reserve a Flight on BlazeDemo', async ({ page }) => {
  const { departureCity, destinationCity } = flightData;

  const homePage = new HomePage(page);
  const flightsPage = new FlightsPage(page);
  const purchasePage = new PurchasePage(page);
  const confirmationPage = new ConfirmationPage(page);

  await homePage.goto();
  await homePage.verifyHomePageLoaded();
  await homePage.selectDepartureCity(departureCity);
  await homePage.selectDestinationCity(destinationCity);
  await homePage.findFlights();

  await flightsPage.verifyFlightsPage(departureCity, destinationCity);
  await flightsPage.verifyFlightsDisplayed();
  await flightsPage.selectFirstFlight();

  await purchasePage.verifyPurchasePageLoaded();
  await purchasePage.fillPassengerInfo(passengerInfo);
  await purchasePage.fillPaymentInfo(paymentInfo);
  await purchasePage.purchaseFlight();

  await confirmationPage.verifyConfirmationPage();
  await confirmationPage.verifyConfirmationDetails();
});
