# Hibernate HQL Skill 3 - Sorting, Pagination & Aggregates

## Overview
This project demonstrates advanced HQL operations using a `Product` entity:
- Sorting (ASC/DESC)
- Pagination
- Aggregate functions (`COUNT`, `MIN`, `MAX`, `AVG`, `SUM`)
- `GROUP BY` operations
- Range filtering (`BETWEEN`)
- Pattern matching (`LIKE`, `LENGTH`)

## Technologies
- Java 11
- Hibernate 5.6
- MySQL 8
- Maven

## Project Structure
- `src/main/java/com/skill3/entity/Product.java`
- `src/main/java/com/skill3/util/HibernateUtil.java`
- `src/main/java/com/skill3/loader/ProductDataLoader.java`
- `src/main/java/com/skill3/demo/HQLDemo.java`
- `src/main/resources/hibernate.cfg.xml`

## Setup
1. Create/start MySQL and ensure credentials in `hibernate.cfg.xml` are valid.
2. Database used: `skill3_db` (auto-created if missing).
3. Build project:
   `mvn clean compile`
4. Run demo:
   `mvn exec:java -Dexec.mainClass=com.skill3.demo.HQLDemo`

## Notes
- Sample products are auto-loaded only when table is empty.
- Update `hibernate.connection.username` and `hibernate.connection.password` based on your local MySQL configuration.
"# Skill-3" 
