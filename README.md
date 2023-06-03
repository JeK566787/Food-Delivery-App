# Food Delivery App

This project is a food delivery app built using React.js. It allows users to browse different shops, add items to their shopping cart, and submit orders.

## Features

- Browse and select shops
- View and add items to the shopping cart
- Remove items from the shopping cart
- Update the quantity of items in the shopping cart
- Submit orders with contact information
- View previous orders

## Installation

1. Clone the repository:

`git clone https://github.com/JeK566787/Food-Delivery-App`

2. Navigate to the project directory:

3. Install the dependencies:

`npm i`

4. Start the development server:

`npm run dev`

5. Open the web application in your browser:
   `npm start`

## Dependencies

The project relies on the following dependencies:

- React: JavaScript library for building user interfaces
- React Router DOM: Routing library for React applications
- Axios: Promise-based HTTP client for making API requests
- Other dependencies can be found in the `package.json` file.

## Technologies Used

- Frontend:

  - React.js: JavaScript library for building user interfaces.
  - React Router: Routing library for handling navigation and URL routing in the app.
  - Axios: JavaScript library for making HTTP requests to the backend API.

- Backend:

  - Node.js: JavaScript runtime for executing server-side code.
  - Express.js: Web framework for building the RESTful API.
  - MongoDB: NoSQL database for storing superhero data.
  - Mongoose: MongoDB object modeling for Node.js.

- Data Base:

  - MongoDB Atlas: Fully-managed cloud database service provided by MongoDB.

## API

The project interacts with a RESTful API to fetch shop data, cart items, submit orders, and retrieve previous orders. The API endpoints used in the project are:

- `GET /api/shops` - Retrieve a list of available shops
- `GET /api/cartitems` - Retrieve the current items in the shopping cart
- `POST /api/cartitems` - Add an item to the shopping cart
- `DELETE /api/cartitems/:itemId` - Remove an item from the shopping cart
- `DELETE /api/cartitems` - Remove all items from the shopping cart
- `PUT /api/cartitems/:itemId` - Update the quantity of an item in the shopping cart
- `POST /api/orders` - Submit an order
- `GET /api/orders` - Retrieve a list of previous orders

## Enjoy Food Delivery App
