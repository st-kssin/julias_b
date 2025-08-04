const terminal = document.getElementById("terminal");

const introLines = [
  "Привет, Юлия.",
  "Это не просто страница.",
  "Это загадка, созданная специально для тебя.",
  "Каждая строка — как шаг к разгадке.",
  "Готова начать?"
];

function typeLine(text, delay = 30) {
  return new Promise(resolve => {
    const line = document.createElement("div");
    line.className = "line visible";
    terminal.appendChild(line);

    let i = 0;
    const interval = setInterval(() => {
      line.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, delay);
  });
}

(async function showIntro() {
  for (let i = 0; i < introLines.length; i++) {
    await typeLine(introLines[i]);
    await new Promise(r => setTimeout(r, 1000));
  }
  showButtons();
})();

function showButtons() {
  const btnYes = document.createElement("button");
  const btnNo = document.createElement("button");

  btnYes.textContent = "Да";
  btnNo.textContent = "Нет";

  [btnYes, btnNo].forEach(btn => terminal.appendChild(btn));

  btnNo.onclick = () => {
    typeLine("Тогда касасинчек будет кайфовать вместо тебя.");
    btnYes.remove();
    btnNo.remove();
  };

  btnYes.onclick = () => {
    btnYes.remove();
    btnNo.remove();
    showInstructions();
    showRiddle();
  };
}

function showInstructions() {
  const block = document.createElement("div");
  block.className = "instructions";
  block.innerHTML = `
    <strong>Как решить загадку:</strong><br><br>
    1. Посмотри на последовательность цифр — это позиции букв в слове SOUND.<br>
    2. Используй алфавит ниже, чтобы сопоставить цифры с буквами.<br>
    3. Получи ключ и попробуй расшифровать слово.<br>
    4. Введи ответ в поле ниже и нажми "Проверить".<br><br>
    <em>Если хочешь узнать, как работает шифр Виженера — вот <a href="https://ru.wikipedia.org/wiki/Шифр_Виженера" target="_blank">объяснение</a>.</em>
  `;
  terminal.appendChild(block);
}

function showRiddle() {
  const keySequence = [18, 14, 20, 13, 3]; // S O U N D
  const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

  typeLine("Ключ к шифру: SOUND → " + keySequence.join(", "));
  setTimeout(() => {
    const alphaLine = document.createElement("div");
    alphaLine.className = "line visible";
    alphaLine.id = "alphabet";
    alphaLine.textContent = alphabet.join(" ");
    terminal.appendChild(alphaLine);
  }, 2000);

  setTimeout(() => {
    const input = document.createElement("input");
    input.placeholder = "Введите ответ";
    const checkBtn = document.createElement("button");
    checkBtn.textContent = "Проверить";
    terminal.appendChild(input);
    terminal.appendChild(checkBtn);

    checkBtn.onclick = () => {
      const answer = input.value.trim().toUpperCase();
      if (answer === "JULIA") {
        showFireworks();
      } else {
        makeLettersFall();
      }
      input.remove();
      checkBtn.remove();
    };
  }, 4000);
}

function makeLettersFall() {
  const alpha = document.getElementById("alphabet");
  if (!alpha) return;

  const chars = alpha.textContent.split(" ");
  alpha.remove();

  chars.forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    span.className = "falling";
    span.style.left = `${Math.random() * window.innerWidth}px`;
    span.style.top = `${Math.random() * 100 + 100}px`;
    terminal.appendChild(span);

    setTimeout(() => {
      span.style.transform = `translateY(${Math.random() * 500 + 200}px) rotate(${Math.random() * 360}deg)`;
      span.style.opacity = "0";
    }, 100);
  });

  typeLine("Ответ неверный. Буквы рассыпались...");
}

function showFireworks() {
  const fireworks = ["🎆", "🎇", "✨", "🎉", "🌟"];
  fireworks.forEach((fw, i) => {
    setTimeout(() => {
      const fx = document.createElement("div");
      fx.className = "firework";
      fx.textContent = fw;
      terminal.appendChild(fx);
    }, i * 500);
  });
  typeLine("Поздравляю! Ты разгадала загадку.");
}