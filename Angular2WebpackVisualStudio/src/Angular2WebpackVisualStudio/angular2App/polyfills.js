"use strict";
require('core-js/client/core');
require('reflect-metadata');
require('zone.js/dist/zone');
require('ts-helpers');
if (process.env.ENV === 'build') {
}
else {
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
//# sourceMappingURL=polyfills.js.map