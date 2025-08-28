Booking System Frontend
Overview

## This app was built as part of a coding test, and the UI design follows the Figma mockup provided by the company (so the visuals aren’t mine). 

## Make sure the backend (Booking system backend) is running at http://localhost:3001 as well!

This is an Angular standalone component project that allows users to:

View available rooms and time slots.

Select rooms and slots.

Book a slot with confirmation modals.

The project is built using Angular 17 (TypeScript) and SCSS.

Mobile-first design: The UI is optimized for phones.

To see it correctly on a desktop, open DevTools and enable device toolbar.

Select a phone model, e.g., Samsung Galaxy S20, to preview the layout.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## To-do/Improvements

Remove hard-coded API baseURL

Add an endpoint: DELETE /api/bookings/:id

Allow admins to cancel/remove bookings.

Free up the associated timeslot after deletion.

Add login/registration.

Define roles (user, admin) to protect sensitive routes.

Only admins can remove bookings or see all bookings.

Extend GET /api/rooms/:id/available to support ?days=5 to fetch next i.e. 5 days to buffer (basically make it smoother for the user)

Change the date-selector to a more traditional calendar so the user can select a date or a range of dates to display.

Send email confirmations(?)

