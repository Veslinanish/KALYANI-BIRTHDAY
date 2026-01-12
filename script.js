/* 🌌 STARS */
const starCanvas=document.getElementById("bgStars");
const sctx=starCanvas.getContext("2d");
starCanvas.width=innerWidth;
starCanvas.height=innerHeight;

const stars=[];
for(let i=0;i<2000;i++){
  stars.push({
    x:Math.random()*starCanvas.width,
    y:Math.random()*starCanvas.height,
    r:Math.random()*1.2,
    a:Math.random()
  });
}

function drawStars(){
  sctx.clearRect(0,0,starCanvas.width,starCanvas.height);
  stars.forEach(s=>{
    sctx.fillStyle=`rgba(255,255,255,${0.3+s.a})`;
    sctx.beginPath();
    sctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    sctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

/* ☄️ METEORS */
const meteorCanvas=document.getElementById("bgMeteors");
const mctx=meteorCanvas.getContext("2d");
meteorCanvas.width=innerWidth;
meteorCanvas.height=innerHeight;

setInterval(()=>{
  let x=Math.random()*meteorCanvas.width;
  let y=0;
  let vx=-8,vy=8;
  let life=30;

  const m=setInterval(()=>{
    mctx.clearRect(0,0,meteorCanvas.width,meteorCanvas.height);
    mctx.strokeStyle="rgba(255,255,255,0.8)";
    mctx.lineWidth=2;
    mctx.beginPath();
    mctx.moveTo(x,y);
    mctx.lineTo(x-20,y+20);
    mctx.stroke();
    x+=vx; y+=vy;
    life--;
    if(life<=0) clearInterval(m);
  },30);
},2500);

/* 🔓 UNLOCK */
function unlock(){
  if(password.value!=="kalyani"){
    error.innerText="Wrong password 💔";
    return;
  }
  lockScreen.style.display="none";
  content.style.display="block";
  bgMusic.play();
}

/* 🎁 GIFT */
function openGift(){
  document.querySelector(".lid").style.transform="rotateX(-120deg)";
  navigator.vibrate?.(200);
  setTimeout(()=>{
    cakeSlide.scrollIntoView({behavior:"smooth"});
  },1000);
}

/* 🎂 CAKE */
let blown=false;
function blowCandles(){
  if(blown) return;
  blown=true;

  document.querySelectorAll(".flame").forEach(f=>f.remove());
  wishText.classList.remove("hidden");
  wishSub.classList.remove("hidden");

  releaseBalloons();
  startFireworks();
}

/* 🎈 BALLOONS */
function releaseBalloons(){
  for(let i=0;i<18;i++){
    const b=document.createElement("div");
    b.className="balloon";
    b.style.left=Math.random()*100+"vw";
    b.style.background=`hsl(${Math.random()*360},80%,60%)`;
    document.body.appendChild(b);
    setTimeout(()=>b.remove(),7000);
  }
}

/* 🎆 FIREWORKS */
const fw=document.getElementById("fireworks");
const fctx=fw.getContext("2d");
fw.width=innerWidth;
fw.height=innerHeight;

function startFireworks(){
  let count=0;
  const fwTimer=setInterval(()=>{
    explode(Math.random()*fw.width,Math.random()*fw.height/2);
    if(++count>12){
      clearInterval(fwTimer);
      fctx.clearRect(0,0,fw.width,fw.height);
    }
  },600);
}

function explode(x,y){
  for(let i=0;i<30;i++){
    let a=Math.random()*Math.PI*2;
    let s=Math.random()*4+2;
    let vx=Math.cos(a)*s;
    let vy=Math.sin(a)*s;
    let life=30;
    let px=x,py=y;
    const c=`hsl(${Math.random()*360},100%,60%)`;

    const p=setInterval(()=>{
      fctx.fillStyle=c;
      fctx.beginPath();
      fctx.arc(px,py,2,0,Math.PI*2);
      fctx.fill();
      px+=vx; py+=vy;
      if(--life<=0) clearInterval(p);
    },16);
  }
}
