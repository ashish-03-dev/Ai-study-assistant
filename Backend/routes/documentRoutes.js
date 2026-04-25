import express from "express";
import multer from "multer";
import {
    uploadDocument,
    deleteDocument,
    getAllDocuments,
    getDocumentById
} from "../controllers/documentController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage});

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/", getAllDocuments);
router.get('/:id', getDocumentById);
router.delete('/:id', deleteDocument);

export default router;