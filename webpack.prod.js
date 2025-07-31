const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "production",
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        investmentsMfe: "investmentsMfe@https://investments-mfe.bytebank.com/remoteEntry.js",
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "@angular/material": { singleton: true, strictVersion: true, requiredVersion: "auto" },
        "rxjs": { singleton: true, strictVersion: true, requiredVersion: "auto" },
      },
    }),
  ],
};