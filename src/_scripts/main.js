// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
// import Link from '../_modules/link/link';
import foundationPlugins from './components/foundationPlugins';
// import compDropdownPath from './components/compDropdownPath';

$(() => {
  $(document).foundation();

  // new Link(); // Activate Link modules logic
  console.log('Welcome to Yeogurt!');
  // compIsotopeVideo();
});
