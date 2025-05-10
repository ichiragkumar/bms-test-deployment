import express from "express";
const app = express();
import {client }from "@repo/db/client";
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    const updatedAt = new Date();
    const passwordHash = password;

   console.log(
     "Username: ",
     username,
     "Password: ",
     password,
     "Email: ",
     email,
     "Name: ",
     name,
     "UpdatedAt: ",
     updatedAt,
     "PasswordHash: ",
     passwordHash
   );

   const user = await client.user.create({
     data: {
       username,
       password,
       email,
       name,
       updatedAt,
       passwordHash,
     },
   });

   res.status(201).json({
     message: "User created successfully",
     data: user
   });

})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});     