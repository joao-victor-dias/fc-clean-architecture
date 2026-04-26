import { app } from "./express";
import dotenv from "dotenv";
import open from "open";

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);

  open(`http://localhost:${port}/docs`);
});