// Polyfill(s) for older browsers.
import 'core-js/client/core';

import 'reflect-metadata';
require('zone.js/dist/zone');

import 'ts-helpers';

if (process.env.NODE_ENV === 'production') {
  // Production

} else {
  // Development

  Error['stackTraceLimit'] = Infinity;

  require('zone.js/dist/long-stack-trace-zone');
}