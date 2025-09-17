
These tests are written using **Jest** and **Supertest**, and they validate the correctness and reliability of the `/api/v1/course` endpoints.

---

## 📂 What is Covered in the Tests?

### 1. `GET /api/v1/course`
- ✅ **Success**: Returns an array of courses with their `title` and `description`.
- ⚡ **Edge Case**: Returns an empty array (`[]`) when no courses exist.

### 2. `POST /api/v1/course`
- ✅ **Success**: `Admin` or `Coach` can create a new course.  
- ❌ **Validation Error**: Missing required fields should fail validation.  
- ❌ **Forbidden**: `Student` cannot create a course (403 error).

---

## 🔑 Helpers and Seeds

- `supertest.helper.ts` → Provides **authenticated test agents** (`adminAndCoachAuthedTestAgent`, `studntAuthedTestAgent` , `authedTestAgent`) to simulate requests from different roles.  
- `course.seed.ts` → Provides `createRandomCourse()` function using Faker.js to generate random course data for testing.    


---

## ▶️ Running the Tests

Run the following command in your terminal:

```bash
npm run test
