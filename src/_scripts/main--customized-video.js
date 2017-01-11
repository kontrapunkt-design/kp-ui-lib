// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import compVideoControls from './components/compVideoControls';

$(() => {
  // new Link(); // Activate Link modules logic
  compVideoControls();
});
