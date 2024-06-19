// import express from "express";
// import { getUser , updateUser} from "../controllers/user.js";

// const router = express.Router()

// router.get("/test", (req, res)=>{
//     res.send("it works.!")
// })

// router.get("/find/:userId", getUser)
// router.put("/", updateUser)


// export default router

import express from "express";
import { getUser, updateUser, searchUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send("it works.!");
});

router.get("/find/:userId", getUser);
router.put("/", updateUser);

// Add the new search route
router.get("/search", searchUsers);

export default router;
