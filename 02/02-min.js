import{parse2DArray as e}from"../utilities";
let r=e=>(e.every((e,t,o)=>!t||e>o[t-1])||e.every((e,t,o)=>!t||e<o[t-1]))&&e.every((t,o)=>!o||1<=Math.abs(t-e[o-1])&&3>=Math.abs(t-e[o-1]));
export const day02=t=>[e(t).count(r),e(t).count(e=>r(e)||e.some((t,o)=>r(e.toSpliced(o,1))))];