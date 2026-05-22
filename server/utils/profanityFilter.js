const BAD_WORDS = [
  "хуй", "хуя", "хуе", "пизда", "пиздец", "пизды", "пидорасить", "пидор", "пидорас",
  "бля", "блять", "блядь", "ебать", "ебаный", "ебануть", "еблан", "сука", "сучка",
  "мудак", "мудила", "гандон", "гнида", "дрочить", "дрочер", "сперма", "член",
  "жопа", "жопка", "пердеть", "ссать", "срать", "залупа", "хуйло", "похуй",
  "нахуй", "схуяли", "отъебаться", "уебище", "ебало", "fuck", "shit", "bitch", "asshole",
  "damn", "crap", "bastard", "cunt", "dick", "cock", "pussy", "whore", "slut"
];

// Экранирование спецсимволов
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const words = BAD_WORDS.map(escapeRegex);
// Границы слова для Unicode (включая кириллицу)
const regex = new RegExp(`(?<!\\p{L})(${words.join('|')})(?!\\p{L})`, 'giu');

function filterProfanity(text) {
  if (!text) return text;
  return text.replace(regex, (match) => '*'.repeat(match.length));
}

module.exports = { filterProfanity };