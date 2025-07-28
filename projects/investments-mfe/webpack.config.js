const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  plugins: [
    new ModuleFederationPlugin({
      name: "investmentsMfe",
      filename: "remoteEntry.js",
      exposes: {
        "./InvestmentsComponent": "./projects/investments-mfe/src/app/investments/investments.component.ts",
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
        "@angular/material": { singleton: true, strictVersion: true },
      },
    }),
  ],
};