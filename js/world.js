import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

const mobile = window.matchMedia("(max-width: 800px)").matches;
const maxSlots = mobile ? 1 : 2;
const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
const slots = new Map();
const pending = new Set();
const dprCap = Math.min(window.devicePixelRatio || 1, mobile ? 1.15 : 1.5);
const accent = 0xff4a1c;
const ink = 0x242424;
const paper = 0xf2f0ea;

window.addEventListener("pointermove", (event) => {
  pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
}, { passive: true });

function material(color, extra) {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: 0.42,
    roughness: 0.4,
    ...extra
  });
}

function lights(scene) {
  scene.add(new THREE.AmbientLight(0xb7b1a8, 0.7));
  const key = new THREE.DirectionalLight(0xfff4ec, 2.4);
  key.position.set(3, 4, 5);
  scene.add(key);
}

function hero(scene) {
  const group = new THREE.Group();
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.85, 0.015, 8, mobile ? 48 : 90),
    material(accent)
  );
  ring.rotation.x = 1.15;
  const ringB = new THREE.Mesh(
    new THREE.TorusGeometry(2.35, 0.01, 8, mobile ? 40 : 80),
    material(paper, { transparent: true, opacity: 0.35 })
  );
  ringB.rotation.x = 0.55;
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.62, 0),
    material(accent, { wireframe: true })
  );
  group.add(ring, ringB, core);
  scene.add(group);
  let spin = 0;
  return {
    update(dt, p) {
      spin += dt * 0.18;
      group.rotation.y = spin + p.x * 0.45;
      group.rotation.x = p.y * 0.3;
      ring.rotation.z += dt * 0.28;
      core.rotation.y -= dt * 0.45;
    }
  };
}

function who(scene) {
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.95, 0.18, mobile ? 50 : 110, 12),
    material(accent, { wireframe: true })
  );
  scene.add(knot);
  return {
    update(dt, p) {
      knot.rotation.y += dt * 0.25;
      knot.rotation.x = 0.4 + p.y * 0.3;
    }
  };
}

function stack(scene) {
  const group = new THREE.Group();
  const boxes = [];
  const onColor = new THREE.Color(accent);
  const offColor = new THREE.Color(0x303030);
  for (let index = 0; index < 4; index += 1) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.38, 0.95), material(ink));
    box.position.y = (1.5 - index) * 0.72;
    group.add(box);
    boxes.push(box);
  }
  scene.add(group);
  return {
    update(dt, p, host) {
      const active = Number(host.dataset.layer || 0);
      group.rotation.y = 0.45 + p.x * 0.35;
      group.rotation.x = 0.25 + p.y * 0.12;
      boxes.forEach((box, index) => {
        const on = index === active;
        box.material.color.lerp(on ? onColor : offColor, 0.14);
        const target = on ? 0.55 : 0;
        box.position.z += (target - box.position.z) * 0.12;
      });
    }
  };
}

function agenda(scene) {
  const group = new THREE.Group();
  const boxes = [ink, accent, ink].map((color, index) => {
    const box = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.26, 1.45), material(color));
    box.position.y = (1 - index) * 0.5;
    group.add(box);
    return box;
  });
  scene.add(group);
  return {
    update(dt, p) {
      const time = performance.now() / 1000;
      group.rotation.y = 0.5 + p.x * 0.45;
      group.rotation.x = 0.55 + p.y * 0.15;
      boxes.forEach((box, index) => {
        box.position.y = (1 - index) * 0.52 + Math.sin(time + index) * 0.04;
      });
    }
  };
}

function crm(scene) {
  const group = new THREE.Group();
  const core = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 16), material(accent));
  group.add(core);
  const count = mobile ? 5 : 7;
  const nodes = [];
  for (let index = 0; index < count; index += 1) {
    const node = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 8), material(paper));
    node.userData.angle = (index / count) * Math.PI * 2;
    group.add(node);
    nodes.push(node);
  }
  const positions = new Float32Array(count * 2 * 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const lines = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.75 }));
  group.add(lines);
  scene.add(group);
  return {
    update(dt, p) {
      group.rotation.y = p.x * 0.3;
      group.rotation.x = p.y * 0.2;
      const time = performance.now() / 1000;
      nodes.forEach((node, index) => {
        const angle = node.userData.angle + time * 0.35;
        const radius = 1.35 + (index % 2) * 0.25;
        node.position.set(Math.cos(angle) * radius, Math.sin(angle * 0.85) * 0.45, Math.sin(angle) * radius);
        positions[index * 6] = 0;
        positions[index * 6 + 1] = 0;
        positions[index * 6 + 2] = 0;
        positions[index * 6 + 3] = node.position.x;
        positions[index * 6 + 4] = node.position.y;
        positions[index * 6 + 5] = node.position.z;
      });
      geometry.attributes.position.needsUpdate = true;
    }
  };
}

function exp(scene) {
  const group = new THREE.Group();
  const cubes = [];
  for (let index = 0; index < 4; index += 1) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), material(index === 1 ? accent : ink));
    cube.position.y = 1.1 - index * 0.7;
    group.add(cube);
    cubes.push(cube);
  }
  scene.add(group);
  return {
    update(dt, p) {
      cubes.forEach((cube, index) => {
        cube.rotation.y += dt * (0.3 + index * 0.05);
        cube.position.x = Math.sin(performance.now() / 900 + index) * 0.18 + p.x * 0.2;
      });
    }
  };
}

function contact(scene) {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.045, 12, mobile ? 40 : 80), material(accent));
  scene.add(ring);
  return {
    update(dt, p) {
      ring.rotation.x = 1.1 + p.y * 0.25;
      ring.rotation.y += dt * 0.35 + p.x * 0.01;
    }
  };
}

const builders = { hero, who, stack, agenda, crm, exp, contact };

function fit(slot) {
  const width = Math.max(1, slot.host.clientWidth);
  const height = Math.max(1, slot.host.clientHeight);
  slot.camera.aspect = width / height;
  slot.camera.updateProjectionMatrix();
  slot.renderer.setSize(width, height, false);
}

function play(slot) {
  slot.want = true;
  if (slot.raf) return;
  slot.last = performance.now();
  const loop = (time) => {
    slot.raf = requestAnimationFrame(loop);
    if (document.hidden || !slot.want) return;
    const dt = Math.min(0.05, (time - slot.last) / 1000);
    slot.last = time;
    pointer.x += (pointer.tx - pointer.x) * 0.08;
    pointer.y += (pointer.ty - pointer.y) * 0.08;
    const rect = slot.host.getBoundingClientRect();
    const mid = (rect.top + rect.height / 2) / window.innerHeight - 0.5;
    slot.group.position.y = -mid * 0.35;
    slot.api.update(dt, pointer, slot.host);
    slot.renderer.render(slot.scene, slot.camera);
  };
  slot.raf = requestAnimationFrame(loop);
}

function pause(slot) {
  slot.want = false;
  if (slot.raf) cancelAnimationFrame(slot.raf);
  slot.raf = 0;
}

function destroy(host) {
  const slot = slots.get(host);
  if (!slot) return;
  pause(slot);
  slot.ro.disconnect();
  slot.scene.traverse((node) => {
    if (node.geometry) node.geometry.dispose();
    if (node.material) {
      const list = Array.isArray(node.material) ? node.material : [node.material];
      list.forEach((item) => item.dispose());
    }
  });
  slot.renderer.dispose();
  slot.canvas.remove();
  slots.delete(host);
}

function mount(host) {
  if (slots.has(host)) {
    play(slots.get(host));
    return;
  }
  if (slots.size >= maxSlots) {
    const idle = [...slots.keys()].find((key) => slots.get(key).want === false);
    if (!idle) return;
    destroy(idle);
  }
  let renderer;
  const canvas = document.createElement("canvas");
  host.appendChild(canvas);
  try {
    renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !mobile,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(dprCap);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.z = 6;
  lights(scene);
  const kind = host.dataset.scene;
  const build = builders[kind] || builders.hero;
  const api = build(scene);
  const group = scene.children.find((child) => child.isGroup || child.isMesh) || scene;
  const slot = { host, canvas, renderer, scene, camera, api, group, raf: 0, last: 0, want: true, ro: null };
  const ro = new ResizeObserver(() => fit(slot));
  ro.observe(host);
  slot.ro = ro;
  slots.set(host, slot);
  fit(slot);
  play(slot);
  } catch (error) {
    canvas.remove();
  }
}

function consider(host, visible) {
  if (visible) {
    pending.add(host);
    mount(host);
    return;
  }
  pending.delete(host);
  const slot = slots.get(host);
  if (slot) pause(slot);
  pending.forEach((item) => mount(item));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => consider(entry.target, entry.isIntersecting));
}, { rootMargin: "180px 0px", threshold: 0.12 });

document.querySelectorAll("[data-scene]").forEach((host) => observer.observe(host));

document.addEventListener("visibilitychange", () => {
  slots.forEach((slot) => {
    if (document.hidden) {
      if (slot.raf) cancelAnimationFrame(slot.raf);
      slot.raf = 0;
    } else if (slot.want) play(slot);
  });
});
