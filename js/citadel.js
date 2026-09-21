const CITADEL_LINES = [
  "Mwari ndi Mwari. The Lord is my light and my salvation; whom shall I fear?",
  "He who dwells in the shelter of the Most High will abide under the shadow of the Almighty.",
  "Tsitsi upon the House of Masawi — mercy that does not run dry.",
  "Rudo upon every child and heir — love that casts out fear.",
  "Runyararo in the night watches — peace that silences mimicking tongues.",
  "Hutano in bone, blood, and mind — health in the inner parts.",
  "Pfuma that is clean — provision without the devourer.",
  "Nzvimbo kudenga — a place kept in heaven for this bloodline.",
  "Hupenyu husingaperi — life that does not end in Christ.",
  "No weapon formed against this house shall prosper, and every tongue that rises in judgment I condemn.",
  "I refuse every devouring word. You shall not eat this life.",
  "In the name of Jesus Christ, mimicking voices be still.",
  "Submit yourselves therefore to God. Resist the devil, and he will flee from you.",
  "You will not fear the terror of night, nor the arrow that flies by day.",
  "Greater is He that is in me than he that is in the world.",
  "Peace to every child of God who stands in this light.",
  "I cancel every assignment against Saint Tariro Masawi, Tarry Kupakwashe Masawi, Kenzi, and the living line.",
  "What was sent to steal returns void. What was sent to kill finds no door. What was sent to destroy meets a sealed house."
];
function speak(text){
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.92;
  speechSynthesis.speak(u);
}
function bindStream(streamId, toggleId, onceId){
  const stream = document.getElementById(streamId);
  if (!stream) return;
  let i = Math.floor(Date.now()/1000) % CITADEL_LINES.length;
  let on = false;
  const show = () => { stream.textContent = CITADEL_LINES[i % CITADEL_LINES.length]; };
  show();
  const toggle = document.getElementById(toggleId);
  const once = document.getElementById(onceId);
  if (once) once.onclick = () => speak(CITADEL_LINES[i % CITADEL_LINES.length]);
  if (toggle) toggle.onclick = function(){
    on = !on;
    this.textContent = on ? "Pause the covering" : "Start spoken covering";
    if (on) speak(CITADEL_LINES[i % CITADEL_LINES.length]); else speechSynthesis.cancel();
  };
  setInterval(() => { i++; show(); if (on) speak(CITADEL_LINES[i % CITADEL_LINES.length]); }, 24000);
}
function loadPulse(elId){
  const el = document.getElementById(elId);
  if (!el) return;
  fetch("data/pulse.json").then(r => r.json()).then(p => {
    el.textContent = "Citadel pulse " + (p.cycle||0) + " · " + (p.updated||"") + " · " + (p.blessing||"");
  }).catch(() => { el.textContent = "Pulse waiting for the first scheduled Action."; });
}
function drawField(){
  const c = document.getElementById("field");
  if (!c) return;
  const x = c.getContext("2d");
  const size = () => { c.width = innerWidth; c.height = innerHeight; };
  size(); addEventListener("resize", size);
  let t = 0;
  (function loop(){
    t += 0.007;
    x.fillStyle = "rgba(5,4,10,0.2)";
    x.fillRect(0,0,c.width,c.height);
    for (let k=0;k<3;k++){
      x.beginPath();
      x.strokeStyle = "rgba(224,193,117," + (0.12 + k*0.05) + ")";
      for (let n=0;n<c.width;n+=3){
        const y = c.height*(0.62+k*0.06) + Math.sin(n*0.01 + t*(1.4+k)) * (16+k*6);
        n===0 ? x.moveTo(n,y) : x.lineTo(n,y);
      }
      x.stroke();
    }
    requestAnimationFrame(loop);
  })();
}
document.addEventListener("DOMContentLoaded", () => {
  bindStream("stream","toggle","speakOnce");
  loadPulse("pulseStatus");
  drawField();
  const ret = document.getElementById("returnBtn");
  const rp = document.getElementById("returnPrayer");
  if (ret && rp) ret.onclick = () => speak(rp.innerText);
});
