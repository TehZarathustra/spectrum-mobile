(function() {
	// Check for phones
	var mobileCheck;
	if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		mobileCheck = true;
	} else {
		mobileCheck = false;
	};

	$(function() {
		setTimeout(function() {
			$('.loading-screen').hide(0);
		},1400);

		$('.custom-el-sl').owlCarousel({
			items: 1,
			nav: true,
			autoplayTimeout: 5000,
			animateOut: 'fadeOut',
			loop: true,
			mouseDrag: false,
			touchDrag: false,
			pullDrag: false,
			autoplay: true,
			navText: [
				"<i class='fa fa-angle-left'></i>",
				"<i class='fa fa-angle-right'></i>"
			]
		});

		$('.event-sl').owlCarousel({
			items: 1,
			nav: true,
			autoplayTimeout: 5000,
			animateOut: 'fadeOut',
			loop: true,
			mouseDrag: false,
			touchDrag: false,
			pullDrag: false,
			autoplay: true,
			navText: [
				"<i class='fa fa-angle-left'></i>",
				"<i class='fa fa-angle-right'></i>"
			]
		});

		$('.owl-devices').owlCarousel({
			items: 1,
			nav: true,
			loop: true,
			autoplay: true,
			autoplayTimeout: 5000,
			mouseDrag: false,
			touchDrag: false,
			pullDrag: false,
			navText: [
				"<i class='fa fa-angle-left'></i>",
				"<i class='fa fa-angle-right'></i>"
			]
		});

		// right slider
		$('.items-right-slider').owlCarousel({
			items: 2,
			nav: true,
			loop: true,
			autoplay: true,
			autoplayTimeout: 5000,
			navText: [
				"<i class='fa fa-angle-left'></i>",
				"<i class='fa fa-angle-right'></i>"
			]
		});

		var lTimer = 0;


		// fullpagage
		var oldSlimScroll = $.fn.slimScroll;
		$.fn.slimScroll = function( options ){
		  options.wheelStep = 25;
		  return oldSlimScroll.apply(this, [options] );
		};
		$('.fullpage').fullpage({
			anchors:['firstPage', 'secondPage',
			'thirdPage', 'fourthPage', 'fifthPage',
			'sixthPage', 'seventhPage', 'eigthPage',
			'ninthPage', 'tenthPage', 'eleventhPage'],
			scrollOverflow: true,
			slidesNavigation: false,
			navigation: false,
			controlArrows: false,
			css3: false,
			fitToSection: true,
			fitToSectionDelay: 500,
			autoScrolling: true,
			scrollingSpeed: 1000,
			touchSensitivity: 20,

			onLeave: function (index, nextIndex, direction) {
			},

			afterLoad: function(anchorLink, index) {
				
			},

			afterRender: function () {
			}
			});
	});
})(jQuery);
