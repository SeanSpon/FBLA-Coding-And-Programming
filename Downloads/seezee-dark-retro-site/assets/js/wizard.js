
const steps = [
  { id:'type', title:'Project Type', html:`
    <label class="tag">Choose what you're building</label>
    <div style="display:grid;gap:10px">
      <label><input type="checkbox" name="type" value="Website"> Website</label>
      <label><input type="checkbox" name="type" value="Web App"> Web App</label>
      <label><input type="checkbox" name="type" value="Mobile App"> Mobile App</label>
      <label><input type="checkbox" name="type" value="Database"> Database</label>
      <label><input type="checkbox" name="type" value="AI/Automation"> AI/Automation</label>
    </div>
  `},
  { id:'scope', title:'Scope & Features', html:`
    <label class="tag">Core features</label>
    <div class="grid cols-2">
      <label>Pages count <input class="input" name="pages" type="number" min="1" value="5"/></label>
      <label>Auth <select name="auth" class="select">
        <option>None</option><option>Google</option><option>Email/Password</option><option>Both</option>
      </select></label>
      <label>Payments <select name="payments" class="select">
        <option>No</option><option>Stripe</option><option>Other</option>
      </select></label>
      <label>Dashboard <select name="dashboard" class="select">
        <option>No</option><option>Basic</option><option>Advanced</option>
      </select></label>
    </div>
  `},
  { id:'style', title:'Style & Brand', html:`
    <label class="tag">Look & feel</label>
    <div class="grid cols-2">
      <label>Palette <select name="palette" class="select">
        <option>Dark Neon</option><option>Minimal Light</option><option>Bold Color</option>
      </select></label>
      <label>Typography <select name="typeface" class="select">
        <option>Space Grotesk</option><option>Inter</option><option>System UI</option>
      </select></label>
      <label>References <input name="refs" class="input" placeholder="Links to sites you like"/></label>
      <label>Logo <input name="logo" class="input" placeholder="Describe or upload later"/></label>
    </div>
  `},
  { id:'content', title:'Content & Assets', html:`
    <label class="tag">What do you have ready?</label>
    <div class="grid cols-2">
      <label>Copy <select name="copy" class="select">
        <option>Need help</option><option>Draft ready</option><option>Final</option>
      </select></label>
      <label>Images <select name="images" class="select">
        <option>Need help</option><option>Some</option><option>Final</option>
      </select></label>
      <label>Pages <input name="pagesList" class="input" placeholder="Home, Services, About, Buy"/></label>
    </div>
  `},
  { id:'timing', title:'Timeline & Budget', html:`
    <label class="tag">Constraints</label>
    <div class="grid cols-2">
      <label>Timeline (weeks) <input class="input" name="timeline" type="number" value="3"/></label>
      <label>Budget ($) <input class="input" name="budget" type="number" value="2500"/></label>
      <label><input type="checkbox" name="musthave" value="Performance"> Performance is a must-have</label>
      <label><input type="checkbox" name="musthave" value="Accessibility"> Accessibility is a must-have</label>
    </div>
  `},
  { id:'review', title:'Review & Submit', html:`
    <p class="muted">Check your summary on the right, then submit.</p>
    <button class="button primary" id="submitBtn">Send & Schedule</button>
    <div id="submitMsg" class="tag" style="margin-top:10px;display:none">Transmission sent ✅</div>
  `}
];

let current = 0;
const store = {};

function renderStepper(){
  const s = document.getElementById('stepper');
  s.innerHTML = steps.map((st, i) => `<div class="step ${i===current?'active':''}">${String(i+1).padStart(2,'0')}</div>`).join('');
}
function renderProgress(){
  const p = document.getElementById('prog');
  p.style.width = ((current)/(steps.length-1))*100 + '%';
}
function renderStep(){
  const w = document.getElementById('wizard');
  w.innerHTML = `<h3>${steps[current].title}</h3>` + steps[current].html;
  renderStepper(); renderProgress();
  const submitBtn = document.getElementById('submitBtn');
  if(submitBtn){
    submitBtn.addEventListener('click', () => {
      document.getElementById('submitMsg').style.display='inline-block';
      alert('Thanks! We will reach out to schedule a call.');
    });
  }
}
function readValues(){
  const w = document.getElementById('wizard');
  const inputs = w.querySelectorAll('input, select, textarea');
  inputs.forEach(el => {
    if(el.type === 'checkbox'){
      if(el.checked){
        if(!store[el.name]) store[el.name] = [];
        if(!store[el.name].includes(el.value)) store[el.name].push(el.value);
      }
    }else{
      store[el.name] = el.value;
    }
  });
}
function renderSummary(){
  const pre = document.getElementById('summary');
  pre.textContent = JSON.stringify(store, null, 2) || 'No inputs yet.';
}
function next(){ readValues(); if(current < steps.length-1) current++; renderStep(); renderSummary(); }
function prev(){ if(current>0) current--; renderStep(); renderSummary(); }

document.addEventListener('DOMContentLoaded', () => {
  renderStep(); renderSummary();
  document.getElementById('nextBtn').addEventListener('click', next);
  document.getElementById('prevBtn').addEventListener('click', prev);
});
