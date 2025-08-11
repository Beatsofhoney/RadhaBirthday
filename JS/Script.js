// slides + music + confetti
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const bgMusic = document.getElementById('bgMusic');
const confettiWrap = document.getElementById('confetti-wrap');

function showSlide(index) {
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  currentSlide = index;
}

// auto move S1 -> S2 after 10s
function startSlides() {
  setTimeout(() => showSlide(1), 10000);
}

// start music on first interaction (mobile browsers require it)
function setupMusicAutoPlay() {
  function playOnce() {
    if (bgMusic && bgMusic.paused) {
      bgMusic.volume = 0.45;
      bgMusic.play().catch(()=>{/*blocked*/});
    }
    window.removeEventListener('click', playOnce);
    window.removeEventListener('touchstart', playOnce);
  }
  window.addEventListener('click', playOnce);
  window.addEventListener('touchstart', playOnce);
}

// create quick confetti burst (simple DOM particles)
function confettiBurst(x = window.innerWidth/2, y = window.innerHeight/2, count = 28) {
  const colors = ['#ff5f6d','#ffc371','#ffe87c','#ffd1dc','#9be15d','#6be0ff'];
  for (let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'confetti';
    const size = Math.floor(Math.random()*10)+6;
    el.style.left = (x + (Math.random()-0.5)*120) + 'px';
    el.style.top = (y + (Math.random()-0.5)*40) + 'px';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.width = size+'px';
    el.style.height = (size*0.6)+'px';
    el.style.opacity = 0.95;
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    confettiWrap.appendChild(el);
    // animate via CSS transition
    requestAnimationFrame(()=> {
      el.style.transition = 'transform 1200ms cubic-bezier(.2,.8,.2,1), opacity 1200ms ease';
      el.style.transform = `translate(${(Math.random()-0.5)*600}px, ${Math.random()*700+120}px) rotate(${Math.random()*720}deg)`;
      el.style.opacity = 0;
    });
    // cleanup
    setTimeout(()=> el.remove(), 1400);
  }
}

// hook gift button: show slide3 + confetti + ensure music
document.getElementById('giftBtn').addEventListener('click', (e) => {
  // play music if available
  if (bgMusic && bgMusic.paused) {
    bgMusic.volume = 0.45;
    bgMusic.play().catch(()=>{});
  }
  // confetti around button
  const rect = e.currentTarget.getBoundingClientRect();
  confettiBurst(rect.left + rect.width/2, rect.top + rect.height/2, 28);

  // show launch slide after a tiny delay so confetti visible
  setTimeout(()=> showSlide(2), 450);
});

// launch button opens site
document.getElementById('launchBtn').addEventListener('click', () => {
  const b = document.getElementById('launchBtn');
  b.textContent = 'Launching... 🚀';
  b.disabled = true;
  // ensure music playing
  if (bgMusic && bgMusic.paused) bgMusic.play().catch(()=>{});
  setTimeout(()=> window.location.href = 'https://beatsofhoney.github.io/BeatsofHoney/', 1400);
});

// initialize
showSlide(0);
startSlides();
setupMusicAutoPlay();
