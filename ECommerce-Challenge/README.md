# E Commerce Challenge

## Table Groups

### user_management
- **users**
- **user_profiles**
- **addresses**
- **countries**

### product_management
- **product_categories**
- **products**
- **product_variants**
- **product_attributes**
- **product_attribute_values**
- **product_variant_attributes**

### order_management
- **orders**
- **order_items**
- **payments**
- **payment_methods**

### cart_management
- **shopping_carts**
- **shopping_cart_items**

## Directory Structure

- `src/`
    - `user_management/`
        - Contains entities related to user management (e.g., `User`, `UserProfile`, `Address`, etc.)
    - `product_management/`
        - Contains entities related to product management (e.g., `ProductCategory`, `Product`, `ProductVariant`, etc.)
    - `order_management/`
        - Contains entities related to order management (e.g., `Order`, `OrderItem`, `Payment`, etc.)
    - `cart_management/`
        - Contains entities related to cart management (e.g., `ShoppingCart`, `ShoppingCartItem`, etc.)

    - `test/`
        - `java/`
            - Contains test cases, particularly for product-related data testing.


## Setting Up the Application

1. Clone this repository.
2. Install the necessary dependencies.
3. Make sure you change database name in persistence.xml
4. Make sure to run db.sql to set up the database.
5. Make sure to run countries at `src/test/java/CountryTest`
6. Start the application.

## Running the Application

Once the tests are successful, you can start the application as usual (instructions based on your application's setup, for example, running a server or building a jar file).

## Contribution

Feel free to contribute by opening issues or submitting pull requests. Make sure to write tests for new features or bug fixes and run the product tests to verify product data correctness.
