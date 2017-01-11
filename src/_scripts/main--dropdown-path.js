// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import compDropdownPath from './components/compDropdownPath';

$(() => {
  // new Link(); // Activate Link modules logic
  compDropdownPath();
});
