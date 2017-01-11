'use restrict'

import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';

export default () => {
  console.log('isotype loaded');
  let IsotopTarget = document.querySelector('.thumbnails-isotype-grid');

  imagesLoaded(document.querySelector('.thumbnails-isotype-grid'), function(instance){
    console.log('all loaded');
      let iso = new Isotope('.thumbnails-isotype-grid', {
        itemSelector: '.item',
        percentPosition: true,
        layoutMode: 'masonry',
        masonry: {
          columnWidth: '.grid-sizer'
        }
      });
  })

  // IsotopTarget.imagesLoaded(function() {
  // });
}
