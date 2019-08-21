/// <reference path="../@types/index.d.ts" />

import vm = require('vm')

const moduleDict = require('@fibjs/builtin-modules/lib/util/get-builtin-module-hash')()

const newGlobal: typeof global = {
    ...global,
    // add all hidden global property : start
    console: console,
    // add all hidden global property : end
}

newGlobal.process = {
    ...newGlobal.process,
    platform: process.platform,
    env: {
        ...newGlobal.process.env,
        FORCE_COLOR: true
    }
}

const vbox = new vm.SandBox(moduleDict, newGlobal)

const Chalk = vbox.require('chalk', __dirname);

// Chalk.sandbox = vbox;

export = Chalk
