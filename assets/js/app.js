/* ══════════════════ image paths ══════════════════ */
const IMG_POSTER   = "assets/img/poster.jpg";
const IMG_TIMELINE = "assets/img/timeline.jpg";
const IMG_TIMETABLE = "assets/img/timetable.jpg";
const IMG_LAYOUT   = "assets/img/layout.jpg";
const IMG_LOGO     = "assets/img/logo.png";
const IMG_GHMF     = "assets/img/ghmf.png";
const IMG_JKC      = "assets/img/artist-jackingcong.jpg";
const IMG_COUNTRY  = "assets/img/artist-country-gongbang.jpg";
const IMG_ADIOS    = "assets/img/artist-adios-audio.jpg";
const IMG_WILD     = "assets/img/artist-wild-crew.jpg";
const IMG_HISPOP   = "assets/img/artist-hispop.jpg";
const IMG_TONER    = "assets/img/artist-toner.jpg";

/* ══════════════════ assets ══════════════════ */
const SNS = {
 instagram:"https://www.instagram.com/gimhaemusicfestival_salmon/",
 youtube  :"https://www.youtube.com/@GHMF2006"
};
const IC_IG='<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2.5" y="2.5" width="19" height="19" rx="5.4"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none"/></svg>';
const IC_YT='<svg width="27" height="27" viewBox="0 0 24 24" fill="none"><rect x="2" y="4.8" width="20" height="14.4" rx="4.2" stroke="currentColor" stroke-width="1.8"/><path d="M10.2 9.3v5.4l4.7-2.7z" fill="currentColor"/></svg>';

const IMGMAP={A_JKC:IMG_JKC,A_COUNTRY:IMG_COUNTRY,A_ADIOS:IMG_ADIOS,A_WILD:IMG_WILD,A_HISPOP:IMG_HISPOP,A_TONER:IMG_TONER};
document.getElementById("brandLogo").src=IMG_LOGO;
document.getElementById("footLogo").src=IMG_LOGO;

const GALLERY=[
 {y:"2025",t:"제20회 · 태극전 메인스테이지",d:"정홍일 밴드 피날레"},
 {y:"2025",t:"제20회 · 철광산갤러리",d:"다무대 운영 첫 시도"},
 {y:"2025",t:"제20회 · 수로공연장",d:"낮 시간 어쿠스틱 라인"},
 {y:"2024",t:"제19회 · 한·일·중 팝 콘서트",d:"동아시아문화도시 연계"},
 {y:"2023",t:"제18회 · YB 무대",d:"역대 최대 관객"},
 {y:"2022",t:"제17회 · 바크하우스",d:"안준우 프로젝트 · 해머링"},
 {y:"2018",t:"제13회 · 와일드크루 첫 무대",d:"이후 평창 동계올림픽 개회식으로"},
 {y:"2016",t:"제11회 · 축제명 확정",d:"김해뮤직페스티벌 「연어」"},
 {y:"2011",t:"제6회 · 멜로망스",d:"데뷔 전 이 무대에 섰습니다"}
];

/* ══════════════════ store ══════════════════ */
const KEY="ghmf21.v2";
function load(){ try{const r=localStorage.getItem(KEY); if(r) return JSON.parse(r);}catch(e){} return JSON.parse(JSON.stringify(SEED)); }
function save(){ try{localStorage.setItem(KEY,JSON.stringify(DB));}catch(e){} }
let DB=load();

/* ══════════════════ util ══════════════════ */
const $=(s,r)=>(r||document).querySelector(s);
const $$=(s,r)=>Array.from((r||document).querySelectorAll(s));
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function br(s){return esc(s).replace(/\n/g,"<br>");}
function isNew(d){const t=new Date(d).getTime();return !isNaN(t)&&(Date.now()-t)<1000*60*60*24*30;}
function toast(m){const n=document.createElement("div");n.className="toast";n.textContent=m;document.body.appendChild(n);setTimeout(()=>n.remove(),2200);}
const IC_SEARCH='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>';
const IC_PLAY='<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>';
const IC_ARROW='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>';

/* ══════════════════ poster texture ══════════════════ */
const TONE={
 o :{bg:"#ED6C0D",blob:["#DE5604","#F5A323"],scr:["#FBC276","#B94403"]},
 g :{bg:"#143C24",blob:["#08210F","#27593A"],scr:["#55A175","#03130A"]},
 p :{bg:"#511B86",blob:["#1D2088","#7A1B94"],scr:["#BE72E0","#26105A"]},
 d :{bg:"#12100F",blob:["#1E1512","#2A1C14"],scr:["#5A4234","#0A0807"]}
};
function rng(seed){let s=seed>>>0;return()=>(s=(s*1664525+1013904223)>>>0)/4294967296;}
function paint(cv,tone,seed,opt){
 opt=opt||{};
 const box=cv.getBoundingClientRect();
 const W=Math.max(320,Math.round(box.width)), H=Math.max(200,Math.round(box.height));
 const dpr=Math.min(window.devicePixelRatio||1,2);
 cv.width=W*dpr; cv.height=H*dpr;
 const x=cv.getContext("2d"); x.setTransform(dpr,0,0,dpr,0,0);
 const T=TONE[tone]||TONE.d, r=rng(seed);

 x.fillStyle=T.bg; x.fillRect(0,0,W,H);
 [[0.80,0.24,0.62,T.blob[0],.50],[0.14,0.78,0.56,T.blob[1],.26],[0.66,0.92,0.44,T.blob[0],.34]]
  .forEach(([fx,fy,fr,c,a])=>{
   const cx=W*fx, cy=H*fy, rr=Math.max(W,H)*fr;
   const g=x.createRadialGradient(cx,cy,rr*.55,cx,cy,rr);
   g.addColorStop(0,c); g.addColorStop(1,"rgba(0,0,0,0)");
   x.globalAlpha=a; x.fillStyle=g; x.beginPath(); x.arc(cx,cy,rr,0,7); x.fill();
  });
 x.globalAlpha=1;

 const dens=opt.dens||1;
 const clusters=Math.round((W*H)/34000*dens);
 x.lineCap="round";
 for(let c=0;c<clusters;c++){
  const cx=r()*W*1.2-W*.1, cy=r()*H*1.16-H*.08;
  const w=60+r()*180, h=Math.max(140,H*(.22+r()*.55));
  x.strokeStyle=r()>.4?T.scr[0]:T.scr[1];
  x.globalAlpha=(0.05+r()*0.115)*(opt.fade||1);
  x.lineWidth=1+r()*1.9;
  x.save(); x.translate(cx,cy); x.rotate((r()-.5)*.6);
  const passes=16+Math.floor(r()*26);
  for(let p=0;p<passes;p++){
   x.beginPath();
   const x0=(r()-.5)*w; let yy=-h/2; x.moveTo(x0,yy);
   const steps=10+Math.floor(r()*13);
   for(let s=0;s<steps;s++){ yy+=h/steps; x.lineTo(x0+(r()-.5)*w*.9,yy); }
   x.stroke();
  }
  x.restore();
 }
 if(opt.wash!==false){
  const lw=x.createLinearGradient(0,0,W*.95,H*.6);
  lw.addColorStop(0,"rgba(0,0,0,.24)"); lw.addColorStop(.6,"rgba(0,0,0,.08)"); lw.addColorStop(1,"rgba(0,0,0,0)");
  x.globalAlpha=1; x.fillStyle=lw; x.fillRect(0,0,W,H);
 }
}
let RO=null;
function paintAll(){
 $$("canvas[data-tone]").forEach(cv=>{
  paint(cv, cv.dataset.tone, +cv.dataset.seed, {dens:+cv.dataset.dens||1, fade:+cv.dataset.fade||1, wash:cv.dataset.wash!=="0"});
 });
}
function texWatch(){
 if(RO) RO.disconnect();
 try{
  RO=new ResizeObserver(()=>{ clearTimeout(window.__rt); window.__rt=setTimeout(paintAll,120); });
  $$("canvas[data-tone]").forEach(cv=>RO.observe(cv));
 }catch(e){ window.addEventListener("resize",()=>{clearTimeout(window.__rt);window.__rt=setTimeout(paintAll,150);}); }
}
const TEX=(tone,seed,extra)=>`<canvas data-tone="${tone}" data-seed="${seed}"${extra||""}></canvas>`;

/* ══════════════════ partials ══════════════════ */
function pagehead(tone,seed,kicker,title,lead){
 return `<div class="pagehead tex">${TEX(tone,seed,' data-dens="0.8" data-fade="0.85"')}<div class="wrap">
   <div class="lbl">${esc(kicker)}</div>
   <h1>${esc(title)}</h1>
   ${lead?`<p>${esc(lead)}</p>`:""}
 </div></div>`;
}
function artCard(a){
 const src=a.img&&IMGMAP[a.img];
 const top=src
  ?`<div class="ph"><img src="${src}" alt="${esc(a.name)}"><span class="tag">${esc(a.st.split(" ").slice(0,2).join(" "))}</span></div>`
  :`<div class="empty">프로필 사진 준비 중</div>`;
 return `<article class="art">${top}<div class="b">
   ${a.en?`<div class="en">${esc(a.en)}</div>`:""}
   <h3>${esc(a.name)}</h3>
   <div class="gr">${esc(a.gr)}</div>
   <p>${esc(a.d)}</p>
 </div></article>`;
}
function boardRows(type,list){
 if(!list.length) return `<div class="empty">등록된 게시물이 없습니다.</div>`;
 return `<div class="board">
  <div class="brow bhead"><span>No</span><span>Title</span><span>Date</span><span>Views</span></div>
  ${list.map((it,i)=>`<a class="brow" href="#/post/${type}/${it.id}">
    <span class="no">${it.pin?'<b style="color:var(--orange-lift)">고정</b>':list.length-i}</span>
    <span class="ti">${esc(it.title)}${isNew(it.date)?'<span class="new">NEW</span>':""}</span>
    <span class="dt">${esc(it.date)}${it.writer?" · "+esc(it.writer):""}</span>
    <span class="hit">${esc(it.hit||0)}</span>
  </a>`).join("")}</div>`;
}
function cycBlock(){
 return `<div class="cyc">${STAGES.map(s=>`<div class="c">
   <div class="en">${esc(s.en)}</div>
   <h3>${esc(s.k)} <em>${esc(s.h)}</em></h3>
   <p style="color:var(--tx);font-weight:600;font-size:14.5px;margin-top:9px">${esc(s.t)}</p>
   <p>${esc(s.d)}</p>
   <div class="who">${esc(s.who)}</div>
 </div>`).join("")}</div>`;
}

/* ══════════════════ pages ══════════════════ */
function boothOpen(){ return Date.now() < new Date("2026-09-24T00:00:00+09:00").getTime(); }
function pgHome(){
 return `
 <section class="hero tex">${TEX("o",11,' data-dens="0.9"')}
   <div class="heroin">
     <div>
       <div class="ed">21st Gimhae Music Festival · 2026</div>
       <h1>숲은 연어를 키우고,<br>연어는 숲을 만든다</h1>
       <p class="sub">2006년 시민을 위한 작은 퓨전콘서트로 시작해 스물한 번째. 김해에서 노래를 시작한 사람이 더 큰 무대로 나갔다가, 다시 이 강으로 돌아와 다음 세대를 남기는 하루.</p>
       <div class="meta">
         <span class="chip"><b>10.17</b> SAT</span>
         <span class="chip">봉황대공원</span>
         <span class="chip"><b>AM 10 – PM 10</b></span>
         <span class="chip">전면 <b>무료</b> · 전 연령</span>
       </div>
       <div class="cta">
         ${boothOpen()?`<a class="btn p" href="${BOOTH_FORM}" target="_blank" rel="noopener" data-ev="booth_form_click">부스 신청 · 9/23 마감 ${IC_ARROW}</a>`:""}
         <a class="btn ${boothOpen()?"g":"p"}" href="#/program">타임테이블 · 라인업 ${boothOpen()?"":IC_ARROW}</a>
         <a class="btn g" href="guide/">관람 안내</a>
       </div>
     </div>
     <div class="posterbox"><img src="${IMG_POSTER}" alt="제21회 김해뮤직페스티벌 연어 포스터"></div>
   </div>
 </section>

 <section class="blk"><div class="wrap">
   <div class="grid g4">
     <div class="stat"><div class="v">21</div><div class="k">회차 · 2006년부터<br>한 해도 거르지 않았습니다</div></div>
     <div class="stat"><div class="v">20</div><div class="k">년 연속<br>민간 주도 운영</div></div>
     <div class="stat"><div class="v">제2호</div><div class="k">국가지정 사적<br>봉황동유적</div></div>
     <div class="stat"><div class="v">1,500<span style="font-size:22px">+</span></div><div class="k">매년 무료 관람객<br>2016년 제11회 이후</div></div>
   </div>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Line-up</div><h2>메인스테이지 7팀</h2></div>
   <p class="slead">라인업을 장르로 나누지 않고 연어의 생애주기로 편성합니다. 무대의 순서가 곧 지역 음악 생태계의 순환 구조입니다.</p>
   <div class="grid g3" style="margin-top:32px">${LINEUP.slice(0,3).map(artCard).join("")}</div>
   <div style="margin-top:24px"><a class="btn g" style="border-color:var(--line-2);color:var(--tx-2)" href="#/program">전체 라인업 · 당일 진행 ${IC_ARROW}</a></div>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Cycle</div><h2>연어는 라인업이 아니라 경로를 만듭니다</h2></div>
   <p class="slead">「여기 서면 어디로 갈 수 있는가」 — 21년째 같은 이야기를 반복하는 것이 연어의 유일한 자산입니다.</p>
   <div style="margin-top:38px">${cycBlock()}</div>
   <div class="note" style="margin-top:34px;max-width:840px">
     <p><strong>올해 ①에 섰던 사람이 3년 뒤 ③에 서고, 5년 뒤 ④를 맡습니다.</strong><br>
     성과는 이 문장이 실제로 몇 명에게 일어났는지로 측정됩니다.</p>
   </div>
 </div></section>

 <section class="blk tex">${TEX("g",33,' data-dens="0.55" data-fade="0.7"')}<div class="wrap">
   <div class="boothband tex">${TEX("g",34,' data-dens="0.9"')}
     <div class="in">
       <div>
         <div class="lbl" style="color:#9ED8B6">Booth Recruit · 9.17 – 9.23</div>
         <h2 style="margin-top:12px">연어는 무대에만 서지 않습니다</h2>
         <p>물건을 파는 자리를 넘어, 함께 순환할 부스를 찾습니다. 체험·공예 / 마켓·푸드 / 전시·캠페인, 그리고 치어 · 회귀 · 산란 세 개의 스토리존.</p>
       </div>
       <a class="btn p" href="#/booth">모집 요강 보기 ${IC_ARROW}</a>
     </div>
   </div>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Channels</div><h2>연어의 소식을 가장 먼저</h2></div>
   <p class="slead">라인업 확정·부스 모집·당일 현장은 두 채널에서 먼저 올라옵니다.</p>
   <div class="chan" style="margin-top:32px">
     <a href="${SNS.instagram}" target="_blank" rel="noopener">
       <span class="ic">${IC_IG}</span>
       <span class="tx">
         <b>인스타그램</b>
         <span>@gimhaemusicfestival_salmon</span>
         <small>포스터 · 출연진 공개 · 부스 모집 공고 · 현장 스케치</small>
       </span>
       <span class="go">${IC_ARROW}</span>
     </a>
     <a href="${SNS.youtube}" target="_blank" rel="noopener">
       <span class="ic">${IC_YT}</span>
       <span class="tx">
         <b>유튜브</b>
         <span>@GHMF2006</span>
         <small>역대 공연 영상 · 100인의 연어 아카이브 · 하이라이트</small>
       </span>
       <span class="go">${IC_ARROW}</span>
     </a>
   </div>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Notice</div><h2>공지사항</h2></div>
   <div style="margin-top:26px">${boardRows("notices",DB.notices.slice(0,5))}</div>
   <div style="margin-top:20px"><a class="btn g" style="border-color:var(--line-2);color:var(--tx-2)" href="#/info/notice">전체 보기</a></div>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">21 Years</div><h2>연어가 걸어온 길</h2></div>
   <div class="imgbox" style="margin-top:26px"><a href="${IMG_TIMELINE}" target="_blank" rel="noopener" title="크게 보기"><img src="${IMG_TIMELINE}" alt="연어 21년 연혁 타임라인"></a></div>
   <p class="cap">2006년 제1회부터 2025년 제20회까지의 연혁 아카이브. 회차별 상세는 행사소개 페이지에서 볼 수 있습니다.</p>
 </div></section>`;
}

function pgAbout(){
 return pagehead("g",21,"About","행사소개","제21회 김해뮤직페스티벌 연어 · 2026.10.17.(토) 김해 봉황대공원")+`
 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Meaning</div><h2>왜 연어인가</h2></div>
   <div style="margin-top:24px;max-width:780px;color:var(--tx-2);font-size:16px">
     <p>연어는 태어난 강을 떠나 바다에서 자란 뒤, 다시 모천으로 돌아옵니다. 돌아온 연어의 몸은 강 주변 생태계의 거름이 되어 다음 세대를 키웁니다.</p>
     <p style="margin-top:18px">김해에서 노래를 시작한 사람이 바다(더 큰 무대)로 나갔다가, 다시 이 강으로 돌아와 다음 세대를 남기는 것. 그것이 21년째 연어가 반복해온 유일한 이야기입니다.</p>
   </div>
   <div class="note" style="margin-top:30px;max-width:820px">
     <p><strong>숲은 연어를 키우고, 연어는 숲을 만든다</strong><br>
     연어가 숲의 양분이 되고, 숲이 다시 연어를 키우는 상호부양 관계 — 탁광일, 『숲은 연어를 키우고 연어는 숲을 만든다』(넥서스, 2003)에서 가져온 은유입니다. 20회에서 「연어가 숲을 만듭니다」로 축제 철학을 정립했다면, 21회는 그 문장을 되돌려 놓습니다. 숲이 먼저 연어를 키웠기 때문에 연어가 숲을 만들 수 있었습니다.</p>
   </div>
 </div></section>

 <section class="blk tex">${TEX("d",22,' data-dens="0.6"')}<div class="wrap">
   <div class="shead"><div class="lbl">Place</div><h2>왜 봉황대인가</h2></div>
   <p class="slead">2천 년 전부터 나가고 돌아오던 자리.</p>
   <div class="grid g3" style="margin-top:30px">
     <div class="card"><h3>금관가야의 왕궁지</h3><p>봉황동유적은 금관가야의 왕궁이 있던 자리이자 대외 교역항이었습니다. 국가지정 사적 제2호입니다.</p></div>
     <div class="card"><h3>회귀와 교류의 지층</h3><p>중국 왕망대 화폐와 일본 야요이 토기가 함께 출토되었습니다. 사람과 물건이 나가고 돌아오던 항구였다는 증거입니다.</p></div>
     <div class="card"><h3>서사가 겹치는 무대</h3><p>연어의 회귀 서사와 장소의 역사가 처음으로 정확히 겹칩니다. 장소를 빌린 것이 아니라 장소의 이야기 위에 축제를 얹었습니다.</p></div>
   </div>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Overview</div><h2>개요</h2></div>
   <div class="scroller" style="margin-top:26px"><table class="tbl"><tbody>
     <tr><td class="k">행사명</td><td><b>제21회 김해뮤직페스티벌 연어</b></td></tr>
     <tr><td class="k">슬로건</td><td>숲은 연어를 키우고, 연어는 숲을 만든다</td></tr>
     <tr><td class="k">일시</td><td>2026. 10. 17.(토) AM 10 ~ PM 10</td></tr>
     <tr><td class="k">장소</td><td>김해 봉황대공원 (김해시 봉황동 465) <span class="badge">국가지정 사적 제2호</span></td></tr>
     <tr><td class="k">관람</td><td>전면 무료 · 전 연령 · 사전 신청 없음</td></tr>
     <tr><td class="k">주최</td><td>사회적협동조합 김해문화네트워크 · 사단법인 맥커뮤니티</td></tr>
     <tr><td class="k">주관</td><td>주식회사 엠에이사이트 · 음악이주는선물 · PLP · 인제대학교 글로컬사업단</td></tr>
     <tr><td class="k">협력</td><td>김해시 · 김해대학교 · 스튜디오우아 · 문화기획사 동행 · 모먼츠 · 소리나무 · 자연음미 · 경남음악창작소 뮤지시스 · (주)그린임팩트</td></tr>
     <tr><td class="k">구성</td><td>메인스테이지 7팀 · 부스 20동 · 김해시청소년축제 뛰어락</td></tr>
   </tbody></table></div>
   <p class="cap">봉황대공원(봉황동유적)은 국가지정 사적입니다. 무대·부스 등 시설물 설치는 문화재 현상변경 허가 절차에 따라 진행합니다.</p>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">History</div><h2>21년의 기록</h2></div>
   <p class="slead">2006년 「김해시민을 위한 퓨전콘서트」로 출발해 21회. 명칭은 여러 번 바뀌었지만 한 해도 거르지 않았습니다.</p>
   <div class="river" style="margin-top:34px;max-width:840px">
     ${HISTORY.map(h=>`<div class="node"><div class="yr">${esc(h.y)}</div><h4>${esc(h.t)}</h4><p>${esc(h.d)}</p></div>`).join("")}
   </div>
   <div class="imgbox" style="margin-top:30px"><a href="${IMG_TIMELINE}" target="_blank" rel="noopener" title="크게 보기"><img src="${IMG_TIMELINE}" alt="연어 연혁 타임라인"></a></div>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Site Plan</div><h2>행사장 배치</h2></div>
   <p class="slead">봉황대공원 잔디마당(A)과 가야의길 광장(B), 두 구역에서 열립니다. 부스는 행사장 바깥 테두리를 따라 단열로 배치해 부스에 앉아서도 무대가 보이도록 했습니다.</p>
   <div class="imgbox" style="margin-top:26px"><a href="${IMG_LAYOUT}" target="_blank" rel="noopener"><img src="${IMG_LAYOUT}" alt="제21회 연어 행사장 배치도 — 잔디마당 A존과 가야의길 광장 B존"></a></div>
   <p class="cap">일러스트 배치도 · 이미지를 누르면 크게 볼 수 있습니다. 세부 배치는 문화재 현상변경 허가와 현장 실측 결과에 따라 조정될 수 있습니다.</p>
   <div class="grid g2" style="margin-top:28px">
     <div class="card"><div class="lbl">Zone A · 잔디마당</div><h3 style="margin-top:9px">메인스테이지와 부스</h3><p>STAGE A 메인무대 · 객석 · FOH(콘솔부스) · 인제대 홍보부스 · 뮤직마켓 · 드로잉존 · 종합상황실 · 웰컴게이트·등록</p></div>
     <div class="card"><div class="lbl">Zone B · 가야의길 광장</div><h3 style="margin-top:9px">청소년축제 뛰어락</h3><p>STAGE B 청소년축제 뛰어락 · 객석 · 출연진 대기부스 · 부스. 가야의길 쪽에서 들어오면 가장 먼저 만나는 무대입니다.</p></div>
     <div class="card"><h3>주 출입구</h3><p>북동쪽 주차장(분성로) 방면 웰컴게이트. 등록과 안내를 이곳에서 합니다.</p></div>
     <div class="card"><h3>보조 출입구 · 구역 이동</h3><p>서쪽 가야의길에서 B존으로 들어올 수 있습니다. A존과 B존은 남서쪽 산책로로 이어지며 경사 구간이 있어 야간에는 조명과 안내 인력을 배치합니다.</p></div>
   </div>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Access</div><h2>무장애 관람 안내</h2></div>
   <div class="note p" style="margin-top:24px;max-width:800px">
     <p><strong>「무장애 축제입니다」라고 말하지 않습니다.</strong><br>
     봉황대공원은 구릉 지형으로 입구와 내부에 계단 구간이 있습니다. 올해 21회를 1년차 기준선으로 삼고, 접근 가능한 구역과 접근이 어려운 구역을 사전에 함께 공개합니다.</p>
   </div>
   <div class="grid g4" style="margin-top:24px">
     <div class="card"><h3>배치</h3><p>휠체어·유아차 관람석을 객석 최후열 측면 평지에 지정 배치합니다.</p></div>
     <div class="card"><h3>수어통역</h3><p>무대 정면 수어통역을 상시 배치합니다.</p></div>
     <div class="card"><h3>안내 인력</h3><p>무장애 안내 인력을 지정 배치해 이동을 지원합니다.</p></div>
     <div class="card"><h3>사전 공개</h3><p>접근 경로·경사·화장실 위치를 D-25에 온라인으로 공개합니다.</p></div>
   </div>
 </div></section>`;
}

function pgProgram(tab){
 const T=tab||"salmon";
 const tabs=[["salmon","김해뮤직페스티벌 연어"],["moyeorak","김해시청소년축제 뛰어락"],["market","아트마켓 & 로컬 체험부스"]];
 let body="";

 if(T==="salmon"){
  body=`
   <div class="shead"><div class="lbl">Main Stage</div><h2>메인스테이지 7팀</h2></div>
   <p class="slead">① 치어 1팀 · ③ 회귀 6팀. 추천·공모 팀은 협의·선정 후 순차 공개합니다.</p>
   <div class="grid g3" style="margin-top:32px">${LINEUP.map(artCard).join("")}</div>

   <h2 style="margin-top:68px;font-size:28px">타임테이블</h2>
   <div class="imgbox" style="margin-top:22px"><a href="${IMG_TIMETABLE}" target="_blank" rel="noopener"><img src="${IMG_TIMETABLE}" alt="제21회 김해뮤직페스티벌 연어 타임테이블 — STAGE A 14:00 김해청소년밴드부터 20:30 잭킹콩까지"></a></div>
   <h2 style="margin-top:48px;font-size:24px">시간대별 진행</h2>
   <div class="day" style="margin-top:28px;max-width:860px">
     ${DAY.map(r=>`<div class="r">
       <div class="t">${esc(r[0])}</div>
       <h4>${esc(r[1])}</h4>
       <p>${esc(r[2])}</p>
       <p style="color:var(--tx-3);font-size:13px;margin-top:4px">${esc(r[3])}</p>
     </div>`).join("")}
   </div>
   <p class="cap">세부 시간은 출연진 확정 및 현장 리허설 일정에 따라 조정될 수 있습니다.</p>

   <div class="note" style="margin-top:40px;max-width:840px">
     <p><strong>시그니처 모먼트 — 마지막 무대.</strong><br>
     청소년 밴드 전원이 귀향 아티스트와 함께 한 곡을 연주합니다. ① 치어와 ③ 회귀가 같은 무대에 서는 3분이, 이 축제가 21년간 말해온 문장의 실물입니다.</p>
   </div>`;
 }

 if(T==="moyeorak"){
  body=`
   <div class="shead"><div class="lbl">Youth</div><h2>김해시청소년축제 뛰어락</h2></div>
   <p class="slead">같은 날, 같은 공간. 「오늘의 관객이 내일의 연어」 — 순환의 첫 단계인 ① 치어 트랙이 여기서 시작됩니다.</p>
   <div class="grid g3" style="margin-top:32px">
     <div class="card"><div class="lbl">01</div><h3 style="margin-top:9px">정식 라인업 편성</h3><p>청소년 밴드를 오프닝이 아니라 정식 라인업으로 편성합니다. 하루의 첫 정식 무대(13:00)를 청소년에게 배정합니다.</p></div>
     <div class="card"><div class="lbl">02</div><h3 style="margin-top:9px">동일 조건 적용</h3><p>정식 사운드체크를 받고, 출연료를 지급합니다. 「경험 삼아 서보는 자리」와 「무대에 서는 일」은 다릅니다.</p></div>
     <div class="card"><div class="lbl">03</div><h3 style="margin-top:9px">멘토링 세션</h3><p>16:00 전환 시간에 메인스테이지 출연진과 청소년 팀이 만나는 멘토링 세션을 배치합니다.</p></div>
     <div class="card"><div class="lbl">04</div><h3 style="margin-top:9px">합동 무대</h3><p>20:00 마지막 무대에서 청소년 밴드 전원이 귀향 아티스트와 함께 한 곡을 연주합니다.</p></div>
     <div class="card"><div class="lbl">05</div><h3 style="margin-top:9px">청소년 기획단</h3><p>공연뿐 아니라 운영에도 참여합니다. 서포터즈 → 실행 크루로 이어지는 경로를 청소년에게도 동일하게 엽니다.</p></div>
     <div class="card"><div class="lbl">06</div><h3 style="margin-top:9px">협력</h3><p>김해시청소년센터 · 김해청년다옴과 공동 기획하며, 김해청소년밴드가 메인스테이지 라인업에 포함됩니다.</p></div>
   </div>
   <div class="note g" style="margin-top:36px;max-width:840px">
     <p><strong>제6회(2011)의 사례.</strong><br>
     데뷔 전의 멜로망스가 이 무대에 섰고, 이후 KBS 「Top Band 시즌2」에 출연했습니다. 그때 그 자리를 만들어 준 것이 이 축제였다는 사실이, 지금 청소년 트랙에 예산과 정식 무대를 배정하는 이유입니다.</p>
   </div>`;
 }

 if(T==="market"){
  body=`
   <div class="shead"><div class="lbl">Market</div><h2>아트마켓 &amp; 로컬 체험부스</h2></div>
   <p class="slead">부스 20동 · AM 10 ~ PM 8 운영. 김해·경남 지역 창작자, 공방, 사회적경제 조직, 이주민 셀러가 참여합니다.</p>
   <div class="imgbox" style="margin-top:28px"><a href="${IMG_LAYOUT}" target="_blank" rel="noopener"><img src="${IMG_LAYOUT}" alt="아트마켓 배치도"></a></div>
   <p class="cap">일러스트 배치도 — 부스를 마주보게 두지 않고, 행사장 바깥 테두리를 따라 단열로 배치했습니다.</p>
   <div class="grid g2" style="margin-top:36px;max-width:960px">
     <div class="card"><h3>부스에서도 무대가 보입니다</h3><p>부스를 마주보게 배치하면 셀러는 하루 종일 무대를 등지고 앉습니다. 바깥 테두리 단열 배치로 셀러도 관객이 되도록 했습니다.</p></div>
     <div class="card"><h3>다회용기 운영</h3><p>식음 구역에 다회용기와 반납처를 운영합니다. 지난 회 피드백을 반영해 반납처를 분산 배치합니다.</p></div>
     <div class="card"><h3>체험부스</h3><p>지역 공방·창작자의 원데이 체험 프로그램. 만든 것을 가져갈 수 있는 구성을 우선합니다.</p></div>
     <div class="card"><h3>임팩트 측정</h3><p>신청서에 평시 매출·판매 채널 문항이 포함됩니다. 축제가 셀러에게 실제로 얼마나 도움이 되었는지를 「연어 로컬임팩트 분석」으로 공개합니다. 개별 매출은 공개하지 않습니다.</p></div>
   </div>
   <div style="margin-top:36px"><a class="btn p" href="#/booth">부스 운영팀 모집 요강 ${IC_ARROW}</a></div>`;
 }

 return pagehead("o",23,"Program","프로그램","메인스테이지 · 청소년축제 · 아트마켓이 같은 날, 같은 공간에서 열립니다.")+`
 <section class="blk"><div class="wrap">
   <div class="tabs">${tabs.map(([k,l])=>`<button data-tab="${k}" class="${k===T?"on":""}">${esc(l)}</button>`).join("")}</div>
   ${body}
 </div></section>`;
}

function pgBooth(){
 return `
 <section class="pagehead tex" style="padding:84px 0 74px">${TEX("o",41,' data-dens="1"')}
   <div class="wrap">
     <div class="lbl" style="color:#FFE0BC">Booth Recruit · 2026.09.17 – 09.23</div>
     <h1 style="font-size:clamp(34px,5.6vw,58px);color:#fff">연어는<br>무대에만 서지 않습니다</h1>
     <p style="color:rgba(255,255,255,.92);font-weight:600;font-size:18px;margin-top:22px;max-width:44ch">
       물건을 파는 자리를 넘어, 함께 순환할 부스를 찾습니다.</p>
     <div class="cta" style="margin-top:30px">
       <a class="btn p" href="${BOOTH_FORM}" target="_blank" rel="noopener">신청서 작성하기 ${IC_ARROW}</a>
     </div>
   </div>
 </section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Why</div><h2>당신의 부스도, 돌아오는 연어입니다</h2></div>
   <div style="margin-top:24px;max-width:840px;color:var(--tx-2);font-size:16px">
     <p>무대에 처음 서는 <b style="color:var(--tx);font-weight:800">치어</b>부터 바깥을 유영하다 돌아온 <b style="color:var(--tx);font-weight:800">어른 연어</b>까지, 21년간 이어진 연어의 흐름에 무대 아래를 채워줄 당신의 이야기를 더해주세요.</p>
     <p style="margin-top:18px">단순한 판매가 아닌, 올해 여기서 만난 사람들과 함께 <b style="color:var(--tx);font-weight:800">내년에도 자연스레 돌아올 파트너</b>를 기다립니다.</p>
   </div>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Fields</div><h2>봉황대를 채울 다채로운 물결</h2></div>
   <p class="slead">일반 부스 · 3개 분야</p>
   <div style="margin-top:34px;display:flex;flex-direction:column;gap:0;border-top:1px solid var(--line)">
     ${BOOTH_FIELDS.map(f=>`<div style="display:flex;gap:28px;padding:28px 4px;border-bottom:1px solid var(--line);align-items:flex-start">
       <div class="num" style="font-weight:800;font-size:15px;letter-spacing:.14em;color:var(--tx-3);padding-top:6px;flex:0 0 40px">${esc(f.no)}</div>
       <div><h3 style="font-size:26px">${esc(f.t)}</h3><p style="color:var(--tx-2);font-size:15px;margin-top:9px">${esc(f.d)}</p></div>
     </div>`).join("")}
   </div>
 </div></section>

 <section class="blk tex">${TEX("p",42,' data-dens="0.7" data-fade="0.85"')}<div class="wrap">
   <div class="shead"><div class="lbl" style="color:#D9A7F0">Story Zone</div><h2>연어 페스티벌에서만 만나는 특별한 자리</h2></div>
   <p class="slead" style="color:rgba(255,255,255,.78)">세 개의 존은 하나의 순환입니다. 산란은 끝이 아니라 다음 치어의 시작입니다.</p>
   <div class="grid g3" style="margin-top:34px">
     ${BOOTH_ZONES.map(z=>`<div class="card" style="background:rgba(12,10,9,.55);border-color:rgba(255,255,255,.18);backdrop-filter:blur(3px)">
       <h3 style="font-size:26px">${esc(z.t)} <em style="font-style:normal;font-size:15px;font-weight:700;opacity:.55;margin-left:8px">${esc(z.h)}</em></h3>
       <p style="font-size:15px;margin-top:11px">${esc(z.d)}</p>
     </div>`).join("")}
   </div>
 </div></section>

 <section class="blk"><div class="wrap">
   <div class="shead"><div class="lbl">Apply</div><h2>2026년 가을, 봉황대에서 만나요</h2></div>
   <div class="scroller" style="margin-top:28px;max-width:860px"><table class="tbl"><tbody>
     <tr><td class="k">일시</td><td><b>2026. 10. 17.(토)</b> · AM 10 – PM 10<br><span style="color:var(--tx-3);font-size:13px">부스 운영 AM 10 – PM 8</span></td></tr>
     <tr><td class="k">장소</td><td>김해 봉황대공원 일원 · 김해시 봉황동 465</td></tr>
     <tr><td class="k">모집 기간</td><td><b>2026. 9. 17.(목) ~ 9. 23.(수)</b><br><span style="color:var(--tx-3);font-size:13px">7일간 · 선정 결과 개별 안내</span></td></tr>
     <tr><td class="k">대상</td><td>김해·경남 지역 창작자 · 공방 · 사회적경제 조직 · 이주민 셀러</td></tr>
     <tr><td class="k">제공</td><td>부스 · 테이블 · 전기(신청 시) · 공용 사이니지</td></tr>
     <tr><td class="k">신청 방법</td><td>아래 버튼 또는 인스타그램 <b>@gimhaemusicfestival_salmon</b> 프로필 링크의 구글 폼</td></tr>
   </tbody></table></div>
   <div style="margin-top:32px;display:flex;gap:12px;flex-wrap:wrap">
     <a class="btn p" href="${BOOTH_FORM}" target="_blank" rel="noopener">지금 신청하기 ${IC_ARROW}</a>
     <a class="btn g" style="border-color:var(--line-2);color:var(--tx-2)" href="#/info/notice">모집 공고 전문</a>
   </div>
   <p style="font-size:24px;font-weight:900;letter-spacing:-.025em;margin-top:48px;line-height:1.5">
     올해 여기 선 당신,<br>내년에도 이 자리로 돌아옵니다.</p>
 </div></section>`;
}

let P100_STATE={q:"",g:"전체"};
function pgSalmon100(){
 const genres=["전체",...Array.from(new Set(P100.map(p=>p.g)))];
 return pagehead("d",24,"Archive","100인의 연어","2020년 제15회 비대면 개최 당시 시작된 아카이브. 김해·경남을 무대로 활동하는 예술인의 기록입니다.")+`
 <section class="blk"><div class="wrap">
   <div class="filters">
     <div class="search">${IC_SEARCH}<input id="q100" placeholder="이름 · 장르 · 활동 내용으로 검색" value="${esc(P100_STATE.q)}"></div>
     <div class="pills">${genres.map(g=>`<button class="pill ${g===P100_STATE.g?"on":""}" data-g="${esc(g)}">${esc(g)}</button>`).join("")}</div>
   </div>
   <div class="cnt" id="cnt100"></div>
   <div class="p100" id="grid100" style="margin-top:16px"></div>
 </div></section>`;
}
function render100(){
 const q=P100_STATE.q.trim().toLowerCase();
 const list=P100.filter(p=>{
  if(P100_STATE.g!=="전체"&&p.g!==P100_STATE.g) return false;
  if(!q) return true;
  return (p.n+" "+p.g+" "+p.p+" "+(p.e||"")).toLowerCase().includes(q);
 });
 const c=$("#cnt100"),g=$("#grid100"); if(!c||!g) return;
 c.textContent=`전체 ${P100.length}건 중 ${list.length}건`;
 g.innerHTML=list.length?list.map(p=>`<article class="pc">
   <div class="thumb"><span class="tag">${esc(p.g)}</span>
     ${p.hl?`<span class="play">${IC_PLAY}</span>`:`<span class="ini">${esc(p.n.slice(0,1))}</span>`}</div>
   <div class="b">
     <h4>${esc(p.n)}</h4>
     <div class="m">${esc(p.g)}${p.e?` · <b>${esc(p.e)}</b>`:""}</div>
     <div class="pf">${esc(p.p)}</div>
   </div></article>`).join("")
  :`<div class="empty" style="grid-column:1/-1">검색 결과가 없습니다. 다른 검색어를 입력해 보세요.</div>`;
}

const INFO_TABS=[["notice","공지사항"],["community","커뮤니티"],["magazine","김해컬쳐매거진"],["gallery","연어갤러리"],["shop","연어상점"],["cheer","치어리더"]];
function pgInfo(sub){
 const S=sub||"notice"; let body="";
 if(S==="notice") body=`<div class="shead"><div class="lbl">Notice</div><h2>공지사항</h2></div>
   <div style="margin-top:26px">${boardRows("notices",DB.notices)}</div>`;
 if(S==="community") body=`<div class="shead"><div class="lbl">Community</div><h2>커뮤니티</h2></div>
   <p class="slead">관람 후기, 질문, 제안을 남기는 공간입니다.</p>
   <div style="margin-top:26px">${boardRows("community",DB.community)}</div>
   <p class="cap">질문과 후기는 <a href="${SNS.instagram}" target="_blank" rel="noopener">인스타그램 @gimhaemusicfestival_salmon</a> DM 또는 카카오채널로 보내주세요.</p>`;
 if(S==="magazine") body=`<div class="shead"><div class="lbl">Magazine</div><h2>김해컬쳐매거진 (GCM)</h2></div>
   <p class="slead">2018년 창간. 연어와 함께 발행하는 김해 지역 문화 정기간행물입니다. 제7호부터는 축제 종료 후에 발행해 「연어 로컬임팩트 분석」을 싣습니다.</p>
   <div class="grid g3" style="margin-top:30px">
     ${DB.magazines.map(m=>`<a class="card link" href="#/post/magazines/${m.id}">
       <div class="lbl">${esc(m.vol)} · ${esc(m.year)}</div>
       <h3 style="margin-top:9px">${esc(m.title)}</h3>
       <div style="font-size:13px;color:var(--tx-3);margin-top:7px">${esc(m.date)} · ${esc(m.pages)} · 표지 ${esc(m.cover)}</div>
       <p>${esc(String(m.body).split("\n")[0])}</p></a>`).join("")}
   </div>`;
 if(S==="gallery") body=`<div class="shead"><div class="lbl">Gallery</div><h2>연어갤러리</h2></div>
   <p class="slead">21년간의 현장 기록.</p>
   <div class="imgbox" style="margin:28px 0 12px"><a href="${IMG_TIMELINE}" target="_blank" rel="noopener" title="크게 보기"><img src="${IMG_TIMELINE}" alt="연어 연혁 아카이브"></a></div>
   <p class="cap">연어가 걸어온 길 — 1회(2006)부터 20회(2025)까지</p>
   <div class="gal" style="margin-top:32px">
     ${GALLERY.map(g=>`<div class="it"><div>
       <div class="lbl">${esc(g.y)}</div>
       <div style="font-weight:800;margin-top:7px;color:var(--tx)">${esc(g.t)}</div>
       <div style="margin-top:5px">${esc(g.d)}</div></div></div>`).join("")}
   </div>
   <p class="cap">※ 시안에서는 사진 자리를 텍스트로 표시했습니다. 실제 배포 시 원본 사진으로 교체합니다.</p>`;
 if(S==="shop") body=`<div class="shead"><div class="lbl">Shop</div><h2>연어상점</h2></div>
   <p class="slead">굿즈 판매 수익은 다음 회차 청소년 트랙 운영비로 사용됩니다.</p>
   <div class="grid g3" style="margin-top:30px">
     ${DB.goods.map(g=>`<div class="goods"><div class="im">${esc(g.name)}</div>
       <div class="b"><h4>${esc(g.name)}${g.tag?` <span class="badge s">${esc(g.tag)}</span>`:""}</h4>
       <div class="pr">${esc(g.price)}</div>
       <p style="font-size:13px;color:var(--tx-3);margin-top:7px">${esc(g.desc)}</p></div></div>`).join("")}
   </div>
   <p class="cap">※ 시안에서는 결제 기능이 연결되어 있지 않습니다. 실제 배포 시 외부 결제 모듈 또는 현장 판매로 운영합니다.</p>`;
 if(S==="cheer") body=`<div class="shead"><div class="lbl">Cheerleader</div><h2>치어리더</h2></div>
   <p class="slead">연어를 지속가능하게 만드는 후원그룹. 로고를 걸어드리는 대가로 후원을 받는 관계가 아니라, 후원이 무엇을 만들었는지 숫자로 돌려드리는 관계를 지향합니다.</p>
   <div class="grid g2" style="margin-top:30px;max-width:960px">
     <div class="card"><div class="lbl">Type A</div><h3 style="margin-top:9px">1만 명 시민후원</h3><p>시민 개인 후원. 축제가 특정 기관의 예산에 의존하지 않고 시민의 지지로 서는 구조를 만드는 것이 목표입니다.</p></div>
     <div class="card"><div class="lbl">Type B</div><h3 style="margin-top:9px">기업 · 단체 후원</h3><p>지역 기업·단체 후원. 후원 규모에 따른 노출뿐 아니라, 후원금이 어느 트랙에 쓰였는지를 명시해 보고합니다.</p></div>
   </div>
   <div class="note" style="margin-top:30px;max-width:840px">
     <p><strong>연어 임팩트 리포트 — 축제 종료 30일 내 제공</strong><br>
     5축 34개 지표로 측정한 결과를 후원자 전원에게 보고합니다. 순환 · 지역경제 · 환경/유산 · 포용 · 확산의 다섯 축이며, 상세 내용은 김해컬쳐매거진 제7호에 12p로 실립니다.</p>
   </div>
   <h2 style="margin-top:58px;font-size:28px">치어리더 운영위원회</h2>
   <p class="slead">2023년 제18회에 구성한 「축제 지속가능성 자문단」을 21회부터 개칭하고 13인으로 재정비합니다. 자문은 의견을 주는 자리이고, 치어리더는 연결하고 검증하고 응원하는 자리입니다.</p>
   <p class="cap" style="margin-top:14px">※ 위원회는 의결기구가 아니라 연결·검증기구이며, 최종 의사결정과 예산 집행은 주최·주관과 코어 크루가 갖습니다.</p>`;

 return pagehead("d",25,"Information","Information","공지사항 · 커뮤니티 · 매거진 · 갤러리 · 상점 · 후원 안내")+`
 <section class="blk"><div class="wrap">
   <div class="tabs">${INFO_TABS.map(([k,l])=>`<button data-info="${k}" class="${k===S?"on":""}">${esc(l)}</button>`).join("")}</div>
   ${body}
 </div></section>`;
}

function pgPost(type,id){
 const list=DB[type]||[];
 const it=list.find(x=>String(x.id)===String(id));
 if(!it) return pagehead("d",26,"Not found","게시물을 찾을 수 없습니다","삭제되었거나 주소가 잘못되었습니다.");
 const back={notices:"#/info/notice",community:"#/info/community",magazines:"#/info/magazine"}[type]||"#/";
 it.hit=(it.hit||0)+1; save();
 const meta=type==="magazines"
  ?`${esc(it.vol)} · ${esc(it.year)} · ${esc(it.date)} · ${esc(it.pages)}`
  :`${esc(it.date)}${it.writer?" · "+esc(it.writer):""} · 조회 ${esc(it.hit)}`;
 return `<section class="blk" style="padding-top:56px"><div class="wrap">
   <a href="${back}" class="lbl" style="text-decoration:none">← 목록으로</a>
   <h1 style="font-size:clamp(25px,3.6vw,36px);margin-top:18px;max-width:26ch">${esc(it.title)}</h1>
   <div style="margin-top:14px;font-size:13px;color:var(--tx-3);font-family:Archivo;letter-spacing:.04em">${meta}</div>
   <div style="margin-top:32px;padding-top:30px;border-top:1px solid var(--line);max-width:780px;color:var(--tx-2);font-size:15.5px;line-height:1.86">${br(it.body)}</div>
   ${type==="notices"&&it.cat==="모집"?`<div style="margin-top:34px"><a class="btn p" href="#/booth">부스 모집 페이지 ${IC_ARROW}</a></div>`:""}
   <div style="margin-top:44px"><a class="bs" href="${back}" style="text-decoration:none">목록으로</a></div>
 </div></section>`;
}

/* ══════════════════ admin ══════════════════ */
const AD_TABS=[["notices","공지사항"],["community","커뮤니티"],["magazines","매거진"],["goods","연어상점"]];
let AD={tab:"notices",editing:null};
function pgAdmin(){
 return pagehead("d",27,"Admin","관리자","게시글을 추가·수정·삭제할 수 있습니다. 시안에서는 브라우저에만 저장되며, 실제 배포 시 서버 DB와 로그인 인증이 연결됩니다.")+`
 <section class="blk"><div class="wrap"><div class="adwrap">
   <aside>
     <div class="adnav">${AD_TABS.map(([k,l])=>`<button data-ad="${k}" class="${k===AD.tab?"on":""}">${esc(l)} <span style="color:var(--tx-3);font-family:Archivo;font-size:12px">${(DB[k]||[]).length}</span></button>`).join("")}</div>
     <div style="margin-top:24px;display:flex;flex-direction:column;gap:8px">
       <button class="bs" id="adExport">JSON 내보내기</button>
       <button class="bs d" id="adReset">초기 데이터로 되돌리기</button>
     </div>
     <p class="cap">저장은 이 브라우저에만 반영됩니다. 다른 기기에는 보이지 않습니다.</p>
   </aside>
   <div id="adBody"></div>
 </div></div></section>`;
}
function adRender(){
 const box=$("#adBody"); if(!box) return;
 const t=AD.tab,list=DB[t]||[],isGoods=t==="goods",isMag=t==="magazines";
 const label=(AD_TABS.find(x=>x[0]===t)||["",""])[1];
 let form="";
 if(AD.editing){
  const e=AD.editing;
  form=`<div class="card" style="margin-bottom:28px">
   <h3 style="margin-bottom:18px">${e.id?"게시물 수정":"새 게시물"}</h3>
   ${isGoods?`
     <div class="fld"><label>Name</label><input id="f_name" value="${esc(e.name||"")}"></div>
     <div class="row"><div class="fld" style="flex:1"><label>Price</label><input id="f_price" value="${esc(e.price||"")}"></div>
     <div class="fld" style="flex:1"><label>Tag</label><input id="f_tag" value="${esc(e.tag||"")}"></div></div>
     <div class="fld"><label>Desc</label><input id="f_desc" value="${esc(e.desc||"")}"></div>`
   :`
     <div class="fld"><label>Title</label><input id="f_title" value="${esc(e.title||"")}"></div>
     <div class="row">
       ${isMag?`<div class="fld" style="flex:1"><label>Vol</label><input id="f_vol" value="${esc(e.vol||"")}"></div>
         <div class="fld" style="flex:1"><label>Year</label><input id="f_year" value="${esc(e.year||"")}"></div>
         <div class="fld" style="flex:1"><label>Pages</label><input id="f_pages" value="${esc(e.pages||"")}"></div>
         <div class="fld" style="flex:1"><label>Cover</label><input id="f_cover" value="${esc(e.cover||"")}"></div>`
       :`<div class="fld" style="flex:1"><label>Category</label><input id="f_cat" value="${esc(e.cat||"공지")}"></div>
          <div class="fld" style="flex:1"><label>Writer</label><input id="f_writer" value="${esc(e.writer||"")}"></div>`}
       <div class="fld" style="flex:1"><label>Date</label><input id="f_date" value="${esc(e.date||"")}"></div>
     </div>
     <div class="fld"><label>Body</label><textarea id="f_body">${esc(e.body||"")}</textarea></div>
     ${t==="notices"?`<label style="display:flex;gap:9px;align-items:center;font-size:14px;margin-bottom:15px"><input type="checkbox" id="f_pin" ${e.pin?"checked":""} style="width:auto"> 상단 고정</label>`:""}`}
   <div class="row"><button class="bs p" id="adSave">저장</button><button class="bs" id="adCancel">취소</button></div>
  </div>`;
 }
 const rows=list.map(it=>`<div class="brow" style="grid-template-columns:1fr 120px 150px">
   <span class="ti">${esc(isGoods?it.name:it.title)}${it.pin?' <span class="badge s">고정</span>':""}</span>
   <span class="dt">${esc(isGoods?it.price:it.date)}</span>
   <span class="row" style="gap:6px;justify-content:flex-end">
     <button class="bs" data-edit="${it.id}" style="padding:6px 13px;font-size:12.5px">수정</button>
     <button class="bs d" data-del="${it.id}" style="padding:6px 13px;font-size:12.5px">삭제</button>
   </span></div>`).join("");
 box.innerHTML=`<div class="shead"><h2 style="font-size:25px">${esc(label)}</h2><span class="cnt">${list.length}건</span></div>
   <div class="row" style="margin:20px 0 24px"><button class="bs p" id="adNew">+ 새 게시물</button></div>
   ${form}<div class="board">${rows||'<div class="empty">항목이 없습니다.</div>'}</div>`;
 $("#adNew").onclick=()=>{AD.editing={};adRender();};
 const c=$("#adCancel"); if(c) c.onclick=()=>{AD.editing=null;adRender();};
 const s=$("#adSave"); if(s) s.onclick=adSave;
 $$("[data-edit]",box).forEach(b=>b.onclick=()=>{AD.editing=Object.assign({},list.find(x=>String(x.id)===b.dataset.edit));adRender();box.scrollIntoView({behavior:"smooth",block:"start"});});
 $$("[data-del]",box).forEach(b=>b.onclick=()=>{DB[AD.tab]=DB[AD.tab].filter(x=>String(x.id)!==b.dataset.del);save();AD.editing=null;adRender();toast("삭제했습니다");});
}
function adSave(){
 const t=AD.tab,e=AD.editing||{};
 const v=id=>{const n=$("#"+id);return n?(n.type==="checkbox"?n.checked:n.value):undefined;};
 let obj;
 if(t==="goods") obj={name:v("f_name"),price:v("f_price"),tag:v("f_tag"),desc:v("f_desc")};
 else if(t==="magazines") obj={title:v("f_title"),vol:v("f_vol"),year:v("f_year"),pages:v("f_pages"),cover:v("f_cover"),date:v("f_date"),body:v("f_body")};
 else obj={title:v("f_title"),cat:v("f_cat"),writer:v("f_writer"),date:v("f_date"),body:v("f_body"),pin:!!v("f_pin"),hit:e.hit||0};
 const key=t==="goods"?"name":"title";
 if(!String(obj[key]||"").trim()){toast("제목을 입력해 주세요");return;}
 if(e.id){const i=DB[t].findIndex(x=>x.id===e.id);DB[t][i]=Object.assign({},DB[t][i],obj);}
 else{const m=DB[t].reduce((a,x)=>Math.max(a,x.id||0),0);DB[t].unshift(Object.assign({id:m+1},obj));}
 save();AD.editing=null;adRender();toast("저장했습니다");
}

/* ══════════════════ router ══════════════════ */
function route(){
 const seg=(location.hash||"#/").slice(1).split("/").filter(Boolean);
 const app=$("#app");
 let html="",navKey="/";
 if(seg.length===0){html=pgHome();navKey="/";}
 else if(seg[0]==="about"){html=pgAbout();navKey="/about";}
 else if(seg[0]==="program"){html=pgProgram(seg[1]);navKey="/program";}
 else if(seg[0]==="booth"){html=pgBooth();navKey="/booth";}
 else if(seg[0]==="salmon100"){html=pgSalmon100();navKey="/salmon100";}
 else if(seg[0]==="info"){html=pgInfo(seg[1]);navKey="/info";}
 else if(seg[0]==="post"){html=pgPost(seg[1],seg[2]);navKey="/info";}
 else if(seg[0]==="admin"){html=pgAdmin();navKey="";}
 else html=pagehead("d",28,"404","페이지를 찾을 수 없습니다","주소를 다시 확인해 주세요.");

 app.innerHTML=html;
 $$("nav.main a").forEach(a=>a.classList.toggle("on",a.dataset.r===navKey));
 $("#nav").classList.remove("open");
 window.scrollTo({top:0,behavior:"instant"});
 paintAll(); texWatch();

 $$("[data-tab]").forEach(b=>b.onclick=()=>location.hash="#/program/"+b.dataset.tab);
 $$("[data-info]").forEach(b=>b.onclick=()=>location.hash="#/info/"+b.dataset.info);
 if(seg[0]==="salmon100"){
  render100();
  const q=$("#q100"); q.oninput=()=>{P100_STATE.q=q.value;render100();};
  $$(".pill").forEach(p=>p.onclick=()=>{P100_STATE.g=p.dataset.g;$$(".pill").forEach(x=>x.classList.toggle("on",x===p));render100();});
 }
 if(seg[0]==="admin"){
  AD.editing=null; adRender();
  $$("[data-ad]").forEach(b=>b.onclick=()=>{AD.tab=b.dataset.ad;AD.editing=null;$$("[data-ad]").forEach(x=>x.classList.toggle("on",x===b));adRender();});
  $("#adExport").onclick=()=>{
   const w=window.open("","_blank");
   if(w){w.document.write("<pre style='white-space:pre-wrap;font:13px ui-monospace,monospace;padding:20px;background:#12100F;color:#F7F1EB'>"+esc(JSON.stringify(DB,null,2))+"</pre>");w.document.close();}
   else toast("팝업이 차단되었습니다");
  };
  $("#adReset").onclick=()=>{DB=JSON.parse(JSON.stringify(SEED));save();AD.editing=null;adRender();toast("초기 데이터로 되돌렸습니다");};
 }
}

/* ══════════════════ chatbot ══════════════════ */
function botAnswer(q){
 const s=q.toLowerCase().replace(/\s/g,"");
 let best=null,bs=0;
 FAQ.forEach(f=>{let sc=0;f.k.forEach(k=>{if(s.includes(k.toLowerCase())) sc+=k.length>=3?3:2;});if(sc>bs){bs=sc;best=f;}});
 if(best&&bs>0) return best.a;
 return "죄송합니다, 아직 그 질문에는 답을 준비하지 못했습니다.\n\n아래 항목은 바로 안내드릴 수 있습니다.\n· 일시 · 장소 · 입장료\n· 출연진 · 당일 진행\n· 부스 운영팀 신청\n· 무장애 관람 · 후원 참여\n\n그 밖의 문의는 055-723-2284 또는 wonjae@macc.or.kr 로 연락 주세요.";
}
function say(t,who){const log=$("#clog");const d=document.createElement("div");d.className="msg "+(who==="me"?"me":"bot");d.textContent=t;log.appendChild(d);log.scrollTop=log.scrollHeight;}
function ask(q){say(q,"me");setTimeout(()=>say(botAnswer(q),"bot"),260);}
function initBot(){
 $("#quick").innerHTML=QUICK.map(q=>`<button>${esc(q)}</button>`).join("");
 $$("#quick button").forEach(b=>b.onclick=()=>ask(b.textContent));
 $("#cform").onsubmit=e=>{e.preventDefault();const v=$("#cinput").value.trim();if(!v)return;$("#cinput").value="";ask(v);};
 $("#cbtn").onclick=()=>{
  const p=$("#cpanel"); p.classList.toggle("on");
  if(p.classList.contains("on")){
   if(!$("#clog").children.length) say("안녕하세요. 제21회 김해뮤직페스티벌 연어 안내입니다.\n\n일시·장소·출연진·부스 신청·무장애 관람 등 궁금한 것을 물어보세요.","bot");
   $("#cinput").focus();
  }
 };
 $("#cclose").onclick=()=>$("#cpanel").classList.remove("on");
}

/* ══════════════════ boot ══════════════════ */
(function(){
 $("#burger").onclick=()=>$("#nav").classList.toggle("open");
 initBot();
 window.addEventListener("hashchange",route);
 route();
})();
