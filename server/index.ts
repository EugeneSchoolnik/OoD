import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./src/routes/auth";
import customers from "./src/routes/customers";
import estateObjects from "./src/routes/estateObjects";
import customerRequests from "./src/routes/customerRequests";
import announcements from "./src/routes/announcements";

const PORT = Bun.env.PORT;
const app = express();

app
  // middlewares
  .use(cors({ credentials: true, origin: "http://localhost:5173" }))
  .use(express.json())
  .use(cookieParser())
  // routes
  .use("/auth", auth)
  .use("/customers", customers)
  .use("/estateObjects", estateObjects)
  .use("/customerRequests", customerRequests)
  .use("/announcements", announcements);

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
