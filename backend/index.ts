import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api", (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.json({ message: "I have CORS enabled" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
