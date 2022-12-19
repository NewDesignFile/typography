const StyleDictionary = require("style-dictionary");
const args = require("minimist")(process.argv.slice(2));
const typography = args.typography ? args.typography : "typography";

console.log(`🚧 Compiling tokens with the ${typography.toUpperCase()} typography`);

const getStyleDictionaryConfig = (typography) => {
  return {
    log: "warn",
    source: [
      "tokens/global/**/*.+(js|json)",
      `tokens/typography/${typography}/**/*.+(js|json)`,
    ],
    platforms: {
      css: {
        transformGroup: "css",
        buildPath: "dist/typography/",
        files: [
          {
            destination: `${typography}.css`,
            format: "css/variables",
            "options": {"outputReferences": true}
          },
        ],
      },
    },
  };
};

const StyleDictionaryExtended = StyleDictionary.extend(
  getStyleDictionaryConfig(typography)
);

StyleDictionaryExtended.buildAllPlatforms();