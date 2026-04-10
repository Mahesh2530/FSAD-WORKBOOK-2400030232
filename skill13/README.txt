
FULL STACK PROJECT RUN GUIDE

1. FRONTEND:
   cd frontend
   npm install
   npm run build

2. BACKEND:
   cd backend
   mvn clean package
   Copy frontend build into:
   src/main/resources/static/

   Run:
   java -jar target/backend-0.0.1-SNAPSHOT.jar

3. OPEN:
   http://localhost:8080

You will see React UI + backend message.
