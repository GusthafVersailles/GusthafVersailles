

const fontSets = {

"Bold": {
desc:"Bold style.",
map:{
a:"𝐚",b:"𝐛",c:"𝐜",d:"𝐝",e:"𝐞",f:"𝐟",g:"𝐠",h:"𝐡",i:"𝐢",j:"𝐣",k:"𝐤",l:"𝐥",m:"𝐦",
n:"𝐧",o:"𝐨",p:"𝐩",q:"𝐪",r:"𝐫",s:"𝐬",t:"𝐭",u:"𝐮",v:"𝐯",w:"𝐰",x:"𝐱",y:"𝐲",z:"𝐳"}},

"Italic":{
desc:"Italic style.",
map:{
a:"𝑎",b:"𝑏",c:"𝑐",d:"𝑑",e:"𝑒",f:"𝑓",g:"𝑔",h:"ℎ",i:"𝑖",j:"𝑗",k:"𝑘",l:"𝑙",m:"𝑚",
n:"𝑛",o:"𝑜",p:"𝑝",q:"𝑞",r:"𝑟",s:"𝑠",t:"𝑡",u:"𝑢",v:"𝑣",w:"𝑤",x:"𝑥",y:"𝑦",z:"𝑧"}},

"Bold Italic":{
desc:"Bold italic style.",
map:{
a:"𝒂",b:"𝒃",c:"𝒄",d:"𝒅",e:"𝒆",f:"𝒇",g:"𝒈",h:"𝒉",i:"𝒊",j:"𝒋",k:"𝒌",l:"𝒍",m:"𝒎",
n:"𝒏",o:"𝒐",p:"𝒑",q:"𝒒",r:"𝒓",s:"𝒔",t:"𝒕",u:"𝒖",v:"𝒗",w:"𝒘",x:"𝒙",y:"𝒚",z:"𝒛"}},

"Script":{
desc:"Elegant script style.",
map:{
a:"𝒶",b:"𝒷",c:"𝒸",d:"𝒹",e:"ℯ",f:"𝒻",g:"ℊ",h:"𝒽",i:"𝒾",j:"𝒿",k:"𝓀",l:"𝓁",m:"𝓂",
n:"𝓃",o:"ℴ",p:"𝓅",q:"𝓆",r:"𝓇",s:"𝓈",t:"𝓉",u:"𝓊",v:"𝓋",w:"𝓌",x:"𝓍",y:"𝓎",z:"𝓏"}},

"Bold Script":{
desc:"Bold script style.",
map:{
a:"𝓪",b:"𝓫",c:"𝓬",d:"𝓭",e:"𝓮",f:"𝓯",g:"𝓰",h:"𝓱",i:"𝓲",j:"𝓳",k:"𝓴",l:"𝓵",m:"𝓶",
n:"𝓷",o:"𝓸",p:"𝓹",q:"𝓺",r:"𝓻",s:"𝓼",t:"𝓽",u:"𝓾",v:"𝓿",w:"𝔀",x:"𝔁",y:"𝔂",z:"𝔃"}},

"Fraktur Regular":{
  desc:"Fraktur uppercase.",
  map:{
    a:"𝔄",b:"𝔅",c:"ℭ",d:"𝔇",e:"𝔈",f:"𝔉",g:"𝔊",h:"ℌ",i:"ℑ",j:"𝔍",k:"𝔎",l:"𝔏",
    m:"𝔐",n:"𝔑",o:"𝔒",p:"𝔓",q:"𝔔",r:"ℜ",s:"𝔖",t:"𝔗",u:"𝔘",v:"𝔙",w:"𝔚",x:"𝔛",y:"𝔜",z:"ℨ"
  }},

"Fraktur Bold":{
  desc:"Fraktur uppercase bold.",
  map:{
    a:"𝕬",b:"𝕭",c:"𝕮",d:"𝕯",e:"𝕰",f:"𝕱",g:"𝕲",h:"𝕳",i:"𝕴",j:"𝕵",k:"𝕶",l:"𝕷",
    m:"𝕸",n:"𝕹",o:"𝕺",p:"𝕻",q:"𝕼",r:"𝕽",s:"𝕾",t:"𝕿",u:"𝖀",v:"𝖁",w:"𝖂",x:"𝖃",y:"𝖄",z:"𝖅"
  }},

"Fraktur":{
desc:"Fraktur style.",
map:{
a:"𝔞",b:"𝔟",c:"𝔠",d:"𝔡",e:"𝔢",f:"𝔣",g:"𝔤",h:"𝔥",i:"𝔦",j:"𝔧",k:"𝔨",l:"𝔩",m:"𝔪",
n:"𝔫",o:"𝔬",p:"𝔭",q:"𝔮",r:"𝔯",s:"𝔰",t:"𝔱",u:"𝔲",v:"𝔳",w:"𝔴",x:"𝔵",y:"𝔶",z:"𝔷"}},

"Bold Fraktur":{
desc:"Bold fraktur style.",
map:{
a:"𝖆",b:"𝖇",c:"𝖈",d:"𝖉",e:"𝖊",f:"𝖋",g:"𝖌",h:"𝖍",i:"𝖎",j:"𝖏",k:"𝖐",l:"𝖑",m:"𝖒",
n:"𝖓",o:"𝖔",p:"𝖕",q:"𝖖",r:"𝖗",s:"𝖘",t:"𝖙",u:"𝖚",v:"𝖛",w:"𝖜",x:"𝖝",y:"𝖞",z:"𝖟"}},

"Double Struck":{
desc:"Double struck style.",
map:{
a:"𝕒",b:"𝕓",c:"𝕔",d:"𝕕",e:"𝕖",f:"𝕗",g:"𝕘",h:"𝕙",i:"𝕚",j:"𝕛",k:"𝕜",l:"𝕝",m:"𝕞",
n:"𝕟",o:"𝕠",p:"𝕡",q:"𝕢",r:"𝕣",s:"𝕤",t:"𝕥",u:"𝕦",v:"𝕧",w:"𝕨",x:"𝕩",y:"𝕪",z:"𝕫"}},

"Sans":{
desc:"Sans style.",
map:{
a:"𝖺",b:"𝖻",c:"𝖼",d:"𝖽",e:"𝖾",f:"𝖿",g:"𝗀",h:"𝗁",i:"𝗂",j:"𝗃",k:"𝗄",l:"𝗅",m:"𝗆",
n:"𝗇",o:"𝗈",p:"𝗉",q:"𝗊",r:"𝗋",s:"𝗌",t:"𝗍",u:"𝗎",v:"𝗏",w:"𝗐",x:"𝗑",y:"𝗒",z:"𝗓"}},

"Sans Bold":{
desc:"Sans bold style.",
map:{
a:"𝗮",b:"𝗯",c:"𝗰",d:"𝗱",e:"𝗲",f:"𝗳",g:"𝗴",h:"𝗵",i:"𝗶",j:"𝗷",k:"𝗸",l:"𝗹",m:"𝗺",
n:"𝗻",o:"𝗼",p:"𝗽",q:"𝗾",r:"𝗿",s:"𝘀",t:"𝘁",u:"𝘂",v:"𝘃",w:"𝘄",x:"𝘅",y:"𝘆",z:"𝘇"}},

"Sans Italic":{
desc:"Sans italic style.",
map:{
a:"𝘢",b:"𝘣",c:"𝘤",d:"𝘥",e:"𝘦",f:"𝘧",g:"𝘨",h:"𝘩",i:"𝘪",j:"𝘫",k:"𝘬",l:"𝘭",m:"𝘮",
n:"𝘯",o:"𝘰",p:"𝘱",q:"𝘲",r:"𝘳",s:"𝘴",t:"𝘵",u:"𝘶",v:"𝘷",w:"𝘸",x:"𝘹",y:"𝘺",z:"𝘻"}},

"Sans Bold Italic":{
desc:"Sans bold italic style.",
map:{
a:"𝙖",b:"𝙗",c:"𝙘",d:"𝙙",e:"𝙚",f:"𝙛",g:"𝙜",h:"𝙝",i:"𝙞",j:"𝙟",k:"𝙠",l:"𝙡",m:"𝙢",
n:"𝙣",o:"𝙤",p:"𝙥",q:"𝙦",r:"𝙧",s:"𝙨",t:"𝙩",u:"𝙪",v:"𝙫",w:"𝙬",x:"𝙭",y:"𝙮",z:"𝙯"}},

"Monospace":{
desc:"Monospace style.",
map:{
a:"𝚊",b:"𝚋",c:"𝚌",d:"𝚍",e:"𝚎",f:"𝚏",g:"𝚐",h:"𝚑",i:"𝚒",j:"𝚓",k:"𝚔",l:"𝚕",m:"𝚖",
n:"𝚗",o:"𝚘",p:"𝚙",q:"𝚚",r:"𝚛",s:"𝚜",t:"𝚝",u:"𝚞",v:"𝚟",w:"𝚠",x:"𝚡",y:"𝚢",z:"𝚣"}},

"Circle Filled":{
desc:"Filled circle letters.",
map:{
a:"🅐",b:"🅑",c:"🅒",d:"🅓",e:"🅔",f:"🅕",g:"🅖",h:"🅗",i:"🅘",j:"🅙",k:"🅚",l:"🅛",m:"🅜",
n:"🅝",o:"🅞",p:"🅟",q:"🅠",r:"🅡",s:"🅢",t:"🅣",u:"🅤",v:"🅥",w:"🅦",x:"🅧",y:"🅨",z:"🅩"}},

"Circle Outline":{
desc:"Circle outline letters.",
map:{
a:"ⓐ",b:"ⓑ",c:"ⓒ",d:"ⓓ",e:"ⓔ",f:"ⓕ",g:"ⓖ",h:"ⓗ",i:"ⓘ",j:"ⓙ",k:"ⓚ",l:"ⓛ",m:"ⓜ",
n:"ⓝ",o:"ⓞ",p:"ⓟ",q:"ⓠ",r:"ⓡ",s:"ⓢ",t:"ⓣ",u:"ⓤ",v:"ⓥ",w:"ⓦ",x:"ⓧ",y:"ⓨ",z:"ⓩ"}},

"Squared Filled":{
desc:"Filled square letters.",
map:{
a:"🅰",b:"🅱",c:"🅲",d:"🅳",e:"🅴",f:"🅵",g:"🅶",h:"🅷",i:"🅸",j:"🅹",k:"🅺",l:"🅻",m:"🅼",
n:"🅽",o:"🅾",p:"🅿",q:"🆀",r:"🆁",s:"🆂",t:"🆃",u:"🆄",v:"🆅",w:"🆆",x:"🆇",y:"🆈",z:"🆉"}},

"Squared Outline":{
desc:"Outlined square letters.",
map:{
a:"🄰",b:"🄱",c:"🄲",d:"🄳",e:"🄴",f:"🄵",g:"🄶",h:"🄷",i:"🄸",j:"🄹",k:"🄺",l:"🄻",m:"🄼",
n:"🄽",o:"🄾",p:"🄿",q:"🅀",r:"🅁",s:"🅂",t:"🅃",u:"🅄",v:"🅅",w:"🅆",x:"🅇",y:"🅈",z:"🅉"}},

"Small Caps":{
desc:"Small caps style.",
map:{
a:"ᴀ",b:"ʙ",c:"ᴄ",d:"ᴅ",e:"ᴇ",f:"ꜰ",g:"ɢ",h:"ʜ",i:"ɪ",j:"ᴊ",k:"ᴋ",l:"ʟ",m:"ᴍ",
n:"ɴ",o:"ᴏ",p:"ᴘ",q:"ǫ",r:"ʀ",s:"s",t:"ᴛ",u:"ᴜ",v:"ᴠ",w:"ᴡ",x:"x",y:"ʏ",z:"ᴢ"}},

"Superscript":{
desc:"Superscript characters.",
map:{
a:"ᵃ",b:"ᵇ",c:"ᶜ",d:"ᵈ",e:"ᵉ",f:"ᶠ",g:"ᵍ",h:"ʰ",i:"ᶦ",j:"ʲ",k:"ᵏ",l:"ˡ",m:"ᵐ",
n:"ⁿ",o:"ᵒ",p:"ᵖ",q:"ᵠ",r:"ʳ",s:"ˢ",t:"ᵗ",u:"ᵘ",v:"ᵛ",w:"ʷ",x:"ˣ",y:"ʸ",z:"ᶻ"}},

"Subscript":{
desc:"Subscript characters.",
map:{
a:"ₐ",b:"b",c:"c",d:"d",e:"ₑ",f:"f",g:"g",h:"ₕ",i:"ᵢ",j:"ⱼ",k:"ₖ",l:"ₗ",m:"ₘ",
n:"ₙ",o:"ₒ",p:"ₚ",q:"q",r:"ᵣ",s:"ₛ",t:"ₜ",u:"ᵤ",v:"ᵥ",w:"w",x:"ₓ",y:"y",z:"z"}},

"Upside Down":{
desc:"Upside down text.",
map:{
a:"ɐ",b:"q",c:"ɔ",d:"p",e:"ǝ",f:"ɟ",g:"ƃ",h:"ɥ",i:"ᴉ",j:"ɾ",k:"ʞ",l:"ן",m:"ɯ",
n:"u",o:"o",p:"d",q:"b",r:"ɹ",s:"s",t:"ʇ",u:"n",v:"ʌ",w:"ʍ",x:"x",y:"ʎ",z:"z"}},

"Mirror":{
desc:"Mirrored text.",
map:{
a:"ɒ",b:"d",c:"ɔ",d:"b",e:"ɘ",f:"Ꮈ",g:"ǫ",h:"ʜ",i:"i",j:"ꞁ",k:"ʞ",l:"l",m:"m",
n:"n",o:"o",p:"q",q:"p",r:"ɿ",s:"ꙅ",t:"ƚ",u:"u",v:"v",w:"w",x:"x",y:"y",z:"z"}},

"Zalgo":{
desc:"Glitch text.",
map:{
a:"a̴",b:"b̴",c:"c̴",d:"d̴",e:"e̴",f:"f̴",g:"g̴",h:"h̴",i:"i̴",j:"j̴",k:"k̴",l:"l̴",m:"m̴",
n:"n̴",o:"o̴",p:"p̴",q:"q̴",r:"r̴",s:"s̴",t:"t̴",u:"u̴",v:"v̴",w:"w̴",x:"x̴",y:"y̴",z:"z̴"}}

};


/* ===============================
   ELEMENTOS
================================ */

const selector = document.getElementById('fontSelector');
const input = document.getElementById('inputText');
const output = document.getElementById('outputText');
const desc = document.getElementById('fontDescription');
const zoomRange = document.getElementById('zoomRange');
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

/* ===============================
   CONVERSÃO
================================ */

Object.keys(fontSets).forEach(name => {
  const opt = document.createElement('option');
  opt.value = name;
  opt.textContent = name;
  selector.appendChild(opt);
});

function convert() {
  const font = fontSets[selector.value];
  desc.textContent = font.desc;
  let result = '';
  for (const char of input.value) {
    result += font.map[char.toLowerCase()] || char;
  }
  output.textContent = result;
}

function copyText() {
  if (!output.textContent) return;
  navigator.clipboard.writeText(output.textContent);
  alert('Texto copiado.');
}

function resetText() {
  input.value = '';
  output.textContent = '';
}

zoomRange.oninput = () => {
  output.style.fontSize = zoomRange.value + 'px';
};

document.querySelectorAll('[data-align]').forEach(btn => {
  btn.onclick = () => output.style.textAlign = btn.dataset.align;
});

/* ===============================
   TOGGLE TEMA COM ÍCONES
================================ */

function applyTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light', isLight);
  themeIcon.src = isLight ? "assets/sun.png" : "assets/moon.png";
  themeIcon.alt = isLight ? "Modo claro" : "Modo escuro";
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeBtn.onclick = () => {
  const nextTheme = document.body.classList.contains('light') ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('theme', nextTheme);
};

input.addEventListener('input', convert);
selector.addEventListener('change', convert);
convert();
