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
  await typeLine("Как решить загадку:");
  await typeLine("1. Мы зашифровали слово SOUND с помощью шифра Виженера.");
  await typeLine("2. Ключ для шифрования — слово WOLF.");
  await typeLine("3. Каждой букве присваивается номер в алфавите:");
  
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let numbered = alphabet.map((char, i) => `${i + 1}.${char}`);
  await typeLine(numbered.join(" "));

  await typeLine("4. Ключ WOLF → W=23, O=15, L=12, F=6");
  await typeLine("5. Слово SOUND → S=19, O=15, U=21, N=14, D=4");

  await typeLine("6. Шифруем посимвольно:");
  await typeLine("   S(19) + W(23) = 42 → 16 → P");
  await typeLine("   O(15) + O(15) = 30 → 4 → D");
  await typeLine("   U(21) + L(12) = 33 → 7 → G");
  await typeLine("   N(14) + F(6)  = 20 → 20 → T");
  await typeLine("→ Зашифрованное слово: PDGT");

  await typeLine("7. Теперь твоя задача — расшифровать PDGT, используя тот же ключ: WOLF.");
  await typeLine("8. Введи ответ ниже и нажми 'Проверить'.");
  await typeLine("Если хочешь узнать, как работает шифр Виженера — вот:");
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