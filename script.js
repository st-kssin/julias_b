const terminal = document.getElementById("terminal");

const introLines = [
  "Привет, Юличка-красотулечка.",
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

async function showInstructions() {
  await typeLine("🧩 Загадка: «Голос за шифром»");
  await typeLine("Ты нашёл зашифрованное слово: CSSXH");
  await typeLine("Ключ, с помощью которого оно было получено: KEYKE");
  await typeLine("Каждая буква исходного слова была сдвинута по алфавиту на значение соответствующей буквы ключа.");

  await typeLine("🔠 Алфавит с номерами:");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let numbered = alphabet.map((char, i) => `${char}=${i}`);
  await typeLine(numbered.join(" "));

  await typeLine("🔑 Ключ KEYKE → K=10, E=4, Y=24, K=10, E=4");
  await typeLine("📝 Зашифрованное слово CSSXH → C=2, S=18, S=18, X=23, H=7");

  await typeLine("📐 Расшифровка по формуле:");
  await typeLine("Исходная = (Зашифрованная - Ключ + 26) mod 26");

  await typeLine("   C(2)  - K(10) = -8 → 18 → S");
  await typeLine("   S(18) - E(4)  = 14 → 14 → O");
  await typeLine("   S(18) - Y(24) = -6 → 20 → U");
  await typeLine("   X(23) - K(10) = 13 → 13 → N");
  await typeLine("   H(7)  - E(4)  = 3  → 3  → D");

  await typeLine("🔓 Расшифрованное слово: SOUND");

  await typeLine("Теперь твоя задача — пройти следующий уровень, используя этот принцип.");
  await typeLine("Если хочешь узнать больше о шифре Виженера — вот:");
  await typeLine("https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher");
}

function showRiddle() {
  setTimeout(() => {
    const input = document.createElement("input");
    input.placeholder = "Введите ответ";
    const checkBtn = document.createElement("button");
    checkBtn.textContent = "Проверить";
    const hintBtn = document.createElement("button");
    hintBtn.textContent = "Показать подсказку";

    terminal.appendChild(input);
    terminal.appendChild(checkBtn);
    terminal.appendChild(hintBtn);

    checkBtn.onclick = () => {
      const answer = input.value.trim().toUpperCase();
      if (answer === "SOUND") {
        showFireworks();
      } else {
        makeLettersFall("PDGT");
      }
      input.remove();
      checkBtn.remove();
      hintBtn.remove();
    };

    hintBtn.onclick = () => {
      typeLine("🔍 Подсказка: если ты знаешь, как воет волк, ты знаешь, как звучит ключ.");
      hintBtn.disabled = true;
    };
  }, 1000);
}

function makeLettersFall(word) {
  const chars = word.split("");
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