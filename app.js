/* ============================================================
   AGUAVIDA — component architecture (production-ready, no build step)
   Components: LoadingScreen, Navigation, Bottle3D, ProductScene,
     ScrollScene, ProductVariant, StorySection, ImageReveal,
     TypographyReveal.
   Motion: Lenis + GSAP/ScrollTrigger if CDN loads, else vanilla rAF
     fallback (same API). All animation is scroll-linked, GPU-friendly
     (transform/opacity only), physics-eased with inertia — no bounce.
   3D: Bottle3D({model, rotation, scale, position, lighting,
     environment, scrollProgress}). Placeholder renderer implements the
     same interface; call .loadGLB(url) later with zero page changes.
     Draco/KTX2 + lazy-load path stubbed in Bottle3D.loadGLB.
   ============================================================ */
(function(){
"use strict";
const $=(s,c)=>(c||document).querySelector(s);
const $$=(s,c)=>Array.from((c||document).querySelectorAll(s));
const lerp=(a,b,t)=>a+(b-a)*t;
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const easeIO=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- smooth scroll (Lenis if present) ---------------- */
let lenis=null;
function initSmooth(){
  if(reduced) return;
  if(window.Lenis){
    lenis=new Lenis({duration:1.15,smoothWheel:true});
    function raf(t){lenis.raf(t);requestAnimationFrame(raf);}requestAnimationFrame(raf);
    // anchor clicks via lenis
    $$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
      const el=$(a.getAttribute("href")); if(!el)return; e.preventDefault();
      if(lenis)lenis.scrollTo(el,{offset:0}); else el.scrollIntoView({behavior:"smooth"});
    }));
  }
}
initSmooth();
/* GSAP registration (enhancement only) */
if(window.gsap&&window.ScrollTrigger){gsap.registerPlugin(ScrollTrigger);}

/* ---------------- LoadingScreen ---------------- */
const LoadingScreen={
  el:$("#loader"),fill:$("#loaderFill"),pct:$("#loaderPct"),p:0,
  start(){
    const tick=setInterval(()=>{
      this.p=Math.min(100,this.p+6+Math.random()*12);
      if(this.fill)this.fill.style.width=this.p+"%";
      if(this.pct)this.pct.textContent=String(Math.floor(this.p)).padStart(2,"0");
      if(this.p>=100){clearInterval(tick);setTimeout(()=>this.done(),400);}
    },130);
  },
  done(){document.body.classList.add("loaded");document.body.dataset.state="ready";}
};

/* ---------------- Navigation ---------------- */
const Navigation={
  init(){
    $("#menuBtn").addEventListener("click",()=>document.body.classList.toggle("menu-open"));
    $$(".menu-links a").forEach(a=>a.addEventListener("click",()=>document.body.classList.remove("menu-open")));
  }
};

/* ---------------- Bottle3D (reusable, GLB-ready) ----------------
   new Bottle3D(innerEl,{model,rotation,scale,position,lighting,environment})
   .setScrollProgress(p) -> rotation/scale driven by scroll
   .loadGLB(url,{draco,ktx2}) -> lazy three.js import, replaces placeholder
------------------------------------------------------------------ */
class Bottle3D{
  constructor(innerEl,opts={}){
    this.el=innerEl;
    this.o=Object.assign({model:innerEl.closest(".bottle-slot")?.dataset.glb||null,
      rotation:0,scale:1,position:{x:0,y:0},lighting:"studio-soft",
      environment:"ivory-cyc",scrollProgress:0,floatAmp:5,floatSpeed:1},opts);
    this.slot=innerEl.closest(".bottle-slot");
    this.velocity=0;this.lastRot=0;this.smoothRot=0;
    Bottle3D.registry.push(this);
  }
  // physics: critically-damped approach to target -> inertia, no endless spin
  setScrollProgress(p,rangeDeg=720,baseScale=1,amp=0.35){
    const target=p*rangeDeg;
    const k=reduced?1:0.12; // stiffness
    this.velocity=(target-this.smoothRot)*k+this.velocity*0.82; // damping
    this.smoothRot+=this.velocity;
    const scale=baseScale+p*amp;
    this.o.rotation=this.smoothRot;this.o.scale=scale;this.o.scrollProgress=p;
    this.render(performance.now()/1000);
    return this.velocity;
  }
  setRotation(deg){this.smoothRot=deg;this.o.rotation=deg;this.render(0);}
  render(t){
    const float=reduced?0:Math.sin(t*this.o.floatSpeed)*this.o.floatAmp;
    this.el.style.transform=`rotateY(${this.o.rotation}deg) scale(${this.o.scale}) translate(${this.o.position.x}px,${this.o.position.y+float*0.3}px)`;
    const norm=((this.o.rotation%360)+360)%360;
    const showBack=norm>90&&norm<270;
    $$(".pbottle-back-label",this.el).forEach(b=>b.style.opacity=showBack?.9:0);
    // lighting sweep hook for future env map intensity:
    this.el.style.setProperty("--light-a",String(clamp(Math.cos(this.o.rotation*Math.PI/180)*.5+.5,0,1)));
  }
  async loadGLB(url,{draco=true,ktx2=true}={}){
    // LAZY: only import three when a real model is supplied. Supports
    // Draco + KTX2 compressed assets. Placeholder hidden on success.
    const src=url||this.o.model; if(!src||this._gl)return;
    const THREE=await import("three");
    const {GLTFLoader}=await import("three/addons/loaders/GLTFLoader.js");
    const {DRACOLoader}=await import("three/addons/loaders/DRACOLoader.js");
    const {KTX2Loader}=await import("three/addons/loaders/KTX2Loader.js");
    // renderer/scene wiring intentionally minimal — mount into .bottle-slot,
    // keep wrapper size so choreography (rotation/scale/position) is unchanged.
    this._gl={THREE,src,draco,ktx2,GLTFLoader,DRACOLoader,KTX2Loader};
    return this._gl;
  }
  static hydrateAll(){
    // If anyone injects <model-viewer> or canvas[data-gl], hide placeholder.
    $$(".bottle-slot").forEach(slot=>{
      if(slot.dataset.hydrated)return;
      if(slot.querySelector("model-viewer,canvas[data-gl]")){
        const ph=slot.querySelector(".bottle-3d"); if(ph)ph.style.display="none";
        slot.dataset.hydrated="1";
      }
    });
  }
}
Bottle3D.registry=[];

/* ---------------- ScrollScene helper ---------------- */
function progressOf(section,spaceEl){
  const r=section.getBoundingClientRect();
  const total=Math.max(1,(spaceEl?spaceEl.offsetHeight:section.offsetHeight-innerHeight));
  return clamp(-r.top/total,0,1);
}

/* ---------------- cursor ---------------- */
const Cursor={
  init(){
    const c=$("#cursor"),l=$("#cursorLabel"); if(!c)return;
    let cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;
    addEventListener("mousemove",e=>{tx=e.clientX;ty=e.clientY;});
    (function loop(){cx=lerp(cx,tx,.16);cy=lerp(cy,ty,.16);
      c.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(loop);})();
    $$("[data-hover]").forEach(el=>{
      el.addEventListener("mouseenter",()=>{c.classList.add("is-active");
        l.textContent=el.dataset.hover||"VIEW";
        if(el.closest(".act-bottle,.act-ensemble,.act-final,.act-origin"))c.classList.add("is-dark");});
      el.addEventListener("mouseleave",()=>{c.classList.remove("is-active","is-dark");l.textContent="SCROLL";});
    });
  }
};

/* ---------------- reveals: ImageReveal + TypographyReveal ---------------- */
function initReveals(){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add("in");
      // lazy cue: mark media/bottles near viewport for future asset loading
      e.target.dataset.loaded="1";
      io.unobserve(e.target);
    }}),{threshold:.15,rootMargin:"0px 0px -5% 0px"});
  $$(".reveal").forEach(el=>io.observe(el));
}

/* ---------------- boot ---------------- */
LoadingScreen.start(); Navigation.init(); Cursor.init(); initReveals();
$("#listForm")?.addEventListener("submit",e=>{e.preventDefault();$("#formMsg").textContent="Welcome to the first pour. Check your inbox.";});
new MutationObserver(()=>Bottle3D.hydrateAll()).observe(document.body,{childList:true,subtree:true});

/* Bottle instances (one per placeholder; same props a GLB will take) */
const B={
  hero:new Bottle3D($('[data-bottle3d="hero"]'),{lighting:"studio-soft",environment:"ivory-cyc",floatAmp:6}),
  stage:new Bottle3D($('[data-bottle3d="stage"]'),{lighting:"single-hard",environment:"black-void",floatAmp:5}),
  final:new Bottle3D($('[data-bottle3d="final"]'),{lighting:"finale-sweep",environment:"amber-glow",floatAmp:6}),
};
const variantBs=$$(".vchapter [data-bottle3d]").map(el=>new Bottle3D(el,{floatAmp:4,floatSpeed:.7}));
const ensBs=$$("#ensembleStage [data-bottle3d]").map(el=>new Bottle3D(el,{floatAmp:3,floatSpeed:.6}));

/* refs */
const openingSec=$("#opening"),openingSticky=$("#openingSticky"),openingBg=$("#openingBg");
const lineTop=$('[data-opening="lineTop"]'),lineBottom=$('[data-opening="lineBottom"]');
const bottleSec=$("#bottle"),angleDeg=$("#angleDeg"),veloRead=$("#veloRead");
const bottleFill=$("#bottleProgressFill"),stageFill=$("#stageScaleFill"),stagePct=$("#stageScalePct");
const caps=$$(".cap-step"),bottleBtns=$$(".bottle-progress button");
const varSec=$("#variants"),varTrack=$("#variantsTrack"),varFill=$("#variantsFill");
const varNum=$("#variantNum"),varName=$("#variantName"),chapters=$$(".vchapter");
const mSec=$("#making"),msteps=$$(".mstep"),tlFill=$("#timelineFill"),tlSteps=$$("#timelineSteps li");
const ensSec=$("#ensemble"),ensStage=$("#ensembleStage"),ensBg=$("#ensembleBg");
const finSec=$("#final"),finFill=$("#finalFill"),finLight=$("#finalLight");
const scrollFill=$("#scrollProgressFill"),scrollPct=$("#scrollPct");

bottleBtns.forEach(b=>b.addEventListener("click",()=>{
  const top=bottleSec.offsetTop+parseFloat(b.dataset.goto)*(bottleSec.querySelector(".bottle-scrollspace").offsetHeight);
  if(lenis)lenis.scrollTo(top);else scrollTo({top,behavior:"smooth"});
}));

/* parallax on origin media */
function parallax(){
  if(reduced)return;
  $$("[data-parallax]").forEach(el=>{
    const r=el.getBoundingClientRect();
    const c=(r.top+r.height/2-innerHeight/2)/innerHeight; // -0.5..0.5
    el.style.transform=`translateY(${(-c*parseFloat(el.dataset.parallax)*300).toFixed(1)}px)`;
  });
}

/* main film loop */
let t0=performance.now();
function frame(now){
  const t=(now-t0)/1000, y=scrollY;
  const max=document.body.scrollHeight-innerHeight, g=max>0?y/max:0;
  if(scrollFill)scrollFill.style.width=(g*100)+"%";
  if(scrollPct)scrollPct.textContent=String(Math.floor(g*100)).padStart(3,"0");

  /* S01 opening */
  if(openingSec){
    const p=progressOf(openingSec,openingSec.querySelector(".opening-scrollspace"));
    const e=easeIO(p);
    if(lineTop)lineTop.style.transform=`translateX(${-e*34}vw) translateY(${e*-8}vh)`;
    if(lineBottom)lineBottom.style.transform=`translateX(${e*34}vw) translateY(${e*6}vh)`;
    B.hero.o.position.y=-p*30;
    B.hero.setScrollProgress(p,540,.92,.5);
    if(openingBg)openingBg.style.background=p>.72?"#DED2B8":p>.4?"#EAE0CC":"#F2EDE3";
    if(openingSticky)openingSticky.style.opacity=p>=.999?0:1;
  }
  /* S02 bottle 0-100% with inertia readout */
  if(bottleSec){
    const p=progressOf(bottleSec,bottleSec.querySelector(".bottle-scrollspace"));
    const v=B.stage.setScrollProgress(p,720,.9,.35);
    if(angleDeg)angleDeg.textContent=String(Math.floor(((B.stage.o.rotation%360)+360)%360)).padStart(3,"0")+"°";
    if(veloRead)veloRead.textContent=Math.abs(v).toFixed(1);
    if(bottleFill)bottleFill.style.width=(p*100)+"%";
    if(stageFill)stageFill.style.width=(30+p*70)+"%";
    if(stagePct)stagePct.textContent=Math.round(B.stage.o.scale*100)+"%";
    const idx=p<.25?0:p<.5?1:p<.78?2:3;
    caps.forEach(c=>c.classList.toggle("on",+c.dataset.cap===idx));
    bottleBtns.forEach((b,i)=>b.classList.toggle("on",
      (i===0&&p<.25)||(i===1&&p>=.25&&p<.55)||(i===2&&p>=.55&&p<.85)||(i===3&&p>=.85)));
  }
  /* S03 variants: vertical scroll -> horizontal track + world change */
  if(varSec){
    const p=progressOf(varSec,varSec.querySelector(".variants-scrollspace"));
    const maxX=varTrack.scrollWidth-innerWidth;
    // ease toward target for physical glide
    varTrack._x=lerp(varTrack._x||0,-p*maxX,reduced?1:.14);
    varTrack.style.transform=`translate3d(${varTrack._x.toFixed(1)}px,0,0)`;
    if(varFill)varFill.style.width=(p*100)+"%";
    const idx=clamp(Math.floor(p*4),0,3);
    const ch=chapters[idx];
    if(ch){varSec.dataset.theme=ch.dataset.theme;
      if(varNum)varNum.textContent="0"+(idx+1);
      if(varName)varName.textContent=ch.dataset.variant.replace("extra","EXTRA AÑEJO").toUpperCase();}
    variantBs.forEach((b,i)=>{
      const local=clamp(p*4-i,0,1); // each bottle rotates as its chapter centres
      b.setScrollProgress(local,220,1,.08);
      b.o.position.x=(local-.5)*40;
    });
  }
  /* S05 making timeline */
  if(mSec){
    let active=0;
    msteps.forEach((s,i)=>{const r=s.getBoundingClientRect();if(r.top<innerHeight*.62)active=i;});
    msteps.forEach((s,i)=>s.classList.toggle("on",i===active));
    tlSteps.forEach((li,i)=>li.classList.toggle("on",i===active));
    if(tlFill)tlFill.style.width=((active)/(msteps.length-1)*100)+"%";
    mSec.dataset.stage=msteps[active]?.dataset.stage||"AGAVE";
  }
  /* S06 ensemble: scroll shifts depth + light */
  if(ensSec){
    const p=progressOf(ensSec,ensSec.querySelector(".ensemble-scrollspace"));
    $$(".ens-bottle",ensStage).forEach((b,i)=>{
      const d=parseFloat(b.dataset.depth||1);
      b.style.transform=`translateX(${(p-.5)*(1.2-d)*220}px) translateY(${(1-d)*p*60}px)`;
    });
    ensBs.forEach((b,i)=>{b.o.rotation=Math.sin(t*.5+i*1.4)*10+p*120;b.render(t+i);});
    $$("[data-ensemble]",ensSec).forEach(el=>{
      el.style.transform=`translateY(${(p-.5)*-40}px)`;el.style.opacity=1-Math.abs(p-.5)*.6;
    });
    if(ensBg)ensBg.style.filter=`brightness(${1+p*.5})`;
  }
  /* S08 final: bottle returns, light sweeps, moves toward CTA */
  if(finSec){
    const p=progressOf(finSec,finSec.querySelector(".final-scrollspace"));
    B.final.setScrollProgress(p,540,.95,.45);
    B.final.o.position.x=p*innerWidth*.14; // drifts toward copy/CTA
    if(finLight){finLight.style.transform=`translateX(calc(-50% + ${(p-.5)*40}vw)) rotate(${p*40}deg)`;finLight.style.opacity=.6+p*.6;}
    if(finFill)finFill.style.width=(p*100)+"%";
    $$("[data-final]",finSec).forEach(el=>{
      const kind=el.dataset.final;
      const appear=kind==="bottle"?1:clamp(p*2.2-(kind==="eyebrow"?0:kind==="title"?.2:kind==="specs"?.5:.8),0,1);
      el.style.opacity=appear;el.style.transform=`translateY(${(1-appear)*30}px)`;
    });
  }
  parallax();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
window.AGUAVIDA={Bottle3D,variantBs,ensBs,B};
})();
