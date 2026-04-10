# SKILL 9 - Global Exception Handling using @ControllerAdvice

Spring Boot REST API demonstrating centralized exception handling with custom exceptions.

## Features
- `StudentNotFoundException` for unavailable IDs
- `InvalidInputException` for invalid ID format/values
- `@ControllerAdvice` with `@ExceptionHandler`
- Structured error JSON:
  - `timestamp`
  - `message`
  - `statusCode`

## Endpoint
- `GET /student/{id}`

## Run in VS Code
```bash
cd "/Users/avinashreddypadala/FULL STACK SKILL/Skill-9"
mvn spring-boot:run
```

## Postman Tests
1. Valid ID:
`GET http://localhost:8080/student/1`
Expected: `200 OK`

2. Invalid existing ID:
`GET http://localhost:8080/student/99`
Expected: `404 NOT_FOUND` with readable JSON error

3. Invalid format:
`GET http://localhost:8080/student/abc`
Expected: `400 BAD_REQUEST` with readable JSON error

## Build
```bash
mvn clean test package
```

## Push to GitHub
```bash
git init
git add .
git commit -m "Skill 9: Global exception handling with @ControllerAdvice"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
