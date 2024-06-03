# Dealership Management System (DMS)

## Overview

The Dealership Management System (DMS) is a backend system designed to manage operations for automotive dealerships. The system accommodates multiple dealerships, each with its own vehicle inventory, sales records, and customer interactions. This project includes a **PostgreSQL** database schema and a **GraphQL API** built using **NodeJS**, **Express** and **TypeScript**, which supports the following functionalities:

- Adding and updating vehicle inventory.
- Searching for vehicles by different criteria.
- Recording sales transactions linked to customers and specific vehicles.

## Features

- PostgreSQL.
- GraphQL Apollo server.
- Docker.
- Github actions.
- TypeScript.
- Eslint.
- Prettier.

## Database Schema

The PostgreSQL schema includes the following tables:

- `dealerships`
- `vehicles`
- `customers`
- `sales`

```sql
-- Create Dealerships Table with Location Information
CREATE TABLE dealerships (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES dealerships(id) ON DELETE SET NULL
);

-- Create Vehicles Table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    dealership_id INT NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    vin VARCHAR(17) NOT NULL,
    FOREIGN KEY (dealership_id) REFERENCES dealerships(id) ON DELETE CASCADE,
    UNIQUE (dealership_id, vin)
);

-- Create Customers Table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    dealership_id INT NOT NULL,
    FOREIGN KEY (dealership_id) REFERENCES dealerships(id) ON DELETE CASCADE
);

-- Create Sales Table
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    vehicle_id INT NOT NULL,
    customer_id INT NOT NULL,
    dealership_id INT NOT NULL,
    sale_date DATE NOT NULL,
    sale_price NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (dealership_id) REFERENCES dealerships(id) ON DELETE CASCADE
);

-- Indexes for Vehicles Table
    -- Make, Model, Year: For vehicle searches.
CREATE INDEX idx_vehicles_make_model_year ON vehicles (make, model, year);
    -- Dealership ID: For inventory management.
CREATE INDEX idx_vehicles_dealership_id ON vehicles (dealership_id);

-- Indexes for Customers Table
    -- Last Name: For customer lookups.
CREATE INDEX idx_customers_last_name ON customers (last_name);
    -- Dealership ID: For managing customers per dealership.
CREATE INDEX idx_customers_dealership_id ON customers (dealership_id);

-- Indexes for Sales Table
    -- Vehicle ID: For vehicle sales history.
CREATE INDEX idx_sales_vehicle_id ON sales (vehicle_id);
    -- Customer ID: For customer purchase history.
CREATE INDEX idx_sales_customer_id ON sales (customer_id);
    -- Dealership ID: For sales per dealership.
CREATE INDEX idx_sales_dealership_id ON sales (dealership_id);
```

## Index Rationale

- `idx_vehicles_make_model_year`: Facilitates quick searches by make, model, and year.
- `idx_vehicles_dealership_id`: Optimizes queries filtering by dealership.
- `idx_customers_last_name`: Speeds up customer lookups by last name.
- `idx_customers_dealership_id`: Improves performance for queries by dealership.
- `idx_sales_vehicle_id`, `idx_sales_customer_id`, `idx_sales_dealership_id`: Enhances query performance on sales records.

## GraphQL API - Setup Instructions

The GraphQL API is built using **Apollo Server**, **NodeJS**, **Express** and **TypeScript**.

#### Clone the Repository

```bash
git clone https://github.com/alamariful1727/dealership-management-system.git
cd dealership-management-system
```

#### Database Setup: Run the Docker container for PostgreSQL.

```bash
docker compose up -d
```

#### To use specific node version for this project from `.nvm`.

```bash
nvm use
```

#### Install all the necessary packages.

```bash
yarn install
```

#### Runs the app in the development mode.

```bash
yarn dev
```

## API Endpoints

### Dealership

#### Get all Dealerships

```graphql
query {
	getAllDealerships {
		id
		name
		address
		city
		province
		postal_code
		parent_id
	}
}
```

#### Get Single Dealership

```graphql
query {
	getSingleDealership(id: 1) {
		id
		name
		address
		city
		province
		postal_code
		parent_id
	}
}
```

#### Add root dealership

```graphql
mutation {
	createDealership(
		dealership: {
			name: "Test Dealership 1"
			address: "123 Main St"
			city: "Sample City"
			province: "Sample Province"
			postal_code: "12345"
			parent_id: null
		}
	) {
		id
		name
		address
		city
		province
		postal_code
		parent_id
	}
}
```

#### Add dealership branch

```graphql
mutation {
	createDealership(
		dealership: {
			name: "SUB - Test Dealership 2"
			address: "123 Main St"
			city: "Sample City"
			province: "Sample Province"
			postal_code: "12345"
			parent_id: 1
		}
	) {
		id
		name
		address
		city
		province
		postal_code
		parent_id
	}
}
```

### Vehicle

#### Add Vehicle

```graphql
mutation {
	createVehicle(
		vehicle: {
			dealership_id: 1
			make: "Toyota"
			model: "Corolla"
			year: 2022
			price: 20000.00
			vin: "1HGBH41JXMN109191"
		}
	) {
		id
		dealership_id
		make
		model
		year
		price
		vin
	}
}
```

#### Update Vehicle

```graphql
mutation {
	mutation {
		updateVehicle(vehicle: { id: 1, make: "TOYOTA" }) {
			id
			dealership_id
			make
			model
			year
			price
			vin
		}
	}
}
```

#### Search Vehicle with pagination

```graphql
query {
	searchVehicles(vehicleSearch: { offset: 0, limit: 5 }) {
		id
		dealership_id
		make
		model
		year
		price
		vin
	}
}
```

#### Case insensitive vehicle search with pagination

```graphql
query {
	searchVehicles(
		vehicleSearch: {
			vin: null
			make: "toyota"
			dealership_id: null
			yearMin: 2015
			yearMax: 2022
			priceMin: 10000
			priceMax: 40000
			model: null
			offset: 0
			limit: 5
		}
	) {
		id
		dealership_id
		make
		model
		year
		price
		vin
	}
}
```

#### Case insensitive customer search with pagination

```graphql
query {
	searchCustomers(customerSearch: { last_name: "Arif", offset: 0, limit: 5 }) {
		id
		dealership_id
		first_name
		last_name
		email
		phone
	}
}
```

#### Case insensitive sales report search with pagination by vehicle/dealership/customer

```graphql
query {
	salesReport(
		salesReportSearch: {
			vehicle_id: null
			dealership_id: null
			customer_id: 4
			offset: 0
			limit: 5
		}
	) {
		id
		make
		model
		year
		first_name
		last_name
		sale_date
		sale_price
	}
}
```

## Conclusion

This Dealership Management System provides a robust backend solution for managing dealership operations with PostgreSQL and GraphQL. The project is designed to be scalable, secure, and easy to use, with comprehensive documentation and setup instructions.

For any questions or further assistance, please contact alamariful1727@gmail.com.
