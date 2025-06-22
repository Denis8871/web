class LocaleData {
  constructor() {
    this.days = {
      ua: ["Понеділок", "Вівторок", "Середа", "Четвер", "П’ятниця", "Субота", "Неділя"],
      en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    };
  }

  getDay(lang, dayNumber) {
    return this.days[lang][dayNumber - 1];
  }
}

function askLanguageAndDay() {
  const localeData = new LocaleData();
  let lang;

  while (true) {
    lang = prompt('Виберіть мову "ua" або "en"');
    if (!lang) return;
    lang = lang.toLowerCase();
    if (lang === 'ua' || lang === 'en') break;
    alert("Неправильний ввід");
  }

  let day;
  while (true) {
    const question = lang === 'ua'
      ? "Введіть номер дня неділі від 1 до 7"
      : "Enter the day number of the week from 1 to 7";
    const input = prompt(question);
    if (!input) return;
    day = parseInt(input);
    if (day >= 1 && day <= 7) break;
    alert(lang === 'ua' ? "Неправильний ввід" : "Invalid input.");
  }

  alert(localeData.getDay(lang, day));
}
