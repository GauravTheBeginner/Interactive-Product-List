# ReadMe for Product List React Component

## Overview
The provided React component, `ProductList`, is a web application that displays a list of products fetched from the [FakeStoreAPI](https://fakestoreapi.com/). Users can filter and search for products based on category and price range, and also search for products by title. The component includes pagination to display a limited number of products per page.

## Prerequisites
Before using the `ProductList` component, make sure you have the following dependencies installed:

- [React](https://reactjs.org/): This component is built using React, so ensure you have React installed in your project.

## Getting Started
1. Include the `ProductList` component in your React application.
2. Ensure that you have all the necessary dependencies installed and configured.

```javascript
import React from "react";
import ProductList from "./ProductList"; // Import the ProductList component

function App() {
  return (
    <div>
      <h1>Product List</h1>
      <ProductList />
    </div>
  );
}

export default App;
```

3. The `ProductList` component will fetch product data and categories from the FakeStoreAPI when it is rendered.

## Component Structure
The `ProductList` component is structured as follows:

- `ProductListContainer`: A container for the entire product list.

- `Filters`: Contains filtering options for the product list, including category selection, price range filters, and search by title.

- `FilterSelect`: A dropdown to select a specific category.

- `FilterInput`: Input fields for the minimum and maximum price filters and the title search filter.

- `Pagination`: Displays pagination controls for navigating between pages.

- `ProductCard`: Represents each individual product card within the list.

## Usage
- **Category Filter**: You can filter products by category using the dropdown menu.

- **Price Filter**: Enter minimum and maximum price values to filter products by price range.

- **Search Filter**: Enter a search query to filter products by title.

- **Pagination**: Use the pagination controls to navigate between pages of products.

## Data Fetching
- The component uses the `axios` library to make API requests to fetch product data and categories from the [FakeStoreAPI](https://fakestoreapi.com/).

- Product data is fetched from the `https://fakestoreapi.com/products` endpoint.

- Categories are fetched from the `https://fakestoreapi.com/products/categories` endpoint.

## Customization
You can customize the component's appearance by modifying the styled components in the code. The styles are defined in the component using the [styled-components](https://styled-components.com/) library. You can adjust the colors, widths, and other CSS properties as needed.

## Feedback and Contributions
If you have feedback, suggestions, or would like to contribute to this project, please feel free to do so. This component can be extended and improved to suit your specific requirements.

## License
This project is open source and available under the [MIT License](LICENSE).

Enjoy using the `ProductList` component in your React application!
