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