import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js";

const mobile = window.matchMedia("(max-width: 800px)").matches;
const count = mobile ? 9 : 16;
const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.25);

function cloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  const puffs = [
    [128, 140, 86],
    [86, 126, 58],
    [172, 122, 54],
    [112, 98, 48],
    [154, 164, 52],
    [70, 150, 36]
  ];
  puffs.forEach(([x, y, radius]) => {
    const gradient = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
    gradient.addColorStop(0, "rgba(255,255,255,0.9)");
    gradient.addColorStop(0.42, "rgba(255,255,255,0.38)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const canvas = document.createElement("canvas");
canvas.id = "clouds";
canvas.setAttribute("aria-hidden", "true");
document.body.prepend(canvas);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
renderer.setPixelRatio(dpr);
renderer.setClearColor(0x000000, 0);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 40);
camera.position.z = 8;

const geometry = new THREE.InstancedBufferGeometry();
const base = new THREE.PlaneGeometry(1, 1);
geometry.index = base.index;
geometry.setAttribute("position", base.attributes.position);
geometry.setAttribute("uv", base.attributes.uv);
geometry.instanceCount = count;

const offsets = new Float32Array(count * 3);
const seeds = new Float32Array(count);
const scales = new Float32Array(count);
const tints = new Float32Array(count);
for (let index = 0; index < count; index += 1) {
  offsets[index * 3] = (Math.random() - 0.5) * (mobile ? 12 : 18);
  offsets[index * 3 + 1] = (Math.random() - 0.35) * 8;
  offsets[index * 3 + 2] = -1 - Math.random() * 7;
  seeds[index] = Math.random() * Math.PI * 2;
  scales[index] = (mobile ? 2.2 : 2.6) + Math.random() * 2.4;
  tints[index] = Math.random() < 0.08 ? 0.4 : 0;
}
geometry.setAttribute("offset", new THREE.InstancedBufferAttribute(offsets, 3));
geometry.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1));
geometry.setAttribute("aScale", new THREE.InstancedBufferAttribute(scales, 1));
geometry.setAttribute("aTint", new THREE.InstancedBufferAttribute(tints, 1));

const uniforms = {
  uMap: { value: cloudTexture() },
  uTime: { value: 0 },
  uPointer: { value: new THREE.Vector2() },
  uScroll: { value: 0 },
  uFade: { value: 1 }
};

const material = new THREE.ShaderMaterial({
  uniforms,
  transparent: true,
  depthWrite: false,
  vertexShader: `
    attribute vec3 offset;
    attribute float aSeed;
    attribute float aScale;
    attribute float aTint;
    uniform float uTime;
    uniform vec2 uPointer;
    uniform float uScroll;
    varying vec2 vUv;
    varying float vTint;
    varying float vSeed;
    void main() {
      vUv = uv;
      vTint = aTint;
      vSeed = aSeed;
      vec3 pos = offset;
      pos.x += sin(uTime * 0.02 + aSeed) * 0.18 + uPointer.x * 0.22;
      pos.y += cos(uTime * 0.016 + aSeed) * 0.1 + uPointer.y * 0.12 + uScroll;
      vec4 mv = viewMatrix * modelMatrix * vec4(pos, 1.0);
      mv.xy += position.xy * aScale;
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform sampler2D uMap;
    uniform float uFade;
    varying vec2 vUv;
    varying float vTint;
    varying float vSeed;
    void main() {
      float alpha = texture2D(uMap, vUv).a;
      vec3 paper = vec3(0.949, 0.941, 0.918);
      vec3 ink = vec3(0.22, 0.22, 0.22);
      vec3 warm = vec3(1.0, 0.42, 0.22);
      vec3 color = mix(paper, ink, 0.18);
      color = mix(color, warm, vTint * 0.15);
      float shade = 0.9 + 0.1 * sin(vSeed);
      gl_FragColor = vec4(color * shade, alpha * 0.34 * uFade);
    }
  `
});

scene.add(new THREE.Mesh(geometry, material));

const pointer = { x: 0, y: 0 };
window.addEventListener("pointermove", (event) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
}, { passive: true });

let heroRatio = 1;
const hero = document.querySelector(".hero");
if (hero) {
  const observer = new IntersectionObserver(([entry]) => {
    heroRatio = entry.intersectionRatio;
  }, { threshold: [0, 0.15, 0.4, 0.75, 1] });
  observer.observe(hero);
}

function fit() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / Math.max(1, height);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}
fit();
window.addEventListener("resize", fit);

let raf = 0;
let last = performance.now();
let running = true;

function frame(now) {
  raf = requestAnimationFrame(frame);
  if (!running || document.hidden) return;
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  uniforms.uTime.value += dt;
  uniforms.uPointer.value.x += (pointer.x - uniforms.uPointer.value.x) * 0.06;
  uniforms.uPointer.value.y += (pointer.y - uniforms.uPointer.value.y) * 0.06;
  const scroll = window.scrollY / window.innerHeight;
  if (heroRatio === 0 && scroll > 0.85) return;
  uniforms.uScroll.value = -scroll * 0.45;
  uniforms.uFade.value = 0.22 + heroRatio * 0.5;
  renderer.render(scene, camera);
}
raf = requestAnimationFrame(frame);

document.addEventListener("visibilitychange", () => {
  running = document.visibilityState === "visible";
  if (running) last = performance.now();
});
