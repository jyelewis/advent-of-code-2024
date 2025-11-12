import { memo } from "../utilities";

export function day19(input: string) {
  const [towelPatternsStr, desiredDesignsStr] = input.split("\n\n");
  const towelPatterns = towelPatternsStr.split(", ");
  const desiredDesigns = desiredDesignsStr.lines();

  const countDesignSolutions = memo((targetDesign: string): number =>
    towelPatterns
      .map((pattern) => {
        if (!targetDesign.startsWith(pattern)) {
          // not a valid solution
          return 0;
        }

        if (pattern.length === targetDesign.length) {
          // perfect solution, exact match
          return 1;
        }

        // may be many ways to complete this design
        return countDesignSolutions(targetDesign.substring(pattern.length));
      })
      .sum(),
  );

  const numSolutionsPerDesign = desiredDesigns.map(countDesignSolutions);
  return {
    partA: numSolutionsPerDesign.count((solutions) => solutions > 0),
    partB: numSolutionsPerDesign.sum(),
  };
}
