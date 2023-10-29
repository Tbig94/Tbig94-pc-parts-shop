import dotenv from "dotenv";
import app from "./app";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../src/config.env") });

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
