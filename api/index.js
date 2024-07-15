import express from "express";
const app = express();
import storiyRoutes from "./routes/stories.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath from url module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     //cb(null, "../client/public/upload");
//     cb(null, "/app/public/upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

const storage = multer.diskStorage({
  destination:path.join(__dirname,'public','upload'),
  filename:function (req, file, cb) {
      try {
        cb(null, Date.now() + file.originalname);
      } catch (error) {
        console.log("50",error);
      }
    },
  // destination: function (req, file, cb) {
  //   try {
  //     // const uploadPath = "/app/public/upload";
  //     cb(null, uploadPath);
  //   } catch (error) {
  //     console.log("43",error);
  //   }
  // },
  // filename: function (req, file, cb) {
  //   try {
  //     cb(null, Date.now() + file.originalname);
  //   } catch (error) {
  //     console.log("50",error);
  //   }
  // },
});

const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   console.log("file path",file.path);
//   res.status(200).json(file.filename);
// });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    console.log("file path", file.path);
    res.status(200).json(file.filename);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file" });
  }
});


app.use("/api/stories", storiyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

app.listen(8800, () => {
  console.log("API working!");
});

// import express from "express";
// import cors from "cors";
// import multer from "multer";
// import cookieParser from "cookie-parser";
// import path from "path";
// import { fileURLToPath } from "url"; // Import fileURLToPath from url module
// import storiyRoutes from "./routes/stories.js";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import commentRoutes from "./routes/comments.js";
// import likeRoutes from "./routes/likes.js";
// import relationshipRoutes from "./routes/relationships.js";

// // Convert import.meta.url to __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // Middlewares
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
// app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     try {
//       const uploadPath = path.join(__dirname,'client', 'public', 'upload');
//       cb(null, uploadPath);
//     } catch (error) {
//       console.error("Error in destination function:", error);
//       cb(error);
//     }
//   },
//   filename: function (req, file, cb) {
//     try {
//       cb(null, Date.now() + path.extname(file.originalname));
//     } catch (error) {
//       console.error("Error in filename function:", error);
//       cb(error);
//     }
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     const file = req.file;
//     console.log("file path", file.filename);
//     res.status(200).json(file.filename);
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ message: "Error uploading file" });
//   }
// });

// app.use("/api/stories", (req, res, next) => {
//   try {
//     storiyRoutes(req, res, next);
//   } catch (error) {
//     console.error("Error in /api/stories route:", error);
//     res.status(500).json({ message: "Error in /api/stories route" });
//   }
// });

// app.use("/api/auth", (req, res, next) => {
//   try {
//     authRoutes(req, res, next);
//   } catch (error) {
//     console.error("Error in /api/auth route:", error);
//     res.status(500).json({ message: "Error in /api/auth route" });
//   }
// });

// app.use("/api/users", (req, res, next) => {
//   try {
//     userRoutes(req, res, next);
//   } catch (error) {
//     console.error("Error in /api/users route:", error);
//     res.status(500).json({ message: "Error in /api/users route" });
//   }
// });

// app.use("/api/posts", (req, res, next) => {
//   try {
//     postRoutes(req, res, next);
//   } catch (error) {
//     console.error("Error in /api/posts route:", error);
//     res.status(500).json({ message: "Error in /api/posts route" });
//   }
// });

// app.use("/api/comments", (req, res, next) => {
//   try {
//     commentRoutes(req, res, next);
//   } catch (error) {
//     console.error("Error in /api/comments route:", error);
//     res.status(500).json({ message: "Error in /api/comments route" });
//   }
// });

// app.use("/api/likes", (req, res, next) => {
//   try {
//     likeRoutes(req, res, next);
//   } catch (error) {
//     console.error("Error in /api/likes route:", error);
//     res.status(500).json({ message: "Error in /api/likes route" });
//   }
// });

// app.use("/api/relationships", (req, res, next) => {
//   try {
//     relationshipRoutes(req, res, next);
//   } catch (error) {
//     console.error("Error in /api/relationships route:", error);
//     res.status(500).json({ message: "Error in /api/relationships route" });
//   }
// });

// const PORT = process.env.PORT || 8800;
// app.listen(PORT, () => {
//   console.log(`API running on port ${PORT}`);
// });
