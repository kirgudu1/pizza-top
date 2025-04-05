var radialProgressSwiperPlugin = {
		name: 'radialProgress',
		fn: function (slider, oDot, duration) {
			var start = performance.now();
			var parent = oDot.parents('.swiper-pagination-bullet');
			requestAnimationFrame(function animateSwiperDot(time) {
				var timePassed = time - start;

				if (timePassed > duration) {
					timePassed = duration;
				}
				if (parent.index() != slider.realIndex || !slider.autoplay.running) {
					oDot.find('.prg_bar_mask.full, .fill').css('transform', 'rotate(0deg)');
					return;
				}
				var percent = 100 / (duration / timePassed);
				var gradus = percent * 1.8;

				oDot.find('.prg_bar_mask.full, .fill').css('transform', 'rotate('+gradus+'deg)');
				if ((timePassed <= duration)) {
				  requestAnimationFrame(animateSwiperDot);
				}
			});
		},
		create: function create() {
			this.initRadialTime = performance.now();
		},
		params: {
			pagination: {
				renderBullet: function (index, className) {
				  return '<span class="' + className + '">' + (index + 1) + '<span class="prg_bar"><span class="prg_bar_mask full"><span class="fill"></span></span><span class="prg_bar_mask half"><span class="fill"></span></span></span></span>';
				}
			}	
		},
		on: {
			paginationRender: function() {
				var shift = performance.now() - this.initRadialTime;
				circle = $(this.$el).find('span.swiper-pagination-bullet:first .prg_bar');
				radialProgressSwiperPlugin.fn(this, circle, this.passedParams.autoplay.delay + shift);
			},
			slideChange: function() {
				if (this.passedParams.autoplay) {
					var slider = this;
					var circle = $(this.$el).find('.prg_bar');
					if (circle.length) {
						circle.find('.prg_bar_mask.full, .fill').css('transform', 'rotate(0deg)');
					}
					var circle = $(this.$el).find('span.swiper-pagination-bullet-active .prg_bar');
					if (circle.length) {
						radialProgressSwiperPlugin.fn(slider, circle, slider.passedParams.autoplay.delay + slider.passedParams.speed );
					}
				}
				
			}
		}
	};