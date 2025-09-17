import { app } from "../../server";
import { USERS_DATA } from "../../user/user.data";
import supertest from "supertest";
import { generateToken } from "../../../utils/jwt.util";

export const user1 = USERS_DATA[0]!;

let generalToken = generateToken({
  email: user1.email,
  name: user1.name,
  role: user1.role,
  sub: user1.id,
});

let adminAndCoachToken;
let studentToken;
if (user1.role === "admin" || user1.role === "coach") {
  adminAndCoachToken = generateToken({
    email: user1.email,
    name: user1.name,
    role: user1.role,
    sub: user1.id,
  });
} else {
  studentToken = generateToken({
    email: user1.email,
    name: user1.name,
    role: user1.role,
    sub: user1.id,
  });
}

export const authedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${generalToken}`);

export const adminAndCoachAuthedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${adminAndCoachToken}`);
export const studntAuthedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${studentToken}`);
