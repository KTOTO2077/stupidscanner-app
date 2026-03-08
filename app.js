const scanBtn = document.getElementById("scanBtn");
const statusEl = document.getElementById("status");
const loader = document.getElementById("loader");
const resultEl = document.getElementById("result");

const statuses = [
  "Захват биосигнатуры...",
  "Анализ нейронного шума...",
  "Поиск разумной жизни...",
  "Квантовая проверка когнитивного поля..."
];

if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
  
function getVerdict(value) {
  if (value <= 20) {
    return "Подозрительно умный объект";
  } else if (value <= 50) {
    return "Базовый землянин";
  } else if (value <= 80) {
    return "Повышенный когнитивный шум";
  }
  return "Критический уровень тупости";
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ru-RU";
  utterance.rate = 0.9;
  utterance.pitch = 0.6;
  utterance.volume = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

scanBtn.addEventListener("click", () => {
  resultEl.innerHTML = "";
  loader.classList.remove("hidden");
  scanBtn.disabled = true;

  let step = 0;
  statusEl.textContent = statuses[step];

  const interval = setInterval(() => {
    step = (step + 1) % statuses.length;
    statusEl.textContent = statuses[step];
  }, 700);

  setTimeout(() => {
    clearInterval(interval);

    const value = Math.floor(Math.random() * 101);
    const verdict = getVerdict(value);

    loader.classList.add("hidden");
    statusEl.textContent = "Сканирование завершено";
    resultEl.innerHTML = `Уровень тупости: <b>${value}%</b><br>${verdict}`;

    speak(`Сканирование завершено. Уровень тупости ${value} процентов. ${verdict}.`);

    scanBtn.disabled = false;
  }, 3000);
});