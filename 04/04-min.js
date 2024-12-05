import{range,range2D}from"../utilities";
export const day04a=p=>{let a=p.split("\n").map(t=>t.split("")),b=[-1,0,1];return range2D(a).map(({x:i,y:p})=>b
  .map(l=>b.filter(m=>"XMAS"===range(4).map(t=>a[p+t*m]?.[i+t*l]).join(""))).flat().length).sum()};
