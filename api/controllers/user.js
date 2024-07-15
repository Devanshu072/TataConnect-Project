// import { db } from "../connect.js";
// import jwt from "jsonwebtoken";

// export const getUser = (req, res) => {
//   const userId = req.params.userId;
//   const q = "SELECT * FROM users WHERE id=?";

//   db.query(q, [userId], (err, data) => {
//     if (err) return res.status(500).json(err);
//     const { password, ...info } = data[0];
//     return res.json(info);
//   });
// };

// export const updateUser = (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("Not authenticated!");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const q =
//       "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

//     db.query(
//       q,
//       [
//         req.body.name,
//         req.body.city,
//         req.body.website,
//         req.body.coverPic,
//         req.body.profilePic,
//         userInfo.id,
//       ],
//       (err, data) => {
//         if (err) res.status(500).json(err);
//         if (data.affectedRows > 0) return res.json("Updated!");
//         return res.status(403).json("You can update only your post!");
//       }
//     );
//   });
// };
import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Existing function to get user details by userId
export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

// Existing function to update user details
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");
  console.log("data of user to be updates",req.body)
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? WHERE id=? ";

    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPic,
        req.body.profilePic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your profile!");
      }
    );
  });
};

// New function to search users by username
export const searchUsers = (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).json({ error: 'Query parameter q is required' });
  }
  
  const q = 'SELECT id, username, profilePic FROM users WHERE username LIKE ?';
  db.query(q, [`%${searchTerm}%`], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

