export const day03a=t=>t.matchAll(/mul\((\d+),(\d+)\)/g).reduce((t,e)=>t+e[1]*e[2],0)
export const day03b=t=>t.split("do()").reduce((t,e)=>t+day03a(e.split("don't()")[0]), 0)