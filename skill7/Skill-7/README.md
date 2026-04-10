# SKILL 7 - REST API CRUD using ResponseEntity

Spring Boot REST API for managing university courses with proper HTTP status codes and structured responses.

## Tech
- Java 17
- Spring Boot 3
- Maven

## Entity
`Course` fields:
- `courseId` (Long)
- `title` (String)
- `duration` (String)
- `fee` (Double)

## Run in VS Code
1. Open folder: `Skill-7`
2. Open terminal
3. Run:
   ```bash
   mvn spring-boot:run
   ```
4. Base URL:
   `http://localhost:8080`

## Endpoints
- `POST /courses` -> create
- `PUT /courses/{courseId}` -> update
- `DELETE /courses/{courseId}` -> delete
- `GET /courses/{courseId}` -> get one
- `GET /courses` -> get all
- `GET /courses/search/{title}` -> search by title

All responses follow:
```json
{
  "success": true,
  "message": "Course created successfully.",
  "data": {}
}
```

## Postman Test Cases

### Valid case: create course
`POST /courses`
```json
{
  "courseId": 101,
  "title": "Data Structures",
  "duration": "12 Weeks",
  "fee": 15000
}
```
Expected: `201 CREATED`

### Invalid case: duplicate courseId
Send same `courseId` again.
Expected: `400 BAD_REQUEST`

### Valid case: update existing course
`PUT /courses/101`
```json
{
  "title": "Advanced Data Structures",
  "duration": "14 Weeks",
  "fee": 18000
}
```
Expected: `200 OK`

### Invalid case: update non-existing course
`PUT /courses/999`
Expected: `404 NOT_FOUND`

### Valid case: delete existing course
`DELETE /courses/101`
Expected: `200 OK`

### Invalid case: delete non-existing course
`DELETE /courses/999`
Expected: `404 NOT_FOUND`

### Valid case: search by title
`GET /courses/search/data`
Expected: `200 OK`

## Build and Test
```bash
mvn clean test
mvn clean package
```

## GitHub Push
```bash
git init
git add .
git commit -m "Skill 7: REST API CRUD using ResponseEntity"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
