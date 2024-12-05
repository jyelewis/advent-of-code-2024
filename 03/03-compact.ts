export const day03a_compact = (input: string) => input.matchAll(/mul\((\d+),(\d+)\)/g)
  .reduce((sum,e)=> sum + (+e[1] * +e[2]),0)

export const day03b_compact = (input: string) => input.split("do()")
  .reduce((sum, doInput) => sum + day03a_compact(doInput.split("don't()")[0]), 0)
