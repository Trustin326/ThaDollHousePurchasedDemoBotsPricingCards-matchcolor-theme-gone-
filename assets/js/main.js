const BOT_DATA = window.BOT_DATA || {};
function $(s,r=document){return r.querySelector(s);}
function typeInto(el,text,speed=10){el.textContent="";return new Promise(res=>{let i=0;const t=setInterval(()=>{el.textContent+=text[i++];if(i>=text.length){clearInterval(t);res();}},speed);});}
function smartReply(botName,featureName,userText){
  const now=new Date().toLocaleString();
  const bullets=arr=>arr.map(x=>"• "+x).join("\n");
  const bank={
    BizBot:["Pick 1 niche, 1 promise, 1 deliverable.","Use a 3-step funnel: free → $39 → upsell.","Make the hook outcome-first."],
    SellerPro:["Lead with outcome, stack bonuses.","Handle time/skill/trust objections.","Use simple 3-tier pricing."],
    CoachAI:["Consistency beats intensity.","Tie habits to triggers.","Review weekly and adjust."],
    PromoPix:["Start with a bold hook.","Use broad+niche+hyper-niche hashtags.","Batch create content weekly."],
    DesignDiva:["Use 2 fonts max.","Gold as accent only.","Repeat spacing for premium feel."],
    GlamBot:["Confident luxe voice.","Signature element: color + accessory.","3-step routines win."],
    ChefGenie:["Hero ingredient + aromatics + bright finish.","Luxury plating, simple prep.","Batch sauces and grains."],
    WriterSX:["Write bullets first, headline last.","Short paragraphs convert.","Repurpose one idea many ways."]
  };
  const tips=(bank[botName]||["Be specific.","Keep it simple.","Add a clear CTA."]).sort(()=>Math.random()-0.5).slice(0,3);
  return `[${botName} • ${featureName}]  (${now})\n\nYou said:\n"${(userText||"").trim()||"(no input)"}"\n\nHere’s a polished output you can use right now:\n\n1) Action Plan\n${bullets(tips)}\n\n2) Ready-to-copy Draft\n${bullets(["Hook: "+(((userText||"")||"A premium solution that saves time and increases income.").slice(0,60))+"…","Value: 3 fast wins + a simple next step.","CTA: Click Buy to unlock the full bot + templates."])}\n\n3) Next Step\n• Tell me your niche + your offer price and I’ll tailor the final version.`;
}
function initBotPage(){
  const bot=document.body.dataset.bot;
  const data=BOT_DATA[bot]; if(!data) return;
  document.body.style.background=data.bg||"#f6f2ea";
  if((data.bg||"").toLowerCase()==="#000000"||(data.bg||"").toLowerCase()==="#0b0b0f") document.body.classList.add("dark");
  const featWrap=$("#features"); featWrap.innerHTML="";
  data.features.forEach(([n,d])=>{const div=document.createElement("div");div.className="feature";div.innerHTML=`<div class="t">${n}</div><div class="d">${d}</div>`;featWrap.appendChild(div);});
  const sel=$("#sampleSelect"); sel.innerHTML="";
  Object.keys(data.samples).forEach(k=>{const o=document.createElement("option");o.value=k;o.textContent=k;sel.appendChild(o);});
  const prompt=$("#prompt"), featureName=$("#featureName");
  function apply(){featureName.textContent=sel.value;prompt.value=data.samples[sel.value]||"";}
  sel.addEventListener("change",apply); apply();
  let mode="chat";
  const btnChat=$("#modeChat"), btnFeat=$("#modeFeature"), output=$("#output"), run=$("#runBtn"), clear=$("#clearBtn");
  const hint=$("#modeHint");
  function setMode(m){mode=m;btnChat.classList.toggle("active",m==="chat");btnFeat.classList.toggle("active",m==="feature");hint.textContent=m==="chat"?"Chat Mode (typed response)":"Feature Mode (instant formatted output)";}
  btnChat.addEventListener("click",()=>setMode("chat"));
  btnFeat.addEventListener("click",()=>setMode("feature"));
  setMode("chat");
  run.addEventListener("click",async ()=>{run.disabled=true;const reply=smartReply(data.name,sel.value,prompt.value||""); if(mode==="chat") await typeInto(output,reply,10); else output.textContent=reply; run.disabled=false;});
  clear.addEventListener("click",()=>{output.textContent="";});
}
document.addEventListener("DOMContentLoaded",initBotPage);
