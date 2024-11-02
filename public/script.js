let attempts = 0;

async function makeGuess() {
  const guessInput = document.getElementById("guessInput");
  const messageElement = document.getElementById("message");
  const attemptsElement = document.getElementById("attempts");

  const guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 100) {
    messageElement.textContent =
      "Por favor, ingresa un número válido entre 1 y 100";
    messageElement.className = "error";
    return;
  }

  try {
    const response = await fetch("/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess }),
    });

    const data = await response.json();
    attempts++;
    attemptsElement.textContent = `Intentos: ${attempts}`;

    messageElement.textContent = data.message;
    messageElement.className = data.status === "success" ? "success" : "";

    if (data.status === "success") {
      attempts = 0;
      attemptsElement.textContent = `Intentos: ${attempts}`;
      guessInput.value = "";
    }
  } catch (error) {
    messageElement.textContent = "Error al conectar con el servidor";
    messageElement.className = "error";
  }
}
