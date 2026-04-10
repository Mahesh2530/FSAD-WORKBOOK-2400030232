# HibernateInventorySpringBoot

Spring Boot + Hibernate CRUD project for Skill-2.

## 1) Create DB

```sql
CREATE DATABASE inventory_db;
USE inventory_db;
```

## 2) Configure DB password

Update `src/main/resources/application.properties`:

```properties
spring.datasource.password=YOUR_PASSWORD
```

## 3) Run

```bash
mvn spring-boot:run
```

## 4) CRUD APIs

- `POST /api/products`
- `GET /api/products/{id}`
- `GET /api/products`
- `PUT /api/products/{id}`
- `DELETE /api/products/{id}`

Sample `POST` body:

```json
{
  "name": "Laptop",
  "description": "Gaming Laptop",
  "price": 75000,
  "quantity": 10
}
```

## 5) ID Strategy Experiment

The project includes extra entities to observe generated IDs:
- `ProductAuto` (`GenerationType.AUTO`)
- `ProductIdentity` (`GenerationType.IDENTITY`)
- `ProductSequence` (`GenerationType.SEQUENCE`)

A startup runner inserts one record into each strategy table and prints generated IDs.
