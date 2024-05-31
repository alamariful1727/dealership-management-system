-- Vehicles for Main Dealership (ID: 1)
INSERT INTO vehicles (dealership_id, make, model, year, price, vin)
VALUES 
(1, 'Toyota', 'Camry', 2022, 25000.00, '1HGBH41JXMN109186'),
(1, 'Honda', 'Civic', 2021, 22000.00, '1HGBH41JXMN109187'),
(1, 'Ford', 'F-150', 2023, 35000.00, '1HGBH41JXMN109188'),
(1, 'Chevrolet', 'Silverado', 2022, 40000.00, '1HGBH41JXMN109189'),
(1, 'Tesla', 'Model 3', 2023, 45000.00, '1HGBH41JXMN109190');

-- Vehicles for Sub-location 1 (ID: 2)
INSERT INTO vehicles (dealership_id, make, model, year, price, vin)
VALUES 
(2, 'Toyota', 'Corolla', 2022, 20000.00, '1HGBH41JXMN109191'),
(2, 'Honda', 'Accord', 2021, 25000.00, '1HGBH41JXMN109192'),
(2, 'Ford', 'Escape', 2023, 30000.00, '1HGBH41JXMN109193'),
(2, 'Chevrolet', 'Equinox', 2022, 32000.00, '1HGBH41JXMN109194'),
(2, 'Tesla', 'Model Y', 2023, 48000.00, '1HGBH41JXMN109195');

-- Vehicles for Sub-location 2 (ID: 3)
INSERT INTO vehicles (dealership_id, make, model, year, price, vin)
VALUES 
(3, 'Toyota', 'RAV4', 2022, 28000.00, '1HGBH41JXMN109196'),
(3, 'Honda', 'CR-V', 2021, 27000.00, '1HGBH41JXMN109197'),
(3, 'Ford', 'Explorer', 2023, 42000.00, '1HGBH41JXMN109198'),
(3, 'Chevrolet', 'Traverse', 2022, 41000.00, '1HGBH41JXMN109199'),
(3, 'Tesla', 'Model X', 2023, 90000.00, '1HGBH41JXMN109200');

-- Vehicles for Main Dealership (ID: 1) - Additional Vehicles
INSERT INTO vehicles (dealership_id, make, model, year, price, vin)
VALUES 
(1, 'Nissan', 'Altima', 2022, 24000.00, '1HGBH41JXMN109201'),
(1, 'BMW', 'X5', 2021, 60000.00, '1HGBH41JXMN109202'),
(1, 'Audi', 'Q7', 2023, 70000.00, '1HGBH41JXMN109203'),
(1, 'Mercedes-Benz', 'GLE', 2022, 75000.00, '1HGBH41JXMN109204'),
(1, 'Kia', 'Sorento', 2023, 29000.00, '1HGBH41JXMN109205');
