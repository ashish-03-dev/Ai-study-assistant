import express from "express";
import { askQuery } from "../controllers/queryController.js";

const router = express.Router();

router.post("/", askQuery);                 // POST /api/queries
// router.get("/", getAllQueries);             // GET  /api/queries
// router.get("/:id", getQueryById);           // GET  /api/queries/:id
// router.delete("/:id", deleteQuery);         // DELETE /api/queries/:id

export default router;