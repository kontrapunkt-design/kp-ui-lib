// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import compIsotope from './components/compIsotope';

$(() => {
  // new Link(); // Activate Link modules logic
  compIsotope();
});
