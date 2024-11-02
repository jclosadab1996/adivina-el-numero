const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

let secretNumber = Math.floor(Math.random() * 100) + 1;

app.post("/guess", (req, res) => {
  const guess = parseInt(req.body.guess);

  if (guess === secretNumber) {
    res.json({ message: "¡Correcto! ¡Has ganado!", status: "success" });
    secretNumber = Math.floor(Math.random() * 100) + 1;
  } else if (guess < secretNumber) {
    res.json({ message: "El número es mayor", status: "low" });
  } else {
    res.json({ message: "El número es menor", status: "high" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
