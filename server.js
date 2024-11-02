const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

let secretNumber = Math.floor(Math.random() * 100) + 1;
console.log(`El número secreto es ${secretNumber}`);

app.post("/guess", (req, res) => {
  const guess = parseInt(req.body.guess);

  if (guess === secretNumber) {
    res.json({ message: "¡Correcto! ¡Has ganado!", status: "success" });
    secretNumber = Math.floor(Math.random() * 100) + 1;
  } else if (guess < secretNumber) {
    res.json({ message: "El número es mayor" });
  } else {
    res.json({ message: "El número es menor" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
