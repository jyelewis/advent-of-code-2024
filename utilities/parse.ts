// TODO: this is so horrendous, but want to prove its value before cleaning up
export const parse =
  (staticSections: TemplateStringsArray, ...types: any[]) =>
  (input: string): any[] => {
    let rest = input;
    let nextStaticSectionIndex = 0;
    let nextTypeIndex = 0;

    const outputValues = [];

    for (const staticSection of staticSections) {
      nextStaticSectionIndex++;

      // read off the input
      if (!rest.startsWith(staticSection)) {
        throw new Error(`Failed to parse, was expecting "${staticSection}" but got "${rest}" (input: "${input}")`);
      }
      rest = rest.slice(staticSection.length);

      // TODO: bro
      if (nextTypeIndex >= types.length) {
        break;
      }

      // now read a type
      const expectedType = types[nextTypeIndex];
      nextTypeIndex++;
      if (expectedType === Number) {
        const numberSection = rest.match(/[0-9-\.]+/);
        if (numberSection === null) {
          throw new Error(`Failed to parse, was expecting a number but got "${rest}" (input: "${input}")`);
        }
        rest = rest.slice(numberSection[0].length);
        const numValue = parseInt(numberSection[0], 10);
        outputValues.push(numValue);
      }

      if (expectedType === String) {
        const nextStaticSection = staticSections[nextStaticSectionIndex];
        const endOfString = nextStaticSection !== "" ? rest.indexOf(nextStaticSection) : rest.length;
        if (endOfString === -1) {
          throw new Error(
            `Failed to parse, was expecting a string, followed by "${nextStaticSection}" but got "${rest}" (input: "${input}")`,
          );
        }

        const stringValue = rest.slice(0, endOfString);
        rest = rest.slice(endOfString);
        outputValues.push(stringValue);
      }
    }

    return outputValues;
  };
