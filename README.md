# CloudSpend

CloudSpend is a cloud-cost monitoring portfolio project. The current UI contains illustrative monthly cost data; backend persistence and API integration are being added incrementally.

## Technology

- Java 21 and Spring Boot 4.1.2
- Maven
- Spring Web MVC and Spring Data JPA
- PostgreSQL
- React, TypeScript and Vite

## Run the backend locally (Windows PowerShell)

### 1. Create the database

Make sure PostgreSQL is running, then connect as your PostgreSQL administrator:

```sql
CREATE DATABASE cloudspend;
```

You can run the statement using pgAdmin or:

```powershell
psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE cloudspend;"
```

If the database already exists, do not create it again.

### 2. Configure the database connection

Set these environment variables in the same PowerShell window that will run the backend:

```powershell
$env:DB_URL = "jdbc:postgresql://localhost:5432/cloudspend"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "your-local-postgres-password"
```

Replace the password with the password configured for your local PostgreSQL user. Do not commit real credentials to Git.

The backend defaults to the local URL and username above. The password is deliberately supplied through `DB_PASSWORD`.

### 3. Start the backend

```powershell
cd backend
.\mvnw.cmd clean test
.\mvnw.cmd spring-boot:run
```

### 4. Verify the endpoints

In another PowerShell window:

```powershell
Invoke-RestMethod http://localhost:8080/api/health
Invoke-RestMethod http://localhost:8080/api/health/database
```

The database health endpoint executes `SELECT 1`. A successful response should report:

```json
{
  "status": "UP",
  "database": "PostgreSQL"
}
```

The application currently has no expense entities or schema migrations. Hibernate schema generation is therefore disabled intentionally; we will introduce versioned migrations alongside the first persisted domain model.

## Frontend

```powershell
cd frontend
npm install
npm run dev
```

The current dashboard uses sample data. Replacing it with backend-backed spend summaries is a subsequent milestone.
