// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import Barba from 'barba.js';
import gsap from 'gsap';
// import compPjaxLoad from './components/compPjaxLoad';



$(() => {
  // new Link(); // Activate Link modules logic
  console.log('Welcome to Yeogurt, using pjax to load page');
    var lastElementClicked;
    Barba.Pjax.init();
    Barba.Prefetch.init();

    Barba.Dispatcher.on('linkClicked', function(el) {
      lastElementClicked = el;
    });

    // expand animations
    var expandTransition = Barba.BaseTransition.extend({
      start: function(){
        console.log('expendTranstion start')
        this.originalThumb = lastElementClicked;

        Promise
          .all([this.newContainerLoading, this.enlargeThumb()])
          .then(this.showNewPage.bind(this));
      },

      enlargeThumb: function(){
        var deferred = Barba.Utils.deferred();

        var thumbPosition = this.originalThumb.getBoundingClientRect();
        this.cloneThumb = this.originalThumb.cloneNode(true);
        this.cloneThumb.style.position = 'absolute';
        this.cloneThumb.style.top = thumbPosition.top + 'px';
        this.oldContainer.appendChild(this.cloneThumb);

        TweenMax.fromTo(this.cloneThumb, 0.3 ,
          {
            top: thumbPosition.top,
            left: thumbPosition.left,
            width: thumbPosition.width,
          },
          {
            top: 0,
            left: 0,
            width: window.innerWidth,
            onComplete: function(){
              deferred.resolve();
            }
          }
        );

        return deferred.promise;
      },

      showNewPage: function(){
        this.newContainer.style.visibility = 'visible';
        var compTitle = this.newContainer.querySelector('.comp__header .comp--content');
        var compBack = this.newContainer.querySelector('.comp__back');
        TweenMax.fromTo(compTitle, 0.5, {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1
        });
        TweenMax.fromTo(compBack, 0.5, {
          y: -50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1
        });
        this.done();
      }
    });

    // shrink animations
    var shrinkTransition = Barba.BaseTransition.extend({
      start: function(){
        console.log('shrinkTranstion start');
        this.newContainerLoading.then(this.shrinkImage.bind(this));
      },

      shrinkImage: function(){
        var _this = this;

        this.oldContainer.style.zIndex = '900';
        this.newContainer.style.visibility = 'visible';

        var href = Barba.HistoryManager.prevStatus().url.split('/').pop();
        var destThumb = this.newContainer.querySelector('a[href="' + href + '"]');
        var destThumbPosition = destThumb.getBoundingClientRect();
        var fullImage = this.oldContainer.querySelector('.comp__header .comp--media');
        var compTitle = this.oldContainer.querySelector('.comp__header .comp--content');
        var compThumbTitle = this.newContainer.querySelectorAll('.thumbnail .thumbnail--content');

        var tweenCompBack = TweenMax.to('.comp__back', 0.5, {
          y: -50,
          opacity: 0
        });


        var tweenCompTitle = TweenMax.to(compTitle, 0.2, {
          y: 50,
          opacity: 0
        });

        var tweenFullImage = TweenMax.to(fullImage, 0.5, {
          top: destThumbPosition.top,
          left: destThumbPosition.left,
          height: destThumbPosition.height,
          width: destThumbPosition.width,
          opaciy: 0,
          delay: 0.5,
        });

        var tweenCompThumbTitle = TweenMax.fromTo(compThumbTitle, 0.2, {
          y: 20,
          opacity: 0
        },{
          y: 0,
          opacity: 1,
          delay: 0.9,
          onComplete: function(){
            _this.done();
          }
        });

      }
    });

    // get transition to barba
    Barba.Pjax.getTransition = function(){
      var transitionObj = expandTransition;

      if(Barba.HistoryManager.prevStatus().namespace === 'detail'){
        transitionObj = shrinkTransition;
      }

      return transitionObj;

    };
});
