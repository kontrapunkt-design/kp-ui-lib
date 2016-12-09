'use restrict'
import $ from 'jquery';

export default () => {
  console.log('load video controls')

  // Video
  let video = $('#video');

  // Buttons
  let playButton = $('#play-pause');
  let muteButton = $('#mute');
  let fullScreenButton = $("#fullscreen");

  // Sliders
  let timeBar = $('.time-bar')
  // Event listener for the play/pause button
  playButton.click(function(event) {
    /* Act on the event */
    if (video[0].paused == true) {
      // Play the video
      video[0].play();

      // Update the button text to 'Pause'
      $(this).addClass('pause').removeClass('play');
    } else {
      // Pause the video
      video[0].pause();

      // Update the button text to 'Play'
      $(this).addClass('play').removeClass('pause');
    }
  });

  // Event listener for the mute button
  muteButton.click(function(event) {
    /* Act on the event */
      if (video[0].muted == false) {
        // Mute the video
        video[0].muted = true;
      } else {
        // Unmute the video
        video[0].muted = false;
      }
  });

  // Event listener for the full-screen button
  fullScreenButton.click(function(event) {
    /* Act on the event */
    if (video.requestFullscreen) {
      video[0].requestFullscreen();
    } else if (video[0].mozRequestFullScreen) {
      video[0].mozRequestFullScreen(); // Firefox
    } else if (video[0].webkitRequestFullscreen) {
      video[0].webkitRequestFullscreen(); // Chrome and Safari
    }
  });

	//before everything get started
	video.on('loadedmetadata', function() {
		//set video properties
		$('.current').text(timeFormat(0));
		$('.duration').text(timeFormat(video[0].duration));
		//start to get video buffering data
		setTimeout(startBuffer, 150);

	});

	//display video buffering bar
	let startBuffer = function() {
		let currentBuffer = video[0].buffered.end(0);
		let maxduration = video[0].duration;
		let perc = 100 * currentBuffer / maxduration;
		$('.bufferBar').css('width',perc+'%');

		if(currentBuffer < maxduration) {
			setTimeout(startBuffer, 500);
		}
	};

	//display current video play time
	video.on('timeupdate', function() {
		let currentPos = video[0].currentTime;
		let maxduration = video[0].duration;
		let perc = 100 * currentPos / maxduration;
		timeBar.css('width',perc+'%');
		$('.current').text(timeFormat(currentPos));
	});

	//CONTROLS EVENTS

	//video ended event
	video.on('ended', function() {
		$('.btnPlay').removeClass('paused');
		video[0].pause();
	});


	//video seeked event
	video.on('seeked', function() { });

	//video waiting for more data event
	video.on('waiting', function() {
	});

	//VIDEO PROGRESS BAR
	//when video timebar clicked
	let timeDrag = false;	/* check for drag event */
	$('.progress').on('mousedown', function(e) {
		timeDrag = true;
		updatebar(e.pageX);
	});
	$(document).on('mouseup', function(e) {
		if(timeDrag) {
			timeDrag = false;
			updatebar(e.pageX);
		}
	});
	$(document).on('mousemove', function(e) {
		if(timeDrag) {
			updatebar(e.pageX);
		}
	});
	let updatebar = function(x) {
		let progress = $('.progress');

		//calculate drag position
		//and update video currenttime
		//as well as progress bar
		let maxduration = video[0].duration;
		let position = x - progress.offset().left;
		let percentage = 100 * position / progress.width();
		if(percentage > 100) {
			percentage = 100;
		}
		if(percentage < 0) {
			percentage = 0;
		}
		timeBar.css('width',percentage+'%');
		video[0].currentTime = maxduration * percentage / 100;
	};


	//Time format converter - 00:00
	let timeFormat = function(seconds){
		let m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
		let s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
		return m+":"+s;
	};


}
