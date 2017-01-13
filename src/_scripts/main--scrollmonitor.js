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
  			this.watchItem.classList.add('entered');
        this.watchItem.classList.remove('exit');
        this.watchItem.classList.remove('entering');
  		} else if (this.isAboveViewport) {
  			this.watchItem.classList.add('exit');
        this.watchItem.classList.remove('entered');
        this.watchItem.classList.remove('entering');
        console.log('leave');
  		} else if (this.isBelowViewport) {
  			this.watchItem.classList.add('entering');
        this.watchItem.classList.remove('entered');
        this.watchItem.classList.remove('exit');
  		}
  }

  $('.comp__scrollmoniter-el').each(function(index, el) {
    // let targetOffset = -($(this).outerHeight()*0.25);
    let watcher = scrollMonitor.create(el, {top:-50, bottom: -200});
    watcher.stateChange(addClass);
		addClass.call( watcher );
  });


});
