const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "production",
  plugins: [
    new ModuleFederationPlugin({
      name: "investmentsMfe",
      filename: "remoteEntry.js",
      exposes: {
        "./InvestmentsComponent": "./projects/investments-mfe/src/app/investments/investments.component.ts",
      },
      shared: {
        "@angular/core": { singleton: true },
        "@angular/common": { singleton: true },
        "@angular/router": { singleton: true },
      },
    }),
  ],
};