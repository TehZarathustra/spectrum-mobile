(function() {
	// on ready event
	$(function() {
		// light switch
		(function() {
			var el = $('#light-switch'),
				aEl = $('.service-custom-electrical .fade-in'),
				defaultEl = $('.service-custom-electrical .default'),
				aEld = $('.smart-images');

			// getting bgs
			var fadeSrc = aEl.find('img').attr('src'),
				defaultSrc = defaultEl.find('img').attr('src');

			setTimeout(function() {
				defaultEl.css('background-image', 'url('+defaultSrc+')');
				aEl.css('background-image', 'url('+fadeSrc+')');
			},200);

			// $('.event-bg').bind('touchstart', function() {
			// 	el = $(this).parents('.m-service').data('el');

			// 	$('.'+el).toggleClass('clicked');
			// });

			$('.switch-button-devices').bind('touchstart', function() {
				el = $('.owl-item.active .switch-button-devices');

				if ($('.owl-item.active .smart-bg').hasClass('active')) {
					$('.owl-item.active .smart-bg').removeClass('active');
					el.removeClass('active');
					return;
				}

				setTimeout(function() {
					$('.owl-item.active .smart-bg').addClass('active');
					el.addClass('active');
				},50);
			});
		})();

		$('.playBut').bind('touchstart', function() {
			var url = 'https:'+$('#event-video').data('property').split(',')[0].split(':')[2].slice(0, -1);
			window.open(url, '_blank').focus();
		});


		function throttle(func, ms) {

		  var isThrottled = false,
		    savedArgs,
		    savedThis;

		  function wrapper() {

		    if (isThrottled) { // (2)
		      savedArgs = arguments;
		      savedThis = this;
		      return;
		    }

		    func.apply(this, arguments); // (1)

		    isThrottled = true;

		    setTimeout(function() {
		      isThrottled = false; // (3)
		      if (savedArgs) {
		        wrapper.apply(savedThis, savedArgs);
		        savedArgs = savedThis = null;
		      }
		    }, ms);
		  }

		  return wrapper;
		}

		if (window.DeviceOrientationEvent) {
		  window.addEventListener("deviceorientation", throttle(orientation, 700), false);
		  console.log("DeviceOrientationEvent is supported");
		} else {
		  console.log("DeviceOrientationEvent is not supported");
		}

		function orientation(event) {
			if (!$('.slide-out-form').hasClass('active')) {
			var el = $('.section.active .event-bg > div'),
				fade = $('.section.active .event-bg .fade'),
				bar = $('.switch-bar'),
				multiplier = (Math.abs(Math.ceil(event.gamma/5 * 1.4)));
			  if (event.gamma > -50 && event.gamma < 50) {
				  el.css({
				  	'background-position': (event.gamma + 50) + '%'
				  });
				  if (multiplier > 5) {
				  fade.css({
				  	'opacity':  multiplier > 9 ? multiplier : '.' + multiplier
				  });
				} else {
					fade.css({
				  	'opacity': 0
				  });
				}
				  console.log(multiplier);
				  if ($('.m-lutron').hasClass('active')) {
				  	bar.css({
				  		'height': (Math.abs(Math.ceil(event.gamma/5)) * 10) + '%'
				  	})
				  }
				} else if (event.gamma < -50) {
					el.css({
				  		'background-position': '0%'
				  	})
				  	fade.css({
				  		'opacity': '1'
				  	})
				  	if ($('.m-lutron').hasClass('active')) {
				  	bar.css({
				  		'height': '100%'
				  	})
				  }
				}
				 else if (event.gamma > 50) {
				 	el.css({
				  	'background-position': '100%'
				  })
				 	fade.css({
				  		'opacity': '1'
				  	})
				  	if ($('.m-lutron').hasClass('active')) {
				  	bar.css({
				  		'height': '100%'
				  	})
				  }
				 }
			}
		}

		// about text
		(function() {
			var btn = $('.about-btn'),
				container = $('.index-about'),
				stateOpen = false,
				hideBtn = $('.hide-index');


			btn.addClass('fadeOutUp');

			setTimeout(function() {
				container.addClass('active');
			},700);

			setTimeout(function() {
				container.find('.text').css({
					'max-height': '500px'
				});
				setTimeout(function() {
					$('.index-sign').addClass('show-s');
					setTimeout(function() {
						$('.index-sign').addClass('active');
					},500);
				},1000);
			},2000);

			stateOpen = true;
		})();

		// sidebar nav
		(function() {
			if ($('.hamburger').length) {
				var container = document.querySelector('.master-wrap');
				var main = document.querySelector('.page-wrap');

				function toggleSidebar() {
					isShowingSidebar() ? hideSidebar() : showSidebar();
				}

				function showSidebar() {
					container.classList.add('show-sidebar');
				}

				function hideSidebar() {
					container.classList.remove('show-sidebar');
				}

				function isShowingSidebar() {
					return container.classList.contains('show-sidebar');
				}

				document.querySelector('.hamburger').addEventListener('click', toggleSidebar, false);

				container.addEventListener('click', function(e){
					if(isShowingSidebar() && main.contains(e.target)){
						e.preventDefault();
						hideSidebar();
					}
				}, true);
			}
		})();

		// bedroom
		(function() {
			var parent = $('.switch-colors'),
				bg = $('.bedroom-switch');

			parent.click(function(event) {
				var el = $(event.target);
				bg.removeClass('lutron-black lutron-gold lutron-white');

				if (el.hasClass('black')) {
					bg.addClass('lutron-black');
				} else if (el.hasClass('gold')) {
					bg.addClass('lutron-gold');
				} else {
					bg.addClass('lutron-white');
				}
			});

			bg.bind('touchstart', function() {
				if (bg.hasClass('active')) {
					bg.removeClass('active');
					$('.lutron-bg').removeClass('active');
					return;
				}

				setTimeout(function() {
					bg.addClass('active');
					$('.lutron-bg').addClass('active');
				},50)
			});
		})();

		// form focus
		(function() {
			// in
			$('input, textarea').focus(function() {
				$(this).parent().find('.text').hide();
			});

			// out
			$('input, textarea').focusout(function() {
				var el = $(this);
				if (el.val().length < 1) {
					el.parent().find('.text').show();
				}
			});
		})();
		(function() {
			$(document).bind('touchend',function() {
				$('.slide-out-form').removeClass('active');
			});

			$('.slide-out-form').bind('touchend',function(e) {
				e.stopPropagation();
			});

			$('a.info-mobile').bind('touchend',function(e) {
				e.stopPropagation();
			});

			$('a.info-mobile').bind('touchend',function(e) {
				e.preventDefault();
				$('.slide-out-form').addClass('active');
			});
		})();
	});
})()
