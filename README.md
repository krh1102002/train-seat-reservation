# Train Seat Reservation System

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

## Project Overview

This Angular-based Train Seat Reservation System allows users to view available seats and make reservations. It uses MongoDB for data persistence and provides a user-friendly interface for seat selection and booking.

## Features

- Visual representation of available and booked seats
- Interactive seat booking interface
- Real-time updates of seat availability
- MongoDB integration for data persistence
- Toast notifications for user feedback
- Responsive design for various screen sizes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.x or later)
- npm (v6.x or later)
- Angular CLI (v16.2.2 or compatible)
- MongoDB (v4.x or later)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/krh1102002/train-seat-reservation.git
   cd train-seat-reservation
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Ensure MongoDB is running on your local machine (default port: 27017).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Configuration

1. Update the MongoDB connection string in `src/app/core/services/seat-reservation.service.ts` if your MongoDB setup is different from the default (localhost:27017).

2. Update `angular.json` to include Toastr styles:

   ```json
   "styles": [
     "node_modules/ngx-toastr/toastr.css",
     "src/styles.scss"
   ]
   ```

3. If necessary, update `tsconfig.json` to allow CommonJS modules:
   ```json
   "compilerOptions": {
     ...
     "allowSyntheticDefaultImports": true,
     "esModuleInterop": true
   }
   ```

## Usage

1. The main page displays a grid of seats, with available seats in green and booked seats marked with an 'X'.
2. Enter the number of seats you wish to book (1-7) in the input field.
3. Click the "Reserve Seats" button to make a reservation.
4. If the booking is successful, you'll see a toast notification with the booked seat numbers.
5. If there's an error (e.g., not enough seats available), you'll see an error notification.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

- Angular team for the fantastic framework
- MongoDB for the robust database solution
- ngx-toastr for the toast notifications
