// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
// import Link from '../_modules/link/link';
import compVideoControls from './components/compVideoControls';
import compIsotopeVideo from './components/compIsotopeVideo';


$(() => {
  // new Link(); // Activate Link modules logic
  console.log('Welcome to Yeogurt!');
  compVideoControls();
  compIsotopeVideo();
});
