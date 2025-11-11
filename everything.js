import{parse2DArray as e,range,range2D}from"./utilities";
export const day01=(r)=>{let a=e(r).reduce(([t,r],[a,m])=>[[...t,a],[...r,m],],[[],[]]).map(t=>t.toSorted());
  return[a[0].map((t,r)=>Math.abs(a[0][r]-a[1][r])).sum(),a[0].map(t=>t*a[1].count(r=>r===t)).sum()]}
let r=e=>(e.every((e,t,o)=>!t||e>o[t-1])||e.every((e,t,o)=>!t||e<o[t-1]))&&e.every((t,o)=>!o||1<=Math.abs(t-e[o-1])&&3>=Math.abs(t-e[o-1]));
export const day02=t=>[e(t).count(r),e(t).count(e=>r(e)||e.some((t,o)=>r(e.toSpliced(o,1))))];
export const day03a=t=>t.matchAll(/mul\((\d+),(\d+)\)/g).reduce((t,e)=>t+e[1]*e[2],0)
export const day03b=t=>t.split("do()").reduce((t,e)=>t+day03a(e.split("don't()")[0]), 0)
export const day04a=p=>{let a=p.lines().map(t=>t.chars()),b=[-1,0,1];return range2D(a).map(({x:i,y:p})=>b
  .map(l=>b.filter(m=>"XMAS"===range(4).map(t=>a[p+t*m]?.[i+t*l]).join(""))).flat().length).sum()};
export const day05=(t)=>{let[i,o]=t.split("\n\n").map(e),r=e=>i.every(([t,i])=>!e.includes(i)||e.indexOf(t)<e.indexOf(i));
  return[o.filter(r),o.filter(e=>!r(e)).map(e=>e.toSorted((e,t)=>
    i.some(([i,o])=>e===i&&t===o)?-1:0))].map(e=>e.map(e=>e[Math.floor(e.length/2)]).sum())}