const express = require("express");
const app = express();
const Processor = require("./processor");

Processor.init();

const PORT = 80;

app.use(express.json());

app.put("/data", Processor.create);
app.get("/data", Processor.get);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));