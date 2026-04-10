# SKILL 8 - Spring Boot JPQL & Query Methods Module

Product search module for category-based search, price range filtering, and sorting using Spring Data JPA.

## Stack
- Java 17
- Spring Boot 3
- Spring Data JPA
- H2 Database

## Product Entity Fields
- `id`
- `name`
- `category`
- `price`

## Repository Methods
Derived query methods:
- `findByCategory(String category)`
- `findByPriceBetween(double min, double max)`

JPQL methods:
- Sort by price
- Fetch products above a price
- Fetch products by category

## Endpoints
- `GET /products/category/{category}`
- `GET /products/filter?min=&max=`
- `GET /products/sorted`
- `GET /products/expensive/{price}`
- `GET /products/category-jpql/{category}` (extra endpoint for JPQL category query)

## Run in VS Code
```bash
cd "/Users/avinashreddypadala/FULL STACK SKILL/Skill-8"
mvn spring-boot:run
```

## Postman Testing
1. Category:
`GET http://localhost:8080/products/category/Electronics`

2. Filter:
`GET http://localhost:8080/products/filter?min=2000&max=10000`

3. Sorted:
`GET http://localhost:8080/products/sorted`

4. Expensive:
`GET http://localhost:8080/products/expensive/5000`

5. Invalid range:
`GET http://localhost:8080/products/filter?min=10000&max=1000`
Expected `400 BAD_REQUEST`

## Build
```bash
mvn clean test package
```

## Push to GitHub
```bash
git init
git add .
git commit -m "Skill 8: Spring Boot JPQL and query methods module"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
