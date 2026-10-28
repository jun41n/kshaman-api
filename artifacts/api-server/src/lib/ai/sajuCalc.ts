/** Deterministic Four Pillars calculation. Product policy is documented in the returned metadata. */
export interface SajuCalculationOptions {
  birthMinute?: number;
  timezoneOffsetMinutes?: number;
  dayBoundaryPolicy?: "jeongjasi" | "midnight";
}
export interface BranchRelation { type: "충(沖)"|"삼합(三合)"|"육합(六合)"|"형(刑)"|"동일(同一)"|"중립"; description: string; energy: "매우 강함"|"강함"|"보통"|"약함"; }
export interface StemRelation { type: "상생(相生)"|"상극(相剋)"|"비화(比和)"; description: string; }
export interface SajuData {
  yearPillar:string; yearStem:string; yearBranch:string; yearZodiac:string; yearElement:string; yearYinYang:string;
  monthPillar:string; monthStem:string; monthBranch:string; monthSeason:string;
  dayPillar:string; dayStem:string; dayBranch:string; hourPillar:string|null; hourBranch:string|null;
  currentAge:number; koreanAge:number; currentYear:number; currentYearPillar:string; currentYearElement:string;
  branchRelation:BranchRelation; stemRelation:StemRelation; elementInteraction:string;
  calculationPolicy:{yearBoundary:"ipchun";monthBoundary:"12jie";dayBoundary:"jeongjasi"|"midnight";timezoneOffsetMinutes:number;timeUnknown:boolean;boundaryCase:boolean};
  summaryForPrompt:string;
}

const STEMS = [
  {ko:"갑(甲)",element:"목(木)",yinYang:"양"},{ko:"을(乙)",element:"목(木)",yinYang:"음"},
  {ko:"병(丙)",element:"화(火)",yinYang:"양"},{ko:"정(丁)",element:"화(火)",yinYang:"음"},
  {ko:"무(戊)",element:"토(土)",yinYang:"양"},{ko:"기(己)",element:"토(土)",yinYang:"음"},
  {ko:"경(庚)",element:"금(金)",yinYang:"양"},{ko:"신(辛)",element:"금(金)",yinYang:"음"},
  {ko:"임(壬)",element:"수(水)",yinYang:"양"},{ko:"계(癸)",element:"수(水)",yinYang:"음"},
] as const;
const BRANCHES = [
  {ko:"자(子)",zodiac:"쥐",element:"수(水)",season:"겨울 한복판"},{ko:"축(丑)",zodiac:"소",element:"토(土)",season:"겨울 끝"},
  {ko:"인(寅)",zodiac:"호랑이",element:"목(木)",season:"봄 초"},{ko:"묘(卯)",zodiac:"토끼",element:"목(木)",season:"봄 한복판"},
  {ko:"진(辰)",zodiac:"용",element:"토(土)",season:"봄 끝"},{ko:"사(巳)",zodiac:"뱀",element:"화(火)",season:"여름 초"},
  {ko:"오(午)",zodiac:"말",element:"화(火)",season:"여름 한복판"},{ko:"미(未)",zodiac:"양",element:"토(土)",season:"여름 끝"},
  {ko:"신(申)",zodiac:"원숭이",element:"금(金)",season:"가을 초"},{ko:"유(酉)",zodiac:"닭",element:"금(金)",season:"가을 한복판"},
  {ko:"술(戌)",zodiac:"개",element:"토(土)",season:"가을 끝"},{ko:"해(亥)",zodiac:"돼지",element:"수(水)",season:"겨울 초"},
] as const;
const TERM_TARGETS = [285,315,345,15,45,75,105,135,165,195,225,255] as const;
const TERM_APPROX = [[1,6],[2,4],[3,6],[4,5],[5,6],[6,6],[7,7],[8,7],[9,7],[10,8],[11,7],[12,7]] as const;
const TERM_BRANCH: Record<number,number> = {285:1,315:2,345:3,15:4,45:5,75:6,105:7,135:8,165:9,195:10,225:11,255:0};
const mod=(n:number,d:number)=>((n%d)+d)%d;
const norm=(n:number)=>mod(n,360);
const signed=(n:number)=>{const x=norm(n);return x>180?x-360:x;};
function jd(date:Date){return date.getTime()/86400000+2440587.5;}
function solarLongitude(date:Date){
  const t=(jd(date)-2451545)/36525, r=Math.PI/180;
  const l=norm(280.46646+36000.76983*t+0.0003032*t*t), m=norm(357.52911+35999.05029*t-0.0001537*t*t);
  const c=(1.914602-0.004817*t-0.000014*t*t)*Math.sin(m*r)+(0.019993-0.000101*t)*Math.sin(2*m*r)+0.000289*Math.sin(3*m*r);
  return norm(l+c-0.00569-0.00478*Math.sin((125.04-1934.136*t)*r));
}
function findSolarTerm(year:number,target:number){
  const i=TERM_TARGETS.indexOf(target as typeof TERM_TARGETS[number]), [month,day]=TERM_APPROX[i<0?0:i], center=Date.UTC(year,month-1,day);
  let prev=new Date(center-8*86400000), prevVal=signed(solarLongitude(prev)-target);
  for(let h=1;h<=16*24;h++){
    const cur=new Date(center-8*86400000+h*3600000), curVal=signed(solarLongitude(cur)-target);
    if(prevVal<=0&&curVal>=0){let lo=prev.getTime(),hi=cur.getTime();for(let n=0;n<45;n++){const mid=(lo+hi)/2,v=signed(solarLongitude(new Date(mid))-target);if(v>=0)hi=mid;else lo=mid;}return new Date(hi);}
    prev=cur;prevVal=curVal;
  }
  throw new Error(`Solar term not found: ${year}-${target}`);
}
function localInstant(y:number,m:number,d:number,h:number,min:number,offset:number){return new Date(Date.UTC(y,m-1,d,h,min)-offset*60000);}
function nextDay(y:number,m:number,d:number){const x=new Date(Date.UTC(y,m-1,d)+86400000);return [x.getUTCFullYear(),x.getUTCMonth()+1,x.getUTCDate()];}
function dayCycle(y:number,m:number,d:number){return mod(Math.floor(Date.UTC(y,m-1,d)/86400000+2440587.5)+49,60);}
function sajuYear(instant:Date,year:number){return instant>=findSolarTerm(year,315)?year:year-1;}
function monthTerm(instant:Date,year:number){
  const all=[-1,0,1].flatMap(delta=>TERM_TARGETS.map(target=>({target,instant:findSolarTerm(year+delta,target)}))).sort((a,b)=>a.instant.getTime()-b.instant.getTime());
  const hit=all.filter(x=>x.instant<=instant).at(-1);if(!hit)throw new Error("Month solar term not found");return {branch:TERM_BRANCH[hit.target],instant:hit.instant};
}
function branchRelation(birth:number,year:number):BranchRelation{
  const current=mod(year-4,12), pairs=(xs:number[][])=>xs.some(([a,b])=>(a===birth&&b===current)||(b===birth&&a===current));
  if(birth===current)return{type:"동일(同一)",description:`출생 연지와 ${year}년 연지가 같은 기운으로 겹친다.`,energy:"매우 강함"};
  if(pairs([[0,6],[1,7],[2,8],[3,9],[4,10],[5,11]]))return{type:"충(沖)",description:`출생 연지와 ${year}년 연지가 충의 관계로 만난다.`,energy:"매우 강함"};
  if(pairs([[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]]))return{type:"육합(六合)",description:`출생 연지와 ${year}년 연지가 육합의 관계로 만난다.`,energy:"강함"};
  if([[2,6,10],[5,9,1],[8,0,4],[11,3,7]].some(g=>g.includes(birth)&&g.includes(current)))return{type:"삼합(三合)",description:`출생 연지와 ${year}년 연지가 삼합의 흐름으로 만난다.`,energy:"강함"};
  if([[2,5,8],[1,10,7],[0,3]].some(g=>g.includes(birth)&&g.includes(current)))return{type:"형(刑)",description:`출생 연지와 ${year}년 연지가 형의 관계로 만난다.`,energy:"강함"};
  return{type:"중립",description:`출생 연지와 ${year}년 연지가 특별한 충합 없이 병존한다.`,energy:"보통"};
}
type Element="목"|"화"|"토"|"금"|"수";
const element=(s:string):Element=>(["목","화","토","금","수"] as Element[]).find(x=>s.includes(x))??"토";
function stemRelation(a:Element,b:Element):StemRelation{const sh:Record<Element,Element>={목:"화",화:"토",토:"금",금:"수",수:"목"},ke:Record<Element,Element>={목:"토",토:"수",수:"화",화:"금",금:"목"};if(a===b)return{type:"비화(比和)",description:`출생 천간과 현재 연도 천간의 오행이 같다.`};if(sh[a]===b||sh[b]===a)return{type:"상생(相生)",description:`출생 천간과 현재 연도 천간이 상생 관계다.`};if(ke[a]===b||ke[b]===a)return{type:"상극(相剋)",description:`출생 천간과 현재 연도 천간이 상극 관계다.`};return{type:"비화(比和)",description:"두 천간 사이에 직접적인 생극 관계가 없다."};}

export function calcSaju(y:number,m:number,d:number,h?:number,options:SajuCalculationOptions={}):SajuData{
  const offset=options.timezoneOffsetMinutes??540, minute=options.birthMinute??0, policy=options.dayBoundaryPolicy??"jeongjasi", unknown=h==null||Number.isNaN(h), hour=unknown?12:Math.max(0,Math.min(23,h as number));
  const instant=localInstant(y,m,d,hour,minute,offset), sy=sajuYear(instant,y), ys=mod(sy-4,10), yb=mod(sy-4,12), mt=monthTerm(instant,y), mb=mt.branch;
  const ms=mod([2,4,6,8,0][Math.floor(ys/2)]+mod(mb-2,12),10), rollover=!unknown&&policy==="jeongjasi"&&hour>=23, date=rollover?nextDay(y,m,d):[y,m,d], di=dayCycle(date[0],date[1],date[2]), ds=di%10, db=di%12;
  const hb=unknown?null:(hour===23||hour===0?0:Math.floor((hour+1)/2)), hs=hb==null?null:mod([0,2,4,6,8][Math.floor(ds/2)]+hb,10);
  const now=new Date(), cy=sajuYear(now,now.getUTCFullYear()), cs=STEMS[mod(cy-4,10)], cb=BRANCHES[mod(cy-4,12)];let age=cy-y;if(now.getUTCMonth()+1<m||(now.getUTCMonth()+1===m&&now.getUTCDate()<d))age--;
  const relation=branchRelation(yb,cy), stem=stemRelation(element(STEMS[ys].element),element(cs.element)), boundary=Math.min(Math.abs(instant.getTime()-findSolarTerm(y,315).getTime()),Math.abs(instant.getTime()-mt.instant.getTime()))<30*60000||(!unknown&&(hour===23||hour===0));
  const summary=[`▶ 연주(年柱): ${STEMS[ys].ko}${BRANCHES[yb].ko} → ${BRANCHES[yb].zodiac}띠 / ${STEMS[ys].element} / ${STEMS[ys].yinYang}`,`▶ 월주(月柱): ${STEMS[ms].ko}${BRANCHES[mb].ko} → ${BRANCHES[mb].season} / 12절 절입시 기준`,`▶ 일주(日柱): ${STEMS[ds].ko}${BRANCHES[db].ko} → ${rollover?"23시 정자시 기준 다음 날":"출생일 기준"}`,`▶ 시주(時柱): ${hs==null?"미상":`${STEMS[hs].ko}${BRANCHES[hb as number].ko}`}`,`▶ 만 나이: ${age}세`,`▶ ${cy}년 연주: ${cs.ko}${cb.ko}`,`▶ 연지 관계: ${relation.type} — ${relation.description}`,`▶ 계산 계약: 입춘·12절 절입시·UTC+${offset/60}·${policy==="jeongjasi"?"정자시":"자정"} 경계`].join("\n");
  return {yearPillar:`${STEMS[ys].ko}${BRANCHES[yb].ko}`,yearStem:STEMS[ys].ko,yearBranch:BRANCHES[yb].ko,yearZodiac:BRANCHES[yb].zodiac,yearElement:STEMS[ys].element,yearYinYang:STEMS[ys].yinYang,monthPillar:`${STEMS[ms].ko}${BRANCHES[mb].ko}`,monthStem:STEMS[ms].ko,monthBranch:BRANCHES[mb].ko,monthSeason:BRANCHES[mb].season,dayPillar:`${STEMS[ds].ko}${BRANCHES[db].ko}`,dayStem:STEMS[ds].ko,dayBranch:BRANCHES[db].ko,hourPillar:hs==null?null:`${STEMS[hs].ko}${BRANCHES[hb as number].ko}`,hourBranch:hb==null?null:BRANCHES[hb].ko,currentAge:age,koreanAge:age+1,currentYear:cy,currentYearPillar:`${cs.ko}${cb.ko}`,currentYearElement:cs.element,branchRelation:relation,stemRelation:stem,elementInteraction:`${STEMS[ys].element}(출생 천간) × ${cs.element}(${cy}년) → ${stem.type}`,calculationPolicy:{yearBoundary:"ipchun",monthBoundary:"12jie",dayBoundary:policy,timezoneOffsetMinutes:offset,timeUnknown:unknown,boundaryCase:boundary},summaryForPrompt:summary};
}
