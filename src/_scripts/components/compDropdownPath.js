'use restrict'

import $ from 'jquery';
import tweenMax from 'gsap';

export default () => {
  console.log('dropdown path loaded');
  let pathList = $('.path-list ');

  pathList.hover(function() {
    $(this).addClass('hover').removeClass('hover-out');
    $(this).siblings().removeClass('hover');
    tweenMax.fromTo('.hover .path-list__level', 0.5, {
      display: 'none',
      y: 50,
      opacity: 0
    },{
      display: 'block',
      y: 0,
      opacity: 1,
      ease: Sine.easeInOut
    });
    tweenMax.staggerFromTo('.hover .path-list__level .level__item', 0.2, {
      opacity: 0,
      y: 10
    },{
      opacity: 1,
      y: 0,
      ease: Sine.easeInOut,
      delay: 0.2
    },0.05);

    // $(this).find('.path-list__level').css('display', 'block');
  }, function() {
    /* Stuff to do when the mouse leaves the element */
    $(this).removeClass('hover').addClass('hover-out');
    $(this).siblings().removeClass('hover-out');
    tweenMax.fromTo('.hover-out .path-list__level', 0.5, {
      display: 'block',
      y: 0,
      opacity: 1
    },{
      display: 'none',
      y: 50,
      opacity: 0,
      ease: Expo.easeInOut
    })
  });

}
