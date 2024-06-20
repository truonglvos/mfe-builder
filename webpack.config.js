const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("./package.json");
const dependencies = packageJson.dependencies;
require("dotenv").config({ path: "./.env" });
const Dotenv = require("dotenv-webpack");

module.exports = {
  output: {
    uniqueName: "builder",
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
    },
    alias: {},
  },
  plugins: [
    new Dotenv(),
    new ModuleFederationPlugin({
      name: "builder",
      filename: "remoteEntry.js",
      library: { type: "module" },
      exposes: {
        "./BuilderModule": "./src/app/app.module.ts",
      },
      remotes: {
        SHELL: `${process.env.SHELL_URL}/remoteEntry.js`,
      },
      shared: {
        "truonlv4-lib/image": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["truonlv4-lib/image"],
        },
        "@ngrx/store": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["@ngrx/store"],
        },
        "@ngrx/effects": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["@ngrx/effects"],
        },
        "@ngrx/store-devtools": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["@ngrx/store-devtools"],
        },
        rxjs: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["rxjs"],
        },
        "@angular/core": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["@angular/core"],
        },
        "@angular/common": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["@angular/common"],
        },
        "@angular/router": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["@angular/router"],
        },
        "@angular/forms": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["@angular/forms"],
        },
        "@angular/common/http": {
          eager: true,
          singleton: true,
          requiredVersion: dependencies["@angular/common/http"],
        },
      },
    }),
  ],
};
