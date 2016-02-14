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

			$('.event-bg').bind('touchend click', function() {
				el = $(this).parents('.m-service').data('el');

				$('.'+el).toggleClass('clicked');
			});

			$('.switch-button-devices').bind('touchend', function() {
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

		$('.playBut').bind('touchend', function() {
			var url = 'https:'+$('#event-video').data('property').split(',')[0].split(':')[2].slice(0, -1);
			window.open(url, '_blank').focus();
		});

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

			bg.bind('touchend', function() {
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

		// modals
		(function($) {
			$(function() {
				$(window).on("resize", resizeForm);
				jQuery.fn.center = function(parent) {
					if (parent) {
						parent = this.parent();
					} else {
						parent = window;
					}
					this.css({
						"top": (($(window).height() - $(this).outerHeight()) / 2) + "px",
						"left": (((jQuery(parent).width() - this.outerWidth()) / 2) + jQuery(parent).scrollLeft() + "px")
					});
					return this;
				};

				function resizeForm() {
					jQuery('.pops').center();
				}

				$('.m-close, .page-overlay').bind('click touchend', function() {
					$('.page-overlay, .pops').fadeOut(500);
				});

				// pops duplicate
				var prevHandler = $('.image-pop .image-prev'),
					nextHandler = $('.image-pop .image-next'),
					owlGlobal = false,
					imageGlobal;

				prevHandler.click(function() {
					if (owlGlobal) {
					$('.gallery-slider').trigger('prev.owl.carousel');
					var image = $('.owl-item.active').find('img').attr('src');
					$('.image-pop img').attr('src', image);
					} else {
						if (imageGlobal.parent().prev().find('img').attr('src')) {
							var image = imageGlobal.parent().prev().find('img').attr('src');
							$('.image-pop img').attr('src', image);
							imageGlobal = imageGlobal.parent().prev().find('.caption');
						}
					}

					$('.image-pop').center();
				});

				nextHandler.click(function() {
					if (owlGlobal) {
						$('.gallery-slider').trigger('next.owl.carousel');
						var image = $('.owl-item.active').find('img').attr('src');
						$('.image-pop img').attr('src', image);
					} else {
						if (imageGlobal.parent().next().find('img').attr('src')) {
							var image = imageGlobal.parent().next().find('img').attr('src');
							$('.image-pop img').attr('src', image);
							imageGlobal = imageGlobal.parent().next().find('.caption');
						}
					}

					$('.image-pop').center();
				});

				function add_modal(trigger,modal,close,pic) {
					close = (typeof close === 'undefined') ? false : true;
					pic = (typeof pic === 'undefined') ? false : true;
					$(''+trigger+'').click(function(e) {
						if ($(event.target).data('gtype') == 'owl') {
							owlGlobal = true;
						} else {
							owlGlobal = false;
							imageGlobal = $(event.target);
						}
						close == true ? $('.pops').fadeOut(100) : close;
						if (pic == true) {
							var image = $(this).find('img').attr('src');
							$('.image-pop img').attr('src', image);
						}
						e.preventDefault();
						$('.page-overlay, .'+modal+'').fadeIn(400);
						jQuery('.'+modal+'').center();
					});
				};

				add_modal('.gallery-slider .item','image-pop',false,true);
				add_modal('.add-gallery .item','image-pop',false,true);
				add_modal('a.info','info-pop',false,false);
			});
		})(jQuery);

	});
})()
