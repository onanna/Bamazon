CREATE DATABASE bamazon;
use bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

insert INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eggs", "grocery", 1.99, 12),
 ("Milk", "grocery", 2.99, 24),
  ("PS3", "electronics", 199.99, 5),
  ("Xbox 360", "electronics", 179.99, 7),
  ("iPad", "electronics", 399.99, 18),
  ("Bicycle", "sporting goods", 599.99, 2),
  ("Football", "sporting goods", 9.99, 49),
  ("50 Shades of Grey", "books", 9.99, 69),
  ("Game of Thrones", "books", 19.99, 33),
  ("Fight Club", "books", 11.99, 6),
  ("Fight Club", "dvds", 13.99, 36),  
  ("Office Space", "dvds", 9.99, 21),
  ("Dark Side of the Moon", "music", 11.55, 15);
 
 SELECT * FROM products;