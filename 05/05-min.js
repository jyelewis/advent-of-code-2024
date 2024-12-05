import{parse2DArray as e}from"../utilities";
export const day05=(t)=>{let[i,o]=t.split("\n\n").map(e),r=e=>i.every(([t,i])=>!e.includes(i)||e.indexOf(t)<e.indexOf(i));
    return[o.filter(r),o.filter(e=>!r(e)).map(e=>e.toSorted((e,t)=>
      i.some(([i,o])=>e===i&&t===o)?-1:0))].map(e=>e.map(e=>e[Math.floor(e.length/2)]).sum())}