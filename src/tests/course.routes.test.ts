import { createRandomCourse } from "../../seeds/course.seed";
import {
  adminAndCoachAuthedTestAgent,
  authedTestAgent,
  studntAuthedTestAgent,
  user1,
} from "./helper/supertest.helper";
import { extractFields } from "../../utils/object.util";
import courseRepo from "../course/course.repo";

describe("course routes endpoint", () => {
  describe("/api/v1/course", () => {
    it("should return array of courses", async () => {
      const response = await authedTestAgent.get("/api/v1/course");
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        data: expect.any(Array),
        message: "Courses retrieved successfully",
        statusCode: 200,
        success: true,
      });
      if (response.body.data.length) {
        const userArr = response.body.data;
        expect(userArr[0]).toMatchObject({
          title: expect.any(String),
          description: expect.any(String),
        });
      }
      console.log(response.body, "All courses");
      console.log(response.body.data[0], "The first course");
      console.log(`I'm a ${user1.role}`);
    });
    it("should return empty array", async () => {
      const response = await authedTestAgent.get("/api/v1/course");

      expect(response.statusCode).toBe(200);

      expect(response.body).toEqual({
        data: [],
        message: "There are no courses yet",
        statusCode: 204,
        success: true,
      });

      console.log(response.body, "data");
      console.log(`I'm a ${user1.role}`);
    });
  });

  describe("/api/v1/course", () => {
    it("should create course and return course", async () => {
      const newCourse = extractFields(createRandomCourse(), [
        "title",
        "description",
      ]);
      const response = await adminAndCoachAuthedTestAgent
        .post("/api/v1/course")
        .send(newCourse);

      expect(response.body).toEqual({
        success: true,
        data: expect.objectContaining({
          title: newCourse.title,
          description: newCourse.description,
        }),
        statusCode: 201,
        message: "Course created successfully",
      });

      console.log(`I'm a ${user1.role}`);
      console.log(response.body, "The course was created");

      const createdCourse = courseRepo.findBy("title", newCourse.title);
      expect(createdCourse).toBeDefined();
      expect(Object.keys(createdCourse!).length).toBeGreaterThan(5);
    });

    it("Missing required fields", async () => {
      const newCourse = extractFields(createRandomCourse(), [
        "title",
        "description",
      ]);
      const response = await adminAndCoachAuthedTestAgent
        .post("/api/v1/course")
        .send(newCourse);

      console.log(`I'm a ${user1.role}`);

      expect(response.body.data).toHaveProperty("description");
      expect(response.body.data).toHaveProperty("title");
    });

    it("STUDENT cannot create a course", async () => {
      const newCourse = extractFields(createRandomCourse(), [
        "title",
        "description",
      ]);
      const response = await studntAuthedTestAgent
        .post("/api/v1/course")
        .send(newCourse);
      console.log(`I'm a ${user1.role}`);
      expect(response.body).toEqual({
        success: false,
        statusCode: 403,
        message: "You do not have sufficient permissions to access this route!",
      });
    });
  });
});
