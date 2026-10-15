import express from "express"
import { create, getAllUsers, getUser, getUpdate, getDelete } from "../controller/userController.js"

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllUsers);
route.get("/user/:id", getUser);
route.put("/update/user/:id", getUpdate);
route.delete("/delete/user/:id", getDelete);
export default route;