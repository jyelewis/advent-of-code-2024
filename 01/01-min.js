import{parse2DArray as t}from"../utilities";
export const day01=(r)=>{let a=t(r).reduce(([t,r],[a,m])=>[[...t,a],[...r,m],],[[],[]]).map(t=>t.toSorted());
    return[a[0].map((t,r)=>Math.abs(a[0][r]-a[1][r])).sum(),a[0].map(t=>t*a[1].count(r=>r===t)).sum()]}
