const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
