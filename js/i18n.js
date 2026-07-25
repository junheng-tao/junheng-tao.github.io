const translations = {
  en: {
    htmlLang: "en",
    title: "Junheng Tao",
    description: "Junheng Tao — Economics researcher and Ph.D. student.",
    name: "Junheng Tao",
    tagline: "Economics · Applied Micro · Econometrics",
    bio: "I am a graduate student in economics at HKUST, working at the intersection of applied microeconomics and econometrics. My current research focuses on international trade and environmental economics, and I am increasingly interested in incorporating machine learning methods into rigorous, data-driven economic analysis.",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    linksAria: "Social profiles",
    langAria: "Language",
    footerName: "Junheng Tao",
  },
  zh: {
    htmlLang: "zh-CN",
    title: "陶骏恒",
    description: "陶骏恒 — 经济学研究者，博士研究生。",
    name: "陶骏恒",
    tagline: "经济学 · 应用微观 · 计量经济学",
    bio: "我是香港科技大学经济学研究生，研究方向处于应用微观经济学与计量经济学的交叉领域。目前研究国际贸易与环境经济学相关话题，并关注如何将机器学习方法引入严谨、数据驱动的经济分析。",
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "邮箱",
    linksAria: "社交链接",
    langAria: "语言",
    footerName: "陶骏恒",
  },
};

const STORAGE_KEY = "site-lang";

function getPreferredLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "zh") return saved;
  const browser = (navigator.language || "").toLowerCase();
  return browser.startsWith("zh") ? "zh" : "en";
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  document.documentElement.lang = t.htmlLang;
  document.title = t.title;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t.description);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && t[key] != null) el.textContent = t[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (key && t[key] != null) el.setAttribute("aria-label", t[key]);
  });

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const active = btn.getAttribute("data-lang") === lang;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  localStorage.setItem(STORAGE_KEY, lang);
}

function initI18n() {
  const langSwitch = document.querySelector(".lang-switch");
  if (langSwitch) {
    langSwitch.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-lang]");
      if (!btn) return;
      applyLanguage(btn.getAttribute("data-lang"));
    });
  }

  applyLanguage(getPreferredLanguage());
}

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  initI18n();
});
