const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const params = new URLSearchParams(location.search);
const dict = {
  it: {
    title: "Kallebe Gallo — AI Full Stack Engineer",
    description: "Kallebe Gallo, AI Full Stack Engineer e co-founder di CTRL Agency. Agenda Easy, CRM Gallo e sistemi web in produzione.",
    "nav.who": "Chi sono",
    "nav.work": "Progetti",
    "nav.stack": "Stack",
    "nav.exp": "Esperienza",
    "nav.contact": "Contatti",
    "nav.cta": "Parliamone",
    "nav.menu": "Menu",
    "hero.l1": "Dal codice",
    "hero.l2": "al prodotto.",
    "hero.studio": "Co-founder di CTRL Agency",
    "hero.rest": "Sistemi web e AI, in produzione.",
    "hero.cta": "Vedi i progetti",
    "hero.dock": "Kallebe Gallo",
    "hero.alt": "Kallebe Gallo, ritratto in studio",
    "who.kicker": "Chi sono",
    "who.h1": "Un referente.",
    "who.h2": "L'intero stack.",
    "who.tabs": "Percorso",
    "who.b1": "Co-founder di CTRL Agency.",
    "who.b2": "Dalla specifica alla produzione, senza passaggi di mano.",
    "who.b3": "Italiano, inglese, francese, tedesco, portoghese.",
    "who.alt": "Kallebe Gallo",
    "metrics.title": "In cifre",
    "metrics.m1": "prodotti in produzione",
    "metrics.m2": "lingue nel CRM",
    "metrics.m3": "lingue di lavoro",
    "stack.kicker": "Stack",
    "stack.h1": "Quattro strati.",
    "stack.h2": "Un solo flusso.",
    "stack.tabs": "Architettura",
    "stack.l1": "Frontend",
    "stack.l2": "API",
    "stack.l3": "Dati",
    "stack.l4": "Cloud",
    "stack.d1": "TypeScript, React, Next.js. Interfacce, accessibilità, Core Web Vitals.",
    "stack.d2": "FastAPI e Node.js. Contratti espliciti, autenticazione, integrazioni.",
    "stack.d3": "PostgreSQL, Supabase, row-level security. I dati di ogni tenant restano isolati.",
    "stack.d4": "Vercel, Railway, Docker. Preview, produzione, una via per il rollback.",
    "work.kicker": "Progetti",
    "work.h1": "Due prodotti.",
    "work.h2": "Poi i sistemi intorno.",
    "agenda.k": "01 — Prodotto",
    "agenda.role": "Full stack, end to end",
    "agenda.p": "Le prenotazioni di attività e professionisti si perdono tra messaggi e calendari scollegati.",
    "agenda.s": "SaaS di prenotazione online su Next.js 16, Supabase e Stripe, con interfaccia italiana e inglese.",
    "agenda.r": "Online su agendaeasy.it: pagamenti e agenda nello stesso flusso.",
    "crm.k": "02 — Piattaforma",
    "crm.role": "Architettura multi-tenant, full stack",
    "crm.p": "Un CRM unico non regge più clienti se dati e fatturazione non sono isolati.",
    "crm.s": "FastAPI, Next.js, row-level security su PostgreSQL e Stripe. Interfaccia in sette lingue.",
    "crm.r": "In produzione: tenant, billing e accessi separati.",
    "ps.p": "Problema",
    "ps.s": "Soluzione",
    "ps.r": "Risultato",
    "links.live": "Live",
    "more.k": "Altri sistemi",
    "inbox.role": "Automazione AI",
    "inbox.p": "Il back office B2B perde segnali commerciali dentro la posta.",
    "inbox.s": "Classifica i messaggi, prepara bozze di risposta e fa emergere le opportunità.",
    "alivio.role": "EdTech AI",
    "alivio.p": "Correggere a mano non scala quando le classi crescono.",
    "alivio.s": "SaaS di correzione con un layer LLM indipendente dal provider, su Next.js e Supabase.",
    "farma.role": "Chatbot AI",
    "farma.p": "In farmacia le stesse domande su prodotti e sedi interrompono il banco.",
    "farma.s": "Assistente con backend Python e interfaccia chat per risposte rapide.",
    "exp.kicker": "Esperienza",
    "exp.h1": "Dove sta il lavoro.",
    "exp.now": "Oggi",
    "exp.r1": "Co-founder",
    "exp.r1d": "Kallebe è co-founder di CTRL Agency: backend, architettura e i sistemi che lo studio manda in produzione.",
    "exp.prod": "In produzione",
    "exp.r2": "Prodotti propri",
    "exp.r2r": "Progetto e sviluppo",
    "exp.r2d": "Agenda Easy, CRM Gallo, Inbox AI e gli altri sistemi in questa pagina.",
    "talk.kicker": "Contatto",
    "talk.h1": "Parliamone.",
    "talk.lead": "Un ruolo, un prodotto, una collaborazione. Si parte dal concreto.",
    "play.hint": "Trascina le forme",
    "footer.copy": "© 2026 Kallebe Gallo",
    "chip.quote": "Preventivo",
    "chip.work": "Progetti",
    "chip.contact": "Contatti",
    "msg.quote": "Ciao Kallebe, vorrei un preventivo.",
    "msg.work": "Ciao Kallebe, vorrei parlarti di un progetto.",
    "msg.contact": "Ciao Kallebe, come posso contattarti?",
    "msg.default": "Ciao Kallebe, vorrei parlarti.",
    "chat.greet": "Ciao, sono Kallebe. Dimmi se ti serve un preventivo, un progetto o un contatto.",
    "chat.sent": "Ti apro WhatsApp con questo messaggio.",
    "chat.placeholder": "Scrivi un messaggio",
    "chat.send": "Invia",
    "chat.field": "Messaggio",
    "chat.open": "Apri la chat di supporto",
    "chat.close": "Chiudi la chat",
    "chat.status": "Online",
    "chat.chips": "Risposte rapide"
  },
  en: {
    title: "Kallebe Gallo — AI Full Stack Engineer",
    description: "Kallebe Gallo, AI Full Stack Engineer and co-founder of CTRL Agency. Agenda Easy, CRM Gallo, and web systems in production.",
    "nav.who": "About",
    "nav.work": "Work",
    "nav.stack": "Stack",
    "nav.exp": "Experience",
    "nav.contact": "Contact",
    "nav.cta": "Let's talk",
    "nav.menu": "Menu",
    "hero.l1": "From code",
    "hero.l2": "to product.",
    "hero.studio": "Co-founder of CTRL Agency",
    "hero.rest": "Web and AI systems, in production.",
    "hero.cta": "See the work",
    "hero.dock": "Kallebe Gallo",
    "hero.alt": "Kallebe Gallo, studio portrait",
    "who.kicker": "About",
    "who.h1": "One engineer.",
    "who.h2": "The whole stack.",
    "who.tabs": "Story",
    "who.b1": "Co-founder of CTRL Agency.",
    "who.b2": "From the spec to production, without handoffs.",
    "who.b3": "Italian, English, French, German, Portuguese.",
    "who.alt": "Kallebe Gallo",
    "metrics.title": "In numbers",
    "metrics.m1": "products in production",
    "metrics.m2": "languages in the CRM",
    "metrics.m3": "working languages",
    "stack.kicker": "Stack",
    "stack.h1": "Four layers.",
    "stack.h2": "One flow.",
    "stack.tabs": "Architecture",
    "stack.l1": "Frontend",
    "stack.l2": "API",
    "stack.l3": "Data",
    "stack.l4": "Cloud",
    "stack.d1": "TypeScript, React, Next.js. Interfaces, accessibility, Core Web Vitals.",
    "stack.d2": "FastAPI and Node.js. Explicit contracts, authentication, integrations.",
    "stack.d3": "PostgreSQL, Supabase, row-level security. Each tenant's data stays isolated.",
    "stack.d4": "Vercel, Railway, Docker. Previews, production, a path to roll back.",
    "work.kicker": "Work",
    "work.h1": "Two products.",
    "work.h2": "Then the systems around them.",
    "agenda.k": "01 — Product",
    "agenda.role": "Full stack, end to end",
    "agenda.p": "Bookings for shops and independents get lost between messages and disconnected calendars.",
    "agenda.s": "An online booking SaaS on Next.js 16, Supabase and Stripe, with an Italian and English interface.",
    "agenda.r": "Live at agendaeasy.it, with payments and the calendar in the same flow.",
    "crm.k": "02 — Platform",
    "crm.role": "Multi-tenant architecture, full stack",
    "crm.p": "One CRM cannot serve many customers unless data and billing are isolated.",
    "crm.s": "FastAPI, Next.js, PostgreSQL row-level security and Stripe. The interface ships in seven languages.",
    "crm.r": "In production, with separate tenants, billing and access.",
    "ps.p": "Problem",
    "ps.s": "Solution",
    "ps.r": "Result",
    "links.live": "Live",
    "more.k": "Other systems",
    "inbox.role": "AI automation",
    "inbox.p": "B2B back offices lose commercial signals inside email.",
    "inbox.s": "It classifies messages, drafts replies and surfaces opportunities.",
    "alivio.role": "EdTech AI",
    "alivio.p": "Marking by hand does not scale as classes grow.",
    "alivio.s": "A grading SaaS with a provider-agnostic LLM layer, on Next.js and Supabase.",
    "farma.role": "AI chatbot",
    "farma.p": "In a pharmacy, the same questions about products and branches interrupt the counter.",
    "farma.s": "An assistant with a Python backend and a chat interface for fast answers.",
    "exp.kicker": "Experience",
    "exp.h1": "Where the work sits.",
    "exp.now": "Now",
    "exp.r1": "Co-founder",
    "exp.r1d": "Kallebe is co-founder of CTRL Agency: backend, architecture, and the systems the studio ships.",
    "exp.prod": "In production",
    "exp.r2": "Own products",
    "exp.r2r": "Design and engineering",
    "exp.r2d": "Agenda Easy, CRM Gallo, Inbox AI and the other systems on this page.",
    "talk.kicker": "Contact",
    "talk.h1": "Let's talk.",
    "talk.lead": "A role, a product, or a collaboration. We start from the concrete thing.",
    "play.hint": "Drag the shapes",
    "footer.copy": "© 2026 Kallebe Gallo",
    "chip.quote": "Quote",
    "chip.work": "Projects",
    "chip.contact": "Contact",
    "msg.quote": "Hi Kallebe, I'd like a quote.",
    "msg.work": "Hi Kallebe, I'd like to talk about a project.",
    "msg.contact": "Hi Kallebe, how can I reach you?",
    "msg.default": "Hi Kallebe, I'd like to talk.",
    "chat.greet": "Hi, I'm Kallebe. Tell me if you need a quote, a project, or a way to get in touch.",
    "chat.sent": "Opening WhatsApp with this message.",
    "chat.placeholder": "Write a message",
    "chat.send": "Send",
    "chat.field": "Message",
    "chat.open": "Open support chat",
    "chat.close": "Close support chat",
    "chat.status": "Online",
    "chat.chips": "Quick replies"
  }
};

const whoScript = {
  it: [
    "$ whoami\nKallebe Gallo\nco-founder · CTRL Agency",
    "$ scope --mine\nfrontend  api  data  cloud\none owner, from spec to deploy",
    "$ locale\nit  en  fr  de  pt"
  ],
  en: [
    "$ whoami\nKallebe Gallo\nco-founder · CTRL Agency",
    "$ scope --mine\nfrontend  api  data  cloud\none owner, from spec to deploy",
    "$ locale\nit  en  fr  de  pt"
  ]
};

const stackScript = {
  it: [
    "$ layer frontend\nNext.js · TypeScript · React\nUI, accessibilità, Core Web Vitals",
    "$ layer api\nFastAPI · Node.js\ncontratti chiari, errori espliciti",
    "$ layer data\nPostgreSQL · RLS · Supabase\ni tenant restano isolati",
    "$ layer cloud\nVercel · Railway · Docker\npreview, produzione, rollback"
  ],
  en: [
    "$ layer frontend\nNext.js · TypeScript · React\nUI, accessibility, Core Web Vitals",
    "$ layer api\nFastAPI · Node.js\nclear contracts, explicit errors",
    "$ layer data\nPostgreSQL · RLS · Supabase\ntenants stay isolated",
    "$ layer cloud\nVercel · Railway · Docker\npreview, production, rollback"
  ]
};

const saved = localStorage.getItem("siteLanguage");
let lang = saved === "en" ? "en" : "it";
const termState = new WeakMap();
let beat = 0;
let layer = 0;

function t(key) {
  return dict[lang][key] ?? dict.it[key] ?? "";
}

function applyLang() {
  document.documentElement.lang = lang;
  document.title = t("title");
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", t("description"));
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = t(el.dataset.i18n);
    if (value) el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    el.alt = t(el.dataset.i18nAlt);
  });
  document.querySelectorAll("[data-i18n-label]").forEach((el) => {
    const value = t(el.dataset.i18nLabel);
    if (value) el.setAttribute("aria-label", value);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-set-lang]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.setLang === lang ? "true" : "false");
  });
  const greet = document.getElementById("support-greet");
  if (greet && greet.dataset.shown === "1") greet.textContent = t("chat.greet");
  typeInto(document.getElementById("who-term"), whoScript[lang][beat], true);
  typeInto(document.getElementById("stack-term"), stackScript[lang][layer], true);
  const launcher = document.getElementById("eye-launcher");
  if (launcher) {
    const open = launcher.getAttribute("aria-expanded") === "true";
    launcher.setAttribute("aria-label", open ? t("chat.close") : t("chat.open"));
  }
}

document.querySelectorAll("[data-set-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    lang = button.dataset.setLang === "en" ? "en" : "it";
    localStorage.setItem("siteLanguage", lang);
    applyLang();
  });
});

function typeInto(el, text, immediate) {
  if (!el) return;
  const state = termState.get(el) || { token: 0 };
  state.token += 1;
  termState.set(el, state);
  const token = state.token;
  if (reduced || immediate || params.has("reveal")) {
    el.textContent = text;
    return;
  }
  el.textContent = "";
  let index = 0;
  const step = () => {
    if (token !== state.token) return;
    index += 1;
    el.textContent = text.slice(0, index);
    if (index < text.length) window.setTimeout(step, 14);
  };
  step();
}

function pinProgress(section) {
  const total = section.offsetHeight - window.innerHeight;
  if (total <= 40) return null;
  const passed = window.scrollY - section.offsetTop;
  return Math.min(1, Math.max(0, passed / total));
}

function setBeat(next, fromScroll) {
  next = Math.max(0, Math.min(2, next));
  if (fromScroll && next === beat) return;
  beat = next;
  document.querySelectorAll("[data-beat-btn]").forEach((button) => {
    const on = Number(button.dataset.beatBtn) === beat;
    button.setAttribute("aria-selected", on ? "true" : "false");
  });
  typeInto(document.getElementById("who-term"), whoScript[lang][beat], fromScroll && reduced);
  if (!fromScroll) {
    const section = document.getElementById("chi-sono");
    const total = section.offsetHeight - window.innerHeight;
    if (total > 40) {
      const y = section.offsetTop + total * (beat / 2.15);
      scrollToY(y);
    }
  }
}

function setLayer(next, fromScroll) {
  next = Math.max(0, Math.min(3, next));
  if (fromScroll && next === layer) return;
  layer = next;
  document.querySelectorAll("[data-layer-btn]").forEach((button) => {
    const on = Number(button.dataset.layerBtn) === layer;
    button.setAttribute("aria-selected", on ? "true" : "false");
  });
  const wide = window.innerWidth > 800;
  document.querySelectorAll(".layer-detail").forEach((panel, index) => {
    const on = index === layer;
    panel.classList.toggle("is-on", on);
    panel.hidden = wide ? !on : false;
  });
  const stage = document.querySelector('[data-scene="stack"]');
  if (stage) stage.dataset.layer = String(layer);
  typeInto(document.getElementById("stack-term"), stackScript[lang][layer], fromScroll && reduced);
  if (!fromScroll) {
    const section = document.getElementById("stack");
    const total = section.offsetHeight - window.innerHeight;
    if (total > 40) scrollToY(section.offsetTop + total * (layer / 3.2));
  }
}

function scrollToY(y) {
  if (window.__lenis) {
    window.__lenis.scrollTo(y, { immediate: reduced });
    return;
  }
  window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
}

document.querySelectorAll("[data-beat-btn]").forEach((button) => {
  button.addEventListener("click", () => setBeat(Number(button.dataset.beatBtn), false));
});

document.querySelectorAll("[data-layer-btn]").forEach((button) => {
  button.addEventListener("click", () => setLayer(Number(button.dataset.layerBtn), false));
});

function sectionProgress(section) {
  const rect = section.getBoundingClientRect();
  const vh = window.innerHeight;
  if (rect.bottom <= 0 || rect.top >= vh) return null;
  return Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh)));
}

function updatePins() {
  const who = document.getElementById("chi-sono");
  const stack = document.getElementById("stack");
  const whoP = pinProgress(who) ?? sectionProgress(who);
  const stackP = pinProgress(stack) ?? sectionProgress(stack);
  if (whoP != null) setBeat(Math.min(2, Math.floor(whoP * 2.999)), true);
  if (stackP != null) setLayer(Math.min(3, Math.floor(stackP * 3.999)), true);
  const nav = document.getElementById("nav");
  nav.classList.toggle("is-stuck", window.scrollY > 12);
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    updatePins();
  });
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".reveal, .display").forEach((el) => {
  const block = el.classList.contains("display") ? el.closest("section, article, header") || el : el;
  if (!block.classList.contains("reveal") && el.classList.contains("display")) el.classList.add("reveal");
});

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
requestAnimationFrame(() => {
  document.querySelector(".hero-card")?.classList.add("is-in");
  document.querySelector(".hero .display")?.classList.add("is-in");
});

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    countObserver.unobserve(el);
    if (reduced || params.has("reveal")) {
      el.textContent = String(target);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 900);
      const eased = 1 - (1 - p) ** 3;
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = "0";
    requestAnimationFrame(tick);
  });
}, { threshold: 0.6 });

document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

const nav = document.getElementById("nav");
const toggle = document.querySelector(".hn-toggle");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".hn-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    if (window.__lenis) window.__lenis.scrollTo(target, { offset: -8 });
    else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  });
});

const support = document.getElementById("support");
const panel = document.getElementById("support-panel");
const launcher = document.getElementById("eye-launcher");
const face = launcher.querySelector(".eye-face");
const pupils = launcher.querySelectorAll(".pupil");
const log = document.getElementById("support-log");
const form = document.getElementById("support-form");
const field = document.getElementById("support-text");
const dots = document.getElementById("support-dots");
const greet = document.getElementById("support-greet");
const pupil = { x: 0, y: 0, tx: 0, ty: 0 };
let eyeFrame = 0;
let chatOpen = false;

function movePupils() {
  pupil.x += (pupil.tx - pupil.x) * 0.18;
  pupil.y += (pupil.ty - pupil.y) * 0.18;
  const px = `${pupil.x.toFixed(2)}px`;
  const py = `${pupil.y.toFixed(2)}px`;
  pupils.forEach((node) => {
    node.style.setProperty("--px", px);
    node.style.setProperty("--py", py);
  });
  if (!reduced) eyeFrame = requestAnimationFrame(movePupils);
}

function look(clientX, clientY) {
  const rect = face.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = clientX - cx;
  const dy = clientY - cy;
  const angle = Math.atan2(dy, dx);
  const dist = Math.min(4.5, Math.hypot(dx, dy) / 70);
  pupil.tx = Math.cos(angle) * dist;
  pupil.ty = Math.sin(angle) * dist;
  const near = Math.hypot(dx, dy) < 140;
  launcher.classList.toggle("is-near", near);
}

window.addEventListener("pointermove", (event) => look(event.clientX, event.clientY), { passive: true });
if (!reduced) {
  movePupils();
  const blink = () => {
    face.classList.add("is-blink");
    window.setTimeout(() => face.classList.remove("is-blink"), 140);
    window.setTimeout(blink, 2800 + Math.random() * 2600);
  };
  window.setTimeout(blink, 1600);
}

function showGreeting() {
  dots.classList.add("is-done");
  greet.dataset.shown = "1";
  greet.textContent = t("chat.greet");
}

function focusables() {
  return [...panel.querySelectorAll("button, a, input")].filter((el) => !el.disabled && el.offsetParent !== null);
}

function openChat() {
  chatOpen = true;
  panel.hidden = false;
  requestAnimationFrame(() => support.classList.add("is-open"));
  launcher.setAttribute("aria-expanded", "true");
  launcher.setAttribute("aria-label", t("chat.close"));
  if (window.matchMedia("(max-width: 640px)").matches) document.body.classList.add("chat-lock");
  window.setTimeout(() => focusables()[0]?.focus(), reduced ? 0 : 180);
  if (greet.dataset.shown === "1") return;
  if (reduced || params.has("reveal")) showGreeting();
  else window.setTimeout(showGreeting, 700);
}

function closeChat() {
  chatOpen = false;
  support.classList.remove("is-open");
  launcher.setAttribute("aria-expanded", "false");
  launcher.setAttribute("aria-label", t("chat.open"));
  document.body.classList.remove("chat-lock");
  const hide = () => {
    if (!chatOpen) panel.hidden = true;
  };
  if (reduced) hide();
  else window.setTimeout(hide, 280);
  launcher.focus();
}

function addBubble(text, user) {
  const bubble = document.createElement("div");
  bubble.className = user ? "bubble user" : "bubble";
  const p = document.createElement("p");
  p.textContent = text;
  bubble.appendChild(p);
  log.appendChild(bubble);
  log.scrollTop = log.scrollHeight;
}

function sendToWhatsApp(text) {
  const message = text.trim() || t("msg.default");
  addBubble(message, true);
  addBubble(t("chat.sent"), false);
  const url = `https://wa.me/41782307853?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

launcher.addEventListener("click", () => {
  if (chatOpen) closeChat();
  else openChat();
});

panel.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", closeChat);
});

document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => sendToWhatsApp(t(chip.dataset.msgKey)));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendToWhatsApp(field.value);
  field.value = "";
});

panel.addEventListener("keydown", (event) => {
  if (event.key !== "Tab" || !chatOpen) return;
  const items = focusables();
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && chatOpen) closeChat();
  if (event.key === "Escape" && nav.classList.contains("is-open")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

function bootSmooth() {
  if (reduced || params.has("reveal")) return;
  const script = document.createElement("script");
  script.type = "module";
  script.textContent = `
    import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.1.20/dist/lenis.mjs";
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, syncTouch: true });
    window.__lenis = lenis;
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  `;
  document.body.appendChild(script);
}

function bootWorld() {
  if (reduced) return;
  const script = document.createElement("script");
  script.type = "module";
  script.src = "js/world.js";
  document.body.appendChild(script);
}

function bootPlay() {
  const field = document.getElementById("play-field");
  if (!field || reduced) return;
  const start = () => {
    if (window.Matter) return import("./play.js");
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js";
    script.onload = () => import("./play.js");
    document.body.appendChild(script);
  };
  const io = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    io.disconnect();
    start();
  }, { rootMargin: "300px 0px" });
  io.observe(field);
}

function bootWater() {
  const marquee = document.getElementById("play-marquee");
  const map = document.getElementById("play-water-map");
  if (!marquee || !map || reduced) return;
  let level = 0;
  let target = 0;
  let raf = 0;
  const step = () => {
    level += (target - level) * 0.08;
    map.setAttribute("scale", level.toFixed(2));
    if (Math.abs(target - level) > 0.1) raf = requestAnimationFrame(step);
    else {
      raf = 0;
      if (target === 0) marquee.classList.remove("is-wet");
    }
  };
  const go = (value) => {
    target = value;
    if (value) marquee.classList.add("is-wet");
    if (!raf) raf = requestAnimationFrame(step);
  };
  marquee.addEventListener("pointerenter", () => go(34));
  marquee.addEventListener("pointerleave", () => go(0));
}

function bootHurricane() {
  if (reduced) return;
  document.querySelectorAll(".metric-row li").forEach((li) => {
    const num = li.querySelector(".metric-num");
    if (!num) return;
    let angle = 0;
    let speed = 0;
    let hover = false;
    let raf = 0;
    const max = 26;
    const step = () => {
      if (hover) speed += (max - speed) * 0.06;
      else speed *= 0.93;
      angle += speed;
      let done = false;
      if (!hover && speed < 0.6) {
        const rest = Math.ceil(angle / 360) * 360;
        angle += (rest - angle) * 0.18;
        if (Math.abs(rest - angle) < 0.3) { angle = 0; speed = 0; done = true; }
      }
      const k = Math.min(1, speed / max);
      num.style.setProperty("--spin", angle.toFixed(2) + "deg");
      num.style.setProperty("--spin-scale", (1 + k * 0.12).toFixed(3));
      num.style.setProperty("--swirl", k.toFixed(3));
      li.classList.toggle("is-spinning", k > 0.15);
      raf = done ? 0 : requestAnimationFrame(step);
    };
    li.addEventListener("pointerenter", () => { hover = true; if (!raf) raf = requestAnimationFrame(step); });
    li.addEventListener("pointerleave", () => { hover = false; if (!raf) raf = requestAnimationFrame(step); });
  });
}

function bootClouds() {
  const shifts = [...document.querySelectorAll(".hero-cloud-shift")];
  if (!shifts.length || reduced) return;
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
  script.onload = () => {
    const gsap = window.gsap;
    if (!gsap) return;
    const drifts = [
      { x: 2.5, duration: 90 },
      { x: -2, duration: 110 },
      { x: -3, duration: 75 },
    ];
    const depth = [6, -5, -3];
    const pointer = { x: 0, y: 0 };
    const states = shifts.map(() => ({ drift: 0 }));
    shifts.forEach((shift, index) => {
      const spec = drifts[index] || drifts[0];
      gsap.to(states[index], {
        drift: spec.x,
        duration: spec.duration,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
    gsap.ticker.add(() => {
      shifts.forEach((shift, index) => {
        const amount = depth[index] || 0;
        gsap.set(shift, {
          xPercent: states[index].drift + pointer.x * amount,
          yPercent: pointer.y * amount * 0.45,
        });
      });
    });
    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    }, { passive: true });
  };
  document.body.appendChild(script);
}

applyLang();
updatePins();
bootSmooth();
bootClouds();
bootPlay();
bootWater();
bootHurricane();

if ("requestIdleCallback" in window) requestIdleCallback(bootWorld, { timeout: 900 });
else window.addEventListener("load", () => window.setTimeout(bootWorld, 250));

if (params.has("reveal")) document.documentElement.classList.add("is-ready");
if (params.get("chat") === "1") openChat();
const at = params.get("at");
if (at) {
  const go = () => {
    const target = document.getElementById(at);
    if (!target) return;
    const layerParam = params.get("layer");
    if (at === "stack" && layerParam != null) {
      const total = target.offsetHeight - window.innerHeight;
      const index = Number(layerParam);
      window.scrollTo(0, target.offsetTop + Math.max(0, total) * (index / 3.05));
    } else {
      target.scrollIntoView();
    }
    updatePins();
  };
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go);
}
