// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('ring');
let mx=0,my=0, rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
(function animRing(){ rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animRing); })();
document.querySelectorAll('a,button,.project-card,.stat-pill').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cursor.style.transform='translate(-50%,-50%) scale(1.6)'; cursor.style.background='var(--teal)'; });
  el.addEventListener('mouseleave',()=>{ cursor.style.transform='translate(-50%,-50%) scale(1)'; cursor.style.background='var(--blue-mid)'; });
});

// Stars
const starsEl = document.getElementById('stars');
for(let i=0;i<28;i++){
  const s = document.createElement('div');
  s.className='star';
  s.style.left = Math.random()*100+'vw';
  s.style.top = Math.random()*100+'vh';
  s.style.width = s.style.height = (4+Math.random()*8)+'px';
  s.style.animationDuration = (8+Math.random()*18)+'s';
  s.style.animationDelay = (-Math.random()*20)+'s';
  starsEl.appendChild(s);
}

// Skills data
const skills = [
  {name:'React.js', level:90, badge:'Advanced'},
  {name:'Next.js', level:85, badge:'Advanced'},
  {name:'Angular', level:70, badge:'Intermediate'},
  {name:'TypeScript', level:85, badge:'Advanced'},
  {name:'JavaScript ES6+', level:90, badge:'Advanced'},
  {name:'HTML5/CSS3', level:90, badge:'Advanced'},
  {name:'Tailwind CSS', level:85, badge:'Advanced'},
  {name:'Bootstrap', level:85, badge:'Advanced'},
  {name:'Redux', level:70, badge:'Intermediate'},
  {name:'Context API', level:60, badge:'Beginner'},
  {name:'Smart Contracts', level:75, badge:'Advanced'},
  {name:'Solidity', level:70, badge:'Advanced'},
  {name:'RESTful APIs', level:85, badge:'Advanced'},
  {name:'Git/GitHub', level:75, badge:'Intermediate'},
  {name:'Agile/Scrum', level:75, badge:'Intermediate'},
  {name:'Performance Opt.', level:85, badge:'Advanced'},
  {name:'Clean Code', level:75, badge:'Intermediate'},
  {name:'UI/UX Collab', level:85, badge:'Advanced'},
  {name:'SEO', level:85, badge:'Advanced'},
  {name:'Hardhat', level:75, badge:'Advanced'},
];
const grid = document.getElementById('skillsGrid');
skills.forEach(s=>{
  const el = document.createElement('div');
  el.className='skill-item';
  el.innerHTML=`<span class="skill-badge">${s.badge}</span><span class="skill-name">${s.name}</span><div class="skill-level-wrap"><div class="skill-level" data-w="${s.level}"></div></div>`;
  grid.appendChild(el);
});

// Scroll reveal + skill bars
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      e.target.querySelectorAll('.skill-level').forEach(bar=>{
        bar.style.width = bar.dataset.w+'%';
      });
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// ─── Blue Vortex Swirl Canvas ───
(function() {
  const canvas = document.getElementById('codeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, cx, cy, particles;

  function init() {
    const parent = canvas.parentElement;
    w = canvas.width  = parent.offsetWidth;
    h = canvas.height = parent.offsetHeight;
    cx = w / 2;
    cy = h / 2;

    particles = Array.from({ length: 220 }, () => createParticle());
  }

  function createParticle() {
    const angle  = Math.random() * Math.PI * 2;
    const radius = 10 + Math.random() * (Math.min(w, h) / 2 - 10);
    return {
      angle,
      radius,
      speed:  (0.008 + Math.random() * 0.018) * (Math.random() < 0.5 ? 1 : -1),
      size:   1 + Math.random() * 2.5,
      alpha:  0.3 + Math.random() * 0.7,
      color:  pickColor(radius),
      drift:  (Math.random() - 0.5) * 0.002,   // slow inward/outward drift
    };
  }

  function pickColor(radius) {
    const maxR = Math.min(w, h) / 2;
    const t = 1 - radius / maxR;   // 1 = centre, 0 = edge
    if (t > 0.7) return '#ffffff';
    if (t > 0.5) return '#38e8c6';
    if (t > 0.3) return '#5b8ef0';
    return '#2d5be3';
  }

  // Spiral arm lines
  function drawSpiral() {
    const maxR = Math.min(w, h) / 2 - 4;
    const arms = 3;
    for (let a = 0; a < arms; a++) {
      ctx.beginPath();
      const baseAngle = (Date.now() / 2000) + (a * Math.PI * 2 / arms);
      for (let r = 4; r < maxR; r += 2) {
        const angle = baseAngle + r * 0.045;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (r === 4) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      const grad = ctx.createLinearGradient(cx - maxR, cy, cx + maxR, cy);
      grad.addColorStop(0,   'rgba(56,232,198,0)');
      grad.addColorStop(0.4, 'rgba(56,232,198,0.25)');
      grad.addColorStop(0.6, 'rgba(91,142,240,0.35)');
      grad.addColorStop(1,   'rgba(45,91,227,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.2;
      ctx.stroke();
    }
  }

  // Radial glow at centre
  function drawGlow() {
    const r = Math.min(w, h) * 0.28;
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grd.addColorStop(0,   'rgba(255,255,255,0.22)');
    grd.addColorStop(0.2, 'rgba(56,232,198,0.18)');
    grd.addColorStop(0.6, 'rgba(45,91,227,0.10)');
    grd.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  let lastTime = 0;
  function draw(ts) {
    const dt = Math.min((ts - lastTime) / 16, 3);
    lastTime = ts;

    // Dark fade
    ctx.fillStyle = 'rgba(8, 18, 42, 0.28)';
    ctx.fillRect(0, 0, w, h);

    drawSpiral();
    drawGlow();

    // Particles
    for (const p of particles) {
      p.angle  += p.speed * dt;
      p.radius += p.drift * dt;

      // Bounce radius
      const maxR = Math.min(w, h) / 2 - 6;
      if (p.radius < 6 || p.radius > maxR) {
        p.drift *= -1;
        p.radius = Math.max(6, Math.min(p.radius, maxR));
      }

      p.color = pickColor(p.radius);

      const x = cx + Math.cos(p.angle) * p.radius;
      const y = cy + Math.sin(p.angle) * p.radius;

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha * 0.85;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('load', () => {
    init();
    requestAnimationFrame(draw);
  });
})();