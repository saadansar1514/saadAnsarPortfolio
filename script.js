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
