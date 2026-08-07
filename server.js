
import dotenv from "dotenv";
import app from "./app.js";
import dataBase from "./config/db.js";

dotenv.config({
  quiet: true
});

dataBase();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});


