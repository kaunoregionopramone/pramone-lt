import sanity from "@sanity/eslint-config-studio";

export default [
  ...sanity,
  { ignores: ["dist/**", ".sanity/**", "sanity.types.ts"] },
];
