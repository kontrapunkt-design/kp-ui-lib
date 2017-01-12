// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import scrollMonitor from 'scrollMonitor';
import compScrollMonitor from './components/compScrollMonitor';

$(() => {
  console.log('scroll monitor loaded');

  function addClass() {
  		if (!this.isInViewport) {
  			return;
  		} else if (this.isFullyInViewport) {
  			this.watchItem.style.backgroundColor = '#fcc';
  		} else if (this.isAboveViewport) {
  			this.watchItem.style.backgroundColor = '#ccf';
  		} else if (this.isBelowViewport) {
  			this.watchItem.style.backgroundColor = '#ffc';
  		}
  }

  $('.comp__scrollmoniter-el').each(function(index, el) {
    let watcher = scrollMonitor.create(el);
    watcher.stateChange(addClass);
		addClass.call( watcher );

  });


});
