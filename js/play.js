// Physics playground before the contact section: shapes drop onto the
// marquee rule and can be dragged and thrown. Needs window.Matter.
const { Engine, Bodies, Body, Composite, Constraint, Sleeping } = window.Matter;

const field = document.getElementById("play-field");
const toys = [...field.querySelectorAll(".toy")];
const engine = Engine.create({ enableSleeping: true });
engine.gravity.y = 1.1;

const HALF_SHIFT = 0.5 - 4 / (3 * Math.PI); // semicircle: box centre vs centroid
let walls = [];
let items = [];
let width = 0;
let height = 0;
let running = false;
let last = 0;
let drag = null;
let timers = [];

function wallSet() {
  const t = 200;
  const opts = { isStatic: true, friction: 0.6, restitution: 0.2 };
  return [
    Bodies.rectangle(width / 2, height + t / 2, width + t * 2, t, opts),
    Bodies.rectangle(-t / 2, height / 2 - 800, t, height + 1800, opts),
    Bodies.rectangle(width + t / 2, height / 2 - 800, t, height + 1800, opts),
    Bodies.rectangle(width / 2, -1600 - t / 2, width + t * 2, t, opts)
  ];
}

function bodyFor(el, x, y) {
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  const opts = { restitution: 0.35, friction: 0.35, frictionAir: 0.012, density: 0.0018 };
  switch (el.dataset.shape) {
    case "circle":
      return Bodies.circle(x, y, w / 2, opts);
    case "pill":
      return Bodies.rectangle(x, y, w, h, { ...opts, chamfer: { radius: h / 2 - 0.5 } });
    case "half": {
      const r = w / 2;
      const pts = [];
      for (let i = 0; i <= 16; i += 1) {
        const a = Math.PI + (Math.PI * i) / 16;
        pts.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
      }
      return Bodies.fromVertices(x, y, [pts], opts);
    }
    case "plus": {
      const bar = w * 0.3;
      return Body.create({
        ...opts,
        parts: [
          Bodies.rectangle(x, y, w, bar),
          Bodies.rectangle(x, y, bar, h)
        ]
      });
    }
    default:
      return Bodies.rectangle(x, y, w, h, { ...opts, chamfer: { radius: 3 } });
  }
}

function build() {
  timers.forEach((id) => window.clearTimeout(id));
  timers = [];
  drag = null;
  Composite.clear(engine.world, false);
  width = field.clientWidth;
  height = field.clientHeight;
  walls = wallSet();
  Composite.add(engine.world, walls);
  items = toys.map((el, index) => {
    const x = width * (0.12 + Math.random() * 0.76);
    const y = -90 - (index % 3) * 80;
    const body = bodyFor(el, x, y);
    Body.setAngle(body, (Math.random() - 0.5) * 1.2);
    el.classList.add("is-live");
    return { el, body, delay: index * 220 };
  });
  items.forEach((item) => {
    timers.push(window.setTimeout(() => Composite.add(engine.world, item.body), item.delay));
  });
}

function render() {
  for (const { el, body } of items) {
    const { x, y } = body.position;
    const a = body.angle;
    let cx = x;
    let cy = y;
    if (el.dataset.shape === "half") {
      const off = -el.offsetHeight * HALF_SHIFT;
      cx += -Math.sin(a) * off;
      cy += Math.cos(a) * off;
    }
    el.style.transform = `translate(${cx - el.offsetWidth / 2}px, ${cy - el.offsetHeight / 2}px) rotate(${a}rad)`;
  }
}

function tick(time) {
  if (!running) return;
  const dt = Math.min(time - last || 16.6, 33);
  last = time;
  Engine.update(engine, dt);
  render();
  requestAnimationFrame(tick);
}

function local(event) {
  const rect = field.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

field.addEventListener("pointerdown", (event) => {
  const item = items.find((entry) => entry.el === event.target.closest(".toy"));
  if (!item) return;
  event.preventDefault();
  const p = local(event);
  const { body } = item;
  Sleeping.set(body, false);
  const dx = p.x - body.position.x;
  const dy = p.y - body.position.y;
  const cos = Math.cos(-body.angle);
  const sin = Math.sin(-body.angle);
  drag = {
    item,
    pointerId: event.pointerId,
    constraint: Constraint.create({
      pointA: p,
      bodyB: body,
      pointB: { x: dx * cos - dy * sin, y: dx * sin + dy * cos },
      stiffness: 0.18,
      damping: 0.08,
      length: 0
    })
  };
  Composite.add(engine.world, drag.constraint);
  item.el.setPointerCapture(event.pointerId);
  item.el.classList.add("is-grabbed");
});

field.addEventListener("pointermove", (event) => {
  if (!drag || event.pointerId !== drag.pointerId) return;
  drag.constraint.pointA = local(event);
});

function release(event) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  Composite.remove(engine.world, drag.constraint);
  drag.item.el.classList.remove("is-grabbed");
  drag = null;
}

field.addEventListener("pointerup", release);
field.addEventListener("pointercancel", release);

let resizeTimer = 0;
let lastWidth = field.clientWidth;
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    if (Math.abs(field.clientWidth - lastWidth) < 40 && Math.abs(field.clientHeight - height) < 40) return;
    lastWidth = field.clientWidth;
    build();
  }, 220);
});

new IntersectionObserver((entries) => {
  const visible = entries.some((entry) => entry.isIntersecting);
  if (visible && !running) {
    running = true;
    last = performance.now();
    requestAnimationFrame(tick);
  } else if (!visible) {
    running = false;
  }
}).observe(field);

build();
render();
