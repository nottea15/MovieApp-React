import { Router } from "express";
import multer from "multer";

import {
  register,
  login,
  getUser,
  favouriteMovie,
  removefavouriteMovie,
} from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const upload = multer({
  storage: storage,
});

// Register
//http://localhost:3002/api/auth/register
router.post("/register", upload.single("image"), register);

// login
//http://localhost:3002/api/auth/login
router.post("/login", login);

// login
//http://localhost:3002/api/auth/get
router.get("/get", checkAuth, getUser);

// bokmark
//http://localhost:3002/api/auth/favouriteMovie/add
router.post("/favouriteMovie/add", checkAuth, favouriteMovie);

// bokmark
//http://localhost:3002/api/auth/favouriteMovie/add
router.delete("/favouriteMovie/remove/:id", checkAuth, removefavouriteMovie);

export default router;
