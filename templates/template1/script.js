var mysitekey = '6LfZ8JgaAAAAAJ7k7Rv9dgH8v97rFrgT7ygJdKGB';
var gcaptcha = function() {
	$().ready(function() {
		$('.grecaptcha').each(function(index, element) {
			var input = $(this);
			var id = $(this).attr('id');
			if (typeof(id) === 'undefined') {
				id = 'recaptcha_' + Math.random() + Math.random();
				$(this).attr('id', id);

				window['captcha_'+id] = grecaptcha.render(id, {
					sitekey		: mysitekey,
					size		: 'invisible',
					callback	: function(){
						//       console.log(input.closest('form'));
						verifyCallback(input.closest('form'));
					}
				});

			}
		});
	});
};

//$.fn.validator.Constructor.DEFAULTS.focus = false;

/*Grecaptcha feature*/
function verifyCallback(form) {
	var formData = new FormData(form.get(0));
	formData.append($(form).data('ajax')+'Submit', 1);

	input = form.find('.grecaptcha');
	id = input.attr('id');
	$.ajax({
		data: formData,
		type: "POST",
		dataType: 'json',
		processData: false,
		contentType: false,
		success: function (data) {

			console.log('tyt');

			if(form.hasClass("nomodal")){
				/*форма не модальная*/
				form.trigger("reset");
				form.append("<div class='notification'>"+ "<span class='notification__header'>"+data.title+"</span>"+"<span class='notification__text'>"+ data.text+"</span><i class='notification__close fa fa-times'></i>" +"</div>");
				form.find(".notification").addClass(data.status).slideDown();
				if(typeof data.location !== "undefined"){
					setTimeout(function(){ location = data.location }, 5000);
				}

			}
			else{
				form.find('.modal-form__input-area').fadeOut();
				form.find('.modal-form__description').fadeOut();
				form.find('.modal-form__success').html('<p class="modal-form__success-text">Ваше сообщение получено, мы свяжемся с Вами в ближайшее время!</p>');
				form.find('.main__btn').attr('disabled', true);
				form.find('.file-field').fadeOut();

				form.find("input[type='text'],input[type='email'],input[type='tel'], textarea").val("");
				var item = form.find(".submit");
				item.addClass("active");
				setTimeout(function(){
					item.removeClass("active");
				}, 6000);
				setTimeout(function(){
					form.addClass("sent");
				}, 5500);
				form.find("input[type='submit']").prop("disabled", true).val("Заявка отправлена");
			}

			grecaptcha.reset(window['captcha_'+id], {
				sitekey		: mysitekey,
				size		: 'invisible',
				callback	: function(){
					verifyCallback(input.closest('form'));
				}
			});
		}
	});
	return false;
};


//Swiper.use(radialProgressSwiperPlugin);

/*force set the height of video slide*/
function setHomePageVideoHeight(){
	var slider_boxHeight = $(".homepage-slider").height();
	$(".swiper-slide.video_item").height(slider_boxHeight);
}

function scrollRevealInit() {
	/* Настройка анимации */
	ScrollReveal().reveal('.animate-1', {
		duration: 600,
		delay: 30,
		mobile: false,
		interval: 30,
		easing: 'cubic-bezier(0.32, 0.88, 0.57, 0.99)',
		reset: false,
		scale: 1,
		distance: '20px',
		origin: 'bottom'
	});
	ScrollReveal().reveal('.animate-2', {
		duration: 300,
		delay: 50,
		mobile: false,
		interval: 20,
		easing: 'cubic-bezier(0.32, 0.88, 0.57, 0.99)',
		reset: false,
		scale: 1,
		distance: '40px'
	});
	ScrollReveal().reveal('.animate-3', {
		duration: 400,
		delay: 0,
		mobile: false,
		interval: 30,
		easing: 'cubic-bezier(0.32, 0.88, 0.57, 0.99)',
		reset: false,
		scale: 1,
		distance: '-5px'
	});
	ScrollReveal().reveal('h1', {
		duration: 500,
		delay: 50,
		mobile: false,
		interval: 50,
		easing: 'cubic-bezier(0.32, 0.88, 0.57, 0.99)',
		reset: false,
		scale: 1,
		distance: '-20px',
		origin: 'bottom'
	});
	/* Настройка анимации - END */
}

	
function recomend_slider() {
    if ($(document).find('.recomend_block').length > 0) {
        let sliderRec = $(document).find('.recomend_block');
    	new Swiper(sliderRec, {
            width: 300,
    		spaceBetween: 10,
    	});
	}
}

function switchActiveColor(elem){
	$("body").find(".color-item").removeClass("active");
	$("body").find(".prop-item").removeClass("active");
	elem.addClass("active");
}

function switchActiveProp(elem){
	$("body").find(".prop-item").removeClass("active");
	elem.addClass("active");
}

function forcedPickFirstColor(){
	$("body").find(".color-selector .color-item[data-enabled='true']").first().trigger("click");

}

function pickProductProp() {
	$("body").on("click", ".prop-item", function(){
		if ($(this).attr("data-enabled") == "true"){
			switchActiveProp($(this));
			/*ищем активный товар*/
			var selectedColor = $("body").find(".color-item.active").attr("title");
			var selectedProp = $(this).attr("title");
			var selectedProductObj = $("body").find(".modif-item[data-prop-1='"+selectedColor+"'][data-prop-2='"+selectedProp+"']");
			var selectedProduct = selectedProductObj.attr("data-protuct_id");
			var selectedProductPrice = selectedProductObj.attr("data-price");
			var selectedProductWeight  = selectedProductObj.attr("data-weight");
			var selectedProductOldPrice = selectedProductObj.attr("data-old-price");
			/*Жмем в нужную модификацию*/

			$("body").find(".select-mod__wrapper").find("label[for='mod_"+selectedProduct+"']").trigger("click");
			/*меняем в карточке цену*/
			$("body").find(".price_amount").html(parseInt(selectedProductPrice));
			$("body").find(".weight_amount").html(parseInt(selectedProductWeight));
			$("body").find(".price_amount_old").html(parseInt(selectedProductOldPrice));

		}

	});
}

function pickProductColor() {
	$("body").on("click", ".color-item", function(){
		if ($(this).attr("data-enabled") == "true"){
			switchActiveColor($(this));
			$("body").find(".prop-item").attr("data-enabled", false);
			var curValue = $(this).attr("title");
			/*ищем модификации в наличии с этим цветом*/
			var avaliableSecondParams = $("body").find(".modif-item[data-prop-1='"+curValue+"'][data-rest!='0.00']");
			/*Устанавливаем состояния для выбора 2 параметра*/
			avaliableSecondParams.each(function(){
				$("body").find(".prop-item[title='"+$(this).attr("data-prop-2")+"']").attr("data-enabled", true);
			});
			$("body").find(".prop-item[data-enabled='true']").first().trigger("click");

			/*если выведен только цвет без второго пар-ма*/
			if ($("body").find(".prop-selector").length == 0){
				var selectedProductObj = $("body").find(".modif-item[data-prop-1='"+curValue+"']");
				var selectedProduct = selectedProductObj.attr("data-protuct_id");
				var selectedProductPrice = selectedProductObj.attr("data-price");
				var selectedProductWeight  = selectedProductObj.attr("data-weight");
				/*Жмем в нужную модификацию*/
				$("body").find(".select-mod__wrapper").find("label[for='mod_"+selectedProduct+"']").trigger("click");
				/*меняем в карточке цену*/

				$("body").find(".price_amount").html(parseInt(selectedProductPrice));
				$("body").find(".weight_amount").html(parseInt(selectedProductWeight));
			}

			/*подменяем картинки в галерее*/
			var imgLarge = $(".modif-item[data-prop-1='"+curValue+"']").first().attr("data-img-large");
			var imgSmall = $(".modif-item[data-prop-1='"+curValue+"']").first().attr("data-img-small");
			if (imgLarge != ""){
				$("body").find(".swiper-wrapper #current-img").attr("src", imgLarge);
				$("body").find(".little-imgs .swiper-slide-active img").attr("src", imgLarge).attr("data-img", imgLarge)
			}
		}

	});
}

(function(a){var b=function(f,c){var e=a.document.getElementsByTagName("script")[0];var d=a.document.createElement("script");d.src=f;d.async=true;e.parentNode.insertBefore(d,e);if(c&&typeof(c)==="function"){d.onload=c}return d};if(typeof module!=="undefined"){module.exports=b}else{a.loadJS=b}}(typeof global!=="undefined"?global:this));

pickPointParams = {
	'city': ''
};
function randomInteger(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}
function price_format(f) {
	return c = 0, d = ",", t = " ", s_left = "", s_right = "", f *= 1, i = parseInt(f = Math.abs(f).toFixed(c)) + "", j = 3 < (j = i.length) ? j % 3 : 0, s_left + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(f - i).toFixed(c).slice(2) : "") + s_right
}
function citySelectize() {
	if ($('#data-sity').length) {
		$('#data-sity').selectize({
			valueField: 'id',
			labelField: 'name',
			searchField: 'name',
			options: [],
			create: false,
			render: {
				option: function (item, escape) {

					return '<div>' +
						'<span class="title">' +
						'<span class="name">' + escape(item.name) + '</span>' +
						'</span>' +
						'</div>';
				}
			},
			load: function (query, callback) {
				if (!query.length)
					return callback();
				$.ajax({
					type: 'POST',
					dataType: 'json',
					data: {
						getCity: query
					},
					error: function () {
						callback();
					},
					success: function (res) {
						callback(res);
					}
				});
			}
		});
	}
}
(function (jQuery) {
	var methods = {
		show: function () {
			$('body').css('cursor', 'wait');
			var fade_div = $('#ajaxLoader'), jWindow = $(window);
			if (fade_div.length === 0) {
				fade_div = $('<div></div>')
					.appendTo($('.add-load'))
					.hide()
					.prop('id', 'ajaxLoader')
					.css('position', 'absolute')
					.append($('<div><svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#00f">\n' +
										'    <g fill="none" fill-rule="evenodd">\n' +
										'        <g transform="translate(1 1)" stroke-width="2">\n' +
										'            <circle stroke-opacity=".2" cx="18" cy="18" r="18"/>\n' +
										'            <path d="M36 18c0-9.94-8.06-18-18-18">\n' +
										'\n' +
										'            </path>\n' +
										'        </g>\n' +
										'    </g>\n' +
										'</svg></div>'))
			}
			fade_div.show();
			$('.add-load').addClass('proceed_add');
		},

		hide: function ( ) {
			$('body').css('cursor', 'default');
			$('#ajaxLoader').hide();
			$('.proceed_add').removeClass('proceed_add');

		}

	};

	optInterval = null;

	// Функции без создания коллекции
	jQuery.extend({
		cartCallback: function (data, oldprice, status, jqXHR) {
			$('.little-cart').replaceWith(data.little);
			$('#page_cart').replaceWith(data.cart);

			$.loadingScreen('hide');

			HoldLabelFocus();
			HoldLabelPromocodeOnReload();
		},

		setCountItem: function(id, step) {
			var val = parseInt($('#'+id).val());
			val += step;
			if (val <= 0) {
				val = 1;
			}
			$('[data-price] span').html(price_format(parseInt($('[data-price]').attr('data-price')) * val));
			$('#'+id).val(val);
		},
		getOnestepPaymentSystemList: function (path, jForm)
		{
			var conditions = jForm.find('[type="hidden"][name="shop_delivery_condition_id"]:not(:disabled), [name="shop_delivery_condition_id"]:not(:disabled):checked, [name="shop_delivery_condition_id"]:not(:disabled) option:selected');
			var shop_delivery_condition_id = $(conditions.get(0)).val();
			$.clientRequest({
				path: path + '?oneStepCheckout&showPaymentSystem&shop_delivery_condition_id=' + shop_delivery_condition_id,
				'callBack': $.getOnestepPaymentSystemListCallback,
				context: jForm.find("#paysystemsList")
			});
		},
		getOnestepPaymentSystemListCallback: function (data, status, jqXHR)
		{
			var self = jQuery(this);
			$.loadingScreen('hide');
			$(this).empty();
			$.each(data.payment_systems, function (key, object) {
				var rand = randomInteger(100000, 999999);
				var option = $('<div class="oformlenie-box__item">'
											+ '<input type="radio" value="' + object.id + '" id="pay-' + rand + '" name="shop_payment_system_id" required="required"/>'
											+ '<label class="rb2" for="pay-' + rand + '"><div class="radiobtn"></div><span>' + object.name + '</span></label></div>');
				self.append(option);
			});
			jQuery(self).find('input[type=radio]:first').prop('checked', true).attr('checked', 'checked');
		},
		clientRadioDeliveryCallback: function (data, status, jqXHR) {
			$.loadingScreen('hide');

			jQuery(this).empty();
			for (var key in data)
			{
				var rand = randomInteger(1000000, 99999999);
				var option = $('<div class="oformlenie-box__item">'
											+ '<input type="radio" value="' + key.substr(1) + '" id="delivery_' + rand + '" name="shop_delivery_condition_id" required="required" data-prices="' + data[key].price + '" onchange="$.set_delivery(this);"/>'
											+ '<label class="rb2" for="delivery_' + rand + '"><div class="radiobtn"></div><span>' + data[key].name + ((data[key].price > 0) ? '&nbsp;(<span class="delivery_price">' + data[key].price + '</span>)' : '') + '</span></label></div>');
				$(this).append(option);
			}
			$(this).find('input[type=radio]:first').prop('checked', true).attr('checked', 'checked');
			$.set_delivery($(this).find('input[type=radio]:checked'));
			$.getOnestepPaymentSystemList('/menu/cart/order/', $('.form-cart'));
			clearTimeout(window.delalert);
			$('.deliveryAlert').remove();
		},
		getOnestepDeliveryList: function (path, jForm)
		{
			var shop_country_id = 175,
					shop_country_location_id = 'undefined';
			shop_country_location_city_id = jForm.find("#data-sity").val(),
				postcode = jForm.find("#postcode").val(),
				shop_country_location_city_area_id = jForm.find("#shop_country_location_city_area_id").val();

			window.delalert = setTimeout(function () {
				$('<div class="deliveryAlert"><div>Выполняется расчет стоимости доставки.<br/>Пожалуйста подождите.</div></div>').appendTo('body');
			}, 500);

			$.clientRequest({
				path: path + '?ajaxLoad&showDelivery=1&postcode=' + postcode + '&shop_country_id=' + shop_country_id + '&shop_country_location_id=' + shop_country_location_id + '&shop_country_location_city_id=' + shop_country_location_city_id + '&shop_country_location_city_area_id=' + shop_country_location_city_area_id,
				'callBack': $.clientRadioDeliveryCallback,
				context: jForm.find("#deliveriesList")
			});
		},
		getOnestepDeliveryListCallback: function (data, status, jqXHR)
		{
			$.loadingScreen('hide');
			$(".oformlenie-box__list").empty();

			$.each(data.delivery, function (key, object) {
				// ' + object.name + '
				var option = $('<div class="oformlenie-box__item">'
											+ '<input type="radio" value="' + object.shop_delivery_condition_id + '" id="delivery-' + object.shop_delivery_condition_id + '" name="shop_delivery_condition_id" required="required" data-prices="0" onchange="$.set_delivery(this);"/>'
											+ '<label class="rb2" for="delivery-' + object.shop_delivery_condition_id + '"><div class="radiobtn"></div><span>' + object.name + '</span></label></div>');
				$('.oformlenie-box__list').append(option);
			});
		},
		set_samovivoz: function(self) {
			$("#data-address").fadeOut().prop("required", 0);
			$('#delivery_7_10').trigger('click');
			$.getOnestepPaymentSystemList('/menu/cart/order/', $('.form-cart'));
		},
		set_delivery: function (self) {
			var price = parseInt($(self).attr('data-prices')); /* Цена, заданная через атрибут для input*/
			var price_itog = parseInt($('.itog_sum').attr('data-price'));
			price_itog += price;
			$('.itog_sum').html(price_format(price_itog));
			var price_sumitog = parseInt($('.itog_skid_summ').attr('data-price'));
			price_sumitog += price;
			$('.itog_skid_summ').html(price_format(price_sumitog));

			$("#data-address").prop("required", 1);
			$("#data-house").prop("required", 1);
			
			$.getOnestepPaymentSystemList('/menu/cart/order/', $('.form-cart'));
		},
		deleteAllFromCartCallback: function(data, status, jqXHR)
		{
			$.loadingScreen('hide');
			$('#page_cart').replaceWith(data.cart);
			var opened = false;
			if ($(".cart-result").hasClass("open")) {
				opened = true;
			}
			$(this).replaceWith(data.little);

			$('.tovar_added.btn[data-id]').removeClass('tovar_added').html('В корзину');

			if (opened) {
				$('.cart-result').show();
				$('.cart').trigger('mouseover');
			}
			scrollRevealInit();
			citySelectize();
			HoldLabelFocus();
			HoldLabelPromocodeOnReload();
		},
		deleteFromCartCallback: function (data, status, jqXHR)
		{			

			if ($('.cart-value__num').length) {
				var cartValue =  parseInt(
					$('.cart-value__num')
					.html()
					.replace(/\s/g, "")
				);
			}

			$.loadingScreen('hide');
			$('#page_cart').replaceWith(data.cart);
			var opened = false;
			if ($(".cart-result").hasClass("open")) {
				opened = true;
			}
			$(this).replaceWith(data.little);
			if (typeof data.id != 'undefined') {
				$('.btn[data-id="' + data.id + '"]').removeClass('tovar_added').html('В корзину');
			}
			if (opened) {
				if ($('body').hasClass('sticky')) {
					$('.fixedHeader .cart-result').show();
				} else {
					$('header .cart-result').show();
				}
				$('.cart').trigger('mouseover');
			}

			if ($('.cart-value__num').length) {
				var cartValue2 =  parseInt(
					$(data.little).find('.cart-value__num')
					.html()
					.replace(/\s/g, "")
				);
				$('.cart-value__num').prop('number', cartValue).animateNumber({ number: cartValue2 });
			}

			scrollRevealInit();
			citySelectize();
			HoldLabelFocus();
			HoldLabelPromocodeOnReload();
		},
		deleteAllFromCart: function (path) {
			$.clientRequest({
				path: path + '?deleteAll=1',
				callBack: $.deleteAllFromCartCallback,
				context: $(".little-cart")
			});
			return false;	
		},
		deleteFromCart: function (path, id) {
			var self = event.target;

			var item = $(self).parents('.tovar-in-cart:first');
			if (!item.length) {
				item = $(self).parents('tr:first');
			}
			var options = '';
			var oOptions = $(item).find('input[type="hidden"]');
			if (oOptions.length) {
				options = '&' + oOptions.serialize();
			}

			$.clientRequest({
				path: path + '?delete=' + id + options,
				callBack: $.deleteFromCartCallback,
				context: $(".little-cart")
			});
			return false;
		},
		favorite: function(path, shop_item_id) {
			event.stopPropagation();
			var btn = $(event.target);
			if (!btn.is('.like')) {
				btn = btn.parents('.like');
			}
			btn.toggleClass('active');

			var shop_item = btn.parents('.shop_item');

			if ( !btn.hasClass('active')) {
				if (shop_item.parent('.favorite_list').length) {
					shop_item.remove();
				}
			}
			$.clientRequest({path: path + '?favorite=' + shop_item_id, callBack: function (data) {
				$.loadingScreen('hide');
				$('header #little_favorite').replaceWith(data);
				$('.fixedHeader #little_favorite').replaceWith(data);
			}, context: btn});
			return false;
		},
		quick_view: function(path) {
			var quick_view = $('<div class="quick_view"><div class="quick_view_back"></div><div class="quick_view_content"><svg class="preload-view" width="30" height="30" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#009846">\n' +
												'    <g fill="none" fill-rule="evenodd">\n' +
												'        <g transform="translate(1 1)" stroke-width="2">\n' +
												'            <circle stroke-opacity=".2" cx="18" cy="18" r="18"/>\n' +
												'            <path d="M36 18c0-9.94-8.06-18-18-18">\n' +
												'\n' +
												'            </path>\n' +
												'        </g>\n' +
												'    </g>\n' +
												'</svg></div>');
			$('body').append(quick_view);
			$('html').addClass('fixed');
			jQuery.ajax({
				url: path,
				type: 'POST',
				success: function(data) {
					quick_view.find('.quick_view_content').html(data);
					quick_view.find('.quick-view').append('<div class="quick_view_close"></div>')
					ZoomImageHandler('#imgZoom');
					setTimeout(function() {
						$('.quick-view', quick_view).addClass('active');
						$('[name^=option_]', quick_view).trigger('change');
					}, 30);
				}
			});
			return false;			
		},
		set_count_cart: function (input_id, step, self) {

			var shop_item_id = $(self).attr('data-id');
			var oCountMod = $('#' + input_id + shop_item_id);

			var count = 1;
			if (!(iCurrCount = parseInt(oCountMod.val()))) {
				iCurrCount = 0;
			}
			if (!(iCurrCount <= 0 && step < 0)) {
				if (iCurrCount + step <= 0) {
					count = 1;
				} else {
					count = iCurrCount + step;
				}
				oCountMod.val(count);
			}
			oCountMod.keyup();
		},
		loadingScreen: function (method) {
			// Method calling logic
			if (methods[method]) {
				return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
			} else {
				$.error('Method ' + method + ' does not exist on jQuery.tooltip');
			}
		},
		clientRequest: function (settings) {
			if (typeof settings.callBack == 'undefined')
			{
				alert('Callback function is undefined');
			}

			$.loadingScreen('show');

			var path = settings.path,
					data = (typeof settings.data != 'undefined') ? settings.data : {};
			data['_'] = Math.round(new Date().getTime());
			jQuery.ajax({
				context: settings.context,
				url: path,
				type: 'POST',
				data: data,
				dataType: 'json',
				success: settings.callBack
			});
			return false;
		},
		hostdev_set_count_cart: function (step) {
			var self = event.target;
			var item = $(self).parents('tr:first');
			var oCountMod = $(item).find('input[name^=quantity_]');
			var count = 1;
			if (!(iCurrCount = parseInt(oCountMod.val()))) {
				iCurrCount = 0;
			}

			if (!(iCurrCount <= 0 && step < 0)) {
				if (iCurrCount + step <= 0) {
					count = 1;
				} else {
					count = iCurrCount + step;
					oCountMod.keyup();
				}
				if (count > 1) {
					if (step < 0) {
						self.disabled = false;
					} else {
						//						$(self).siblings('.minus').get(0).disabled = false;
					}
				} else {
					self.disabled = true;
				}
				oCountMod.val(count);
			}

		},
		addIntoCart: function (path, shop_item_id, count) {
			var self = event.target;
			event.stopPropagation();

			var item = $(self).parents('.quick-view__item:first');
			if (!item.length) {
				item = $(self).parents('.shop_item:first');
			}
			var options = '';
			var oOptions = $(item)
			.find('input[type="hidden"][name^="option_'
						+ shop_item_id + '"], input[type="checkbox"][name^="option_'
						+ shop_item_id + '"]:checked, input[type="radio"][name^="option_'
						+ shop_item_id + '"]:checked,select[name^="option_'
						+ shop_item_id + '"]');

			if (oOptions.length) {
				options = '&' + oOptions.serialize();
			}

			$('.btn[data-id="' + shop_item_id + '"]').addClass('add-load');
			$.clientRequest({path: path + '?add=' + shop_item_id + '&count=' + count + options, 'callBack': $.addIntoCartCallback, context: $('.little-cart')});
			const popup = document.querySelector(".quick_view");
			if(popup) {
				$(".quick_view").fadeOut(function() {
					$('html').removeClass('fixed');
					popup.remove();
				});
			}
			return false;
		},
		addIntoCartCallback: function (data, status, jqXHR) {	

			if ($('.cart-value__num').length) {
				var cartValue =  parseInt(
					$('.cart-value__num')
					.html()
					.replace(/\s/g, "")
				);
			}

			$.loadingScreen('hide');
			if (typeof data.id != 'undefined') {
				$.each(data.id, function (key, value) {
					$('.btn[data-id="' + value + '"]').addClass('tovar_added').removeClass('add-load').html('В корзине').find('div').remove();
				});
			}
			jQuery(this).replaceWith(data.little);
			jQuery("#page_cart").replaceWith(data.cart);
			scrollRevealInit();	
			if ($('.cart-value__num').length) {
				var cartValue2 =  parseInt(
					$(data.little).find('.cart-value__num')
					.html()
					.replace(/\s/g, "")
				);
				$('.cart-value__num').prop('number', cartValue).animateNumber({ number: cartValue2 });
			}	
			recomend_slider();

		},
		quickbuy: function (path, shop_item_id, count, modification = false) {
			var form = $('#quickbuy_' + shop_item_id).serialize();
			$.clientRequest({path: path + '?quickbuy=' + shop_item_id + '&count=' + count + '&' + form,
											callBack: $.quickbuyCallback,
											context: $('#quickbuy_' + shop_item_id)});
			return false;
		},
		quickbuyCallback: function (data, status, jqXHR)
		{
			$.loadingScreen('hide');
			if (data.error != '') {
				jQuery(this).find('.result').html(data.error);
			} else {
				/* $(".quickModal_form").addClass("send");
				$(".quickModal_body").fadeOut();
				$(".success").fadeIn().replaceWith(data.msg); */
				$('.modal-form__input-area').fadeOut();
				$('.modal-form__description').fadeOut();
				$('.modal-form__success').html('<p class="modal-form__success-text">Ваше сообщение получено, мы свяжемся с Вами в ближайшее время!</p>');
				$('.main__btn').attr('disabled', true);
				setTimeout(() => {
					$('.modal-form__fone').fadeOut();
				}, 4000);
			}
		},
		changeModItem: function (path, id, options, select) {
			var newmod = $(select).val();
			$.clientRequest({path: path + '?changeMod=' + id + options + '&newmod=' + newmod, 'callBack': $.cartCallback, context: $('.site-cart')});
			return false;
		},

		changeItemOption: function (path, shop_item_id, oldoptions) {
			var self = event.target;
			var item = $(self).parents('tr');
			var options = '';
			if ($(self).is('[type=checkbox]')) {
				$(self).parents('.option__container').find('input[type="checkbox"]').not($(self)).each(function() {
					$(this).prop('checked', false).removeAttr('checked').parents('.option__item').removeClass('active');
				});
				if (!$(self).parents('.option__container').find('input[type="checkbox"]:checked').length) {
					$(self).parents('.option__container').find('input[type="checkbox"]:first').prop('checked', true).attr('checked', 'checked').parents('.option__item').addClass('active');
				}
			}
			if (item.find('input[name^="option_"]:checked,select[name^="option_"]').length) {
				options = '&' + item.find('input[name^="option_"]:checked,select[name^="option_"]').serialize();
			}
			clearTimeout(optInterval);
			optInterval = setTimeout(function () {
				$.clientRequest({path: path + '?changeOption=' + shop_item_id + oldoptions + options, 'callBack': $.cartCallback, context: $('#little_cartNew')});
			}, 750);

		},

		changeItem: function (path, id, oldoptions, adds, select) {
			//var option = $(select).val();
			var option = $(select).attr('data-value')
			$.clientRequest({path: path + '?change=' + id + oldoptions + adds + '&options=' + option, 'callBack': $.cartCallback, context: $('.site-cart')});

			return false;
		},
	});
})(jQuery);

$(document).ready(function() {

	$('body').on('click', '.item_options', function() {
		event.stopImmediatePropagation();
		return false;
	});
	if(Cookies.get('cook_ok')) {
		$('.cook-panel').addClass("hidden");
		$('.cook-panel').removeClass("visible");
	} else {
		setTimeout(function(){
			$('.cook-panel').addClass("visible");
			$('.cook-panel').removeClass("hidden");
		}, 5000);
	}
	$('.cook__close').click(function() {
		$('.cook-panel').addClass("hidden");
		$('.cook-panel').removeClass("visible");
		Cookies.set('cook_ok', 1, { expires: 30});
	});

	$(document).on('click', '[data-favorite]', function (event) {
		event.preventDefault();
		event.stopImmediatePropagation();
		var shop_item_id = $(this).data('favorite');
		var path = $(this).data('favorite-path');
		if (!$(this).hasClass('active')) {
			//			yaCounter45553296.reachGoal('fav');
		}
		$(this).toggleClass('active');

		var shop_item = $(this).parents('.shop_item');

		if ( !$(this).hasClass('active')) {
			if (shop_item.parent('.favorite_list').length) {
				shop_item.remove();
			}
		}
		$.clientRequest({path: path + '?favorite=' + shop_item_id, callBack: function (data) {
			$.loadingScreen('hide');
			$('header #little_favorite').replaceWith(data);
			$('.fixedHeader #little_favorite').replaceWith(data);
		}, context: $(this)});
		return false;
	});
	$('body').on('click', '.quick_view_back, .quick_view_close', function(event) {
		$(this).parents('.quick_view:first').fadeOut(function() {
			$('html').removeClass('fixed');
			$(this).remove();
		});
	});



	start = document.location.href.indexOf('!');
	if (start > 0) {
		goto = document.location.href.substring(start+1);
		if ($('*[id="'+goto+'"]').length) {
			post = $('*[id="'+goto+'"]').offset().top - 80;
			setTimeout(function() {
				$("html,body").animate({scrollTop: post}, 500);
			}, 150);
		}
	}


	$('a[href^="/#"]').click(function(e) {
		start = $(this).attr('href').indexOf('!') + 1;
		goto = $(this).attr('href').substring(start);
		if ($('*[id="'+goto+'"]').length) {
			post = $('*[id="'+goto+'"]').offset().top - 80;
			$("html,body").animate({scrollTop: post}, 500);
			return false;
		}
	});
	setTimeout(function() {


		SidebarNavUIListeners();

		ScrollToTopListener();

		ReviewsStarsLinteners();

		window.onscroll = function() {
			MoveButtonToTopIfScrolledToDawn();
		};

		protipListener();

		AddCommentBtnListener();

		ViewToggleTypeListener();

		AccordionCollapseListeners();

		Masks();

		PromoCartListeners();

		pickProductColor();

		pickProductProp();

		forcedPickFirstColor();

	}, 200);

	HoldLabelFocus();
	HoldLabelPromocodeOnReload();

});

function HoldLabelPromocodeOnReload() {
	const promoInput = $('.checkout__promo-input');
	if (promoInput.length) {
		if (promoInput.val().trim() != '') {
			promoInput.addClass('focus');
		}
	}
}

function HoldLabelFocus() {
	const inputs = document.getElementsByClassName('checkout__contact-input');
	for (let input = 0; input < inputs.length; input++) {
		const element = inputs[input];

		element.addEventListener('focusin', () => {
			element.classList.add('focus');
		});
		element.addEventListener('focusout', () => {
			const trimedValue = element.value.trim();
			if (trimedValue) {
			} else {
				element.classList.remove('focus');
			}
		});
	}
}


function PromoCartListeners() {
	var interval = null;

	$(document).on('click', '#cart_table .checkout__promo-btn', function () {
		if($('.checkout__promo-input').val() == ""){
			return false;
		}
		clearTimeout(interval);
		if ($(this).hasClass('checkout__promo-btn--clear-promo')) {
			$('.checkout__promo-input').val('');
		}
		interval = setTimeout(function () {
			$.loadingScreen('show');
			var data = $('#cart_table').serialize() + '&action=update&_=' + Math.random();
			$.clientRequest({
				path: '/menu/cart/',
				callBack: $.cartCallback,
				data: data,
				context: $(".little-cart")
			});
		}, 250);
		return false;
	});
}

function Masks() {
	PhoneMask();
}
function PhoneMask() {
	$('input[type="tel"]').inputmask({"mask": "+7 (999) 999-99-99"});
	$('input[type="phone"]').inputmask({"mask": "+7 (999) 999-99-99"});
}

function protipListener() {
	$.protip();

	$('body').on('click', '.protip', function(e) {
		//e.stopPropagation();
	});
}

function SidebarNavUIListeners() {
	$('.sidebar-list__arrow svg').click((event) => {
		var parent = $(event.target).parents(".sidebar-list__group:first");
		var parentArrow = $(event.target).parents(".sidebar-list__arrow:first");

		$('.sidebar-list__group').not(parent).find('.sidebar-sublist').slideUp();
		$('.sidebar-list__arrow').not(parentArrow).removeClass('sidebar-list__arrow--active');

		$(parent).find('.sidebar-sublist').slideToggle();

		$(parentArrow).toggleClass('sidebar-list__arrow--active')
	});
}

function ScrollToTopListener() {
	$(document).on("click", "#btnTop", () => {
		$('html, body').animate({scrollTop: 0},500);
		return false;
	});
}

function MoveButtonToTopIfScrolledToDawn() {
	let clientHeight = document.documentElement.clientHeight
	? document.documentElement.clientHeight : document.body.clientHeight;
	let documentHeight = document.documentElement.scrollHeight
	? document.documentElement.scrollHeight : document.body.scrollHeight;
	var scrollTop = window.pageYOffset
	? window.pageYOffset : document.documentElement.scrollTop
	? document.documentElement.scrollTop : document.body.scrollTop;

	let bottom = scrollTop + clientHeight;
	let footerheight = $('.bottom-page').height() + 80;
	bottom >= ((documentHeight - footerheight) + 150) ? BtnToTopFixedPosition(footerheight) : BtnToTopDefaultPosition();

	if (scrollTop >= clientHeight) {
		ShowToTopBtn();
	} 
	else {
		HideToTopBtn();
	}
}

function ShowToTopBtn() {
	$('#btnTop').addClass('btn-top--show');
}
function HideToTopBtn() {
	$('#btnTop').removeClass('btn-top--show');
}
function BtnToTopFixedPosition(position) {
	$('#btnTop').css({"bottom": position,"position": "absolute"});
}
function BtnToTopDefaultPosition() {
	$('#btnTop').css({"bottom": "12%","position": "fixed"});
}

function sortingMobile() {
	if ($(window).width() < 992) {
		$('.mobile_sort_btns > div').append($('.sort-block .sorting .sortbutton'));
	}
}

function ReviewsStarsLinteners() {
	$(".stars .item-star").hover(
		function() {
			$(this).addClass("active");
		},
		function() {
			$(this).removeClass("active");
		}
	);
	$(".stars .item-star").click(function() {
		$(".stars .item-star").each(function() {
			$(this).removeClass("active-fix");
		});
		$(this).addClass("active-fix");
	});
}


/*
 ** Скроллинг на мобилке и обработка фиксированной шапки
 */
function fixedMenuMobile() {
	$(document).scroll(function () {
		if ($(document).scrollTop() > 100 && (!$("body").hasClass("fixed"))) {
			//$("body").addClass('sticky');
			//$("header").addClass("sticky");
			/* $("#menu").insertBefore("header .logo"); */

		} else {
			//$("body").removeClass('sticky');
			//$("header").removeClass("sticky");
			/* $("#menu").appendTo(".top-menu > .container > ul"); */

		}
	})
}
/*
 ** Скроллинг на ПК и обработка фиксированной шапки
 */
function fixedMenuDesktop() {
	$(document).scroll(function () {

		if ($(document).scrollTop() > window.headerHeight && (!$("body").hasClass("fixed"))) {
			//$("header").addClass("sticky");
			$('body').addClass('sticky');
			$('header .cart-result').removeClass('open').hide();
			/*
			$("#menu").insertAfter("header .logo");

			$('#slinkytarget').insertAfter('header .header .inner-block .logo');

			$('header.sticky .search').addClass('hide');
			$('header.sticky .sity-box').addClass('hide');
			$('header.sticky .header__contacts').addClass('hide');
			$('header.sticky .compare').addClass('hide');
			$('header.sticky .list-wish').addClass('hide');
			$('header .header .inner-block .cart a span').addClass('hide');
			*/
		} else {
			//$("header").removeClass("sticky");
			$('body').removeClass('sticky');
			$('.fixedHeader .cart-result').removeClass('open').hide();
			/*
			$("#menu").appendTo(".top-menu > .container > ul");

			$('#slinkytarget').insertAfter('#listtarget');

			$('header .search').removeClass('hide');
			$('header .sity-box').removeClass('hide');
			$('header .header__contacts').removeClass('hide');
			$('header .compare').removeClass('hide');
			$('header .list-wish').removeClass('hide');
			$('header .header .inner-block .cart a span').removeClass('hide');

			*/
		}
	})
}

/*
 * Выпадашка краткой корзины
 */
function littleCart() {
	$('body').on('click', '.cart-link:not(.cart-link--empty)', function(e) {
		littleCartToggle(e.target.closest('.little-cart'));
		if ($(window).width() >= 992) {
			return false;
		} else {
			return true;
		}
	});
}
$(document).click(function (e) {
	let container = $(".cart");
	if (container.has(e.target).length === 0){
		$(".cart-result").slideUp();
		$(".cart-result").removeClass("open");
	}
});

function littleCartToggle(closest) {
	$(closest).find(".cart-result").slideToggle();
	$(closest).find(".cart-result").toggleClass("open");
}
/**
 * Перемещение фильтра с ПК на мобилку и наоборот
 */
function filterMove() {
	if ($(window).width() < 992 && $(".filter-block").length) {
		$(".filter-block").insertAfter(".filters_mobile_body .header");
	} else if ($(window).width() >= 992 && $(".filter-block").length) {
		$(".filter-block").insertAfter(".sidebar-menu");
	}
}
/* --------------
 ** Выбор города на мобилке
 ** ------------*/
function cityMobile() {
	if ($(window).width() < 992) {
		$('.phone-sity').append($('.top-header .sity-box'));
		$(document).on("click", ".phone-sity .sity-box .city .city_select", function (e) {
			e.preventDefault();
			$(".city_selector_fone").toggleClass("show");
		});
		$(document).on("click", ".city_selector .back, .city_selector .close", function (e) {
			e.preventDefault();
			$(".city_selector_fone").removeClass("show");
		});
	}
}
/* -------------------------------------
 ** Скрывание описания товара в карточке
 ** -----------------------------------*/
function showMoreText(item, hght, more, less) {
	$(item).readmore({
		speed: 200,
		maxHeight: hght,
		moreLink: '<a href="#">' + more + '</a>',
		lessLink: '<a href="#">' + less + '</a>'
	});
}

$(document).ready(function () {

	$('body').on('click', '.filter_shownext span:first-of-type', function() {
		$(this).parent().prev('.filter_next_items').slideToggle();
		$(this).toggleClass('filter_shownext_closed');
		if (!$(this).hasClass('filter_shownext_closed')) {
			$(this).html('Скрыть');
			$(this).closest('.filter_shownext').find('.filter_shownext__counter').fadeOut();
		} else {
			var count = $(this).data('count');
			$(this).html(`Показать еще`);
			$(this).closest('.filter_shownext').find('.filter_shownext__counter').fadeIn();
		}
	});

	if ($('.item_tabs').length) {
		loadJS('/js/jquery.responsiveTabs.min.js', function() {
			$('.item_tabs').responsiveTabs({
				startCollapsed: 'accordion'
			});
		});
	}
	$('body').on('click', '.view-toggle__type', function() {
		var view = $(this).data('typeview');
		$('.card-list').removeClass('view-list').removeClass('view-minilist');
		if (view == 'list') {
			$('.card-list').addClass('view-list');
		} else if (view == 'minilist') {
			$('.card-list').addClass('view-minilist');
		}
		Cookies.set('typeview', view, { expires: 7, path: '/' });
	});
	if ($('#data-sity').length) {
		loadJS('/js/selectize.min.js', citySelectize);
		$(document).on('change', '#data-sity', function () {
			var name = $(this).find('option:selected').html();
			pickPointParams.city = name;
			$.getOnestepDeliveryList('/menu/cart/order/', $('.form-cart'));
		});
	}

	$(".card-item .like").click(function () {
		var item = $(this);
		item.addClass('animate');
		setTimeout(function () {
			item.removeClass('animate');
		}, 30000);
	});

	$('body').on('change', '.select-mod', function() {
		//var option = $(this).find('option:selected');
		var option = $(this);
		var price = option.data('price');
		var rest = option.data('rest');
		var weight = option.data('weight');
		var priceOld = option.data('old-price');
		var image = option.data('image');
		var unit = option.data('unit');

		//	console.log($(this));
		$('.mod_options').hide().filter('[data-id="'+option.val()+'"]').show();
		
		$('.price-block .price_amount').data('price', price);
		$('.price-block .price_amount').html(price);
		$('.quick-view__item .weight').html(weight + '&#160;'+unit);
		
		$('.old-price .price_amount_old').data('old-price', priceOld);
		$('.old-price .price_amount_old').html(priceOld);
		if (rest > 0) {
			$('.quick-view__item .in-store').html('<div class="in-store__icon"><img src="/images/gallery-item/check.svg" alt="" /></div><div class="in-store__text">В наличии</div>');
		} else {
			$('.quick-view__item .in-store').html('<div class="in-store__icon"><img src="/images/gallery-item/waiter.svg" alt="" /></div><div class="in-store__text">Ожидается</div>');
		}
		if (image != '') {
		    $('.quick-view__item #imgZoom .img__zoom').attr('src', image)
		    $('.quick-view__item #imgZoom .zoomImg').attr('src', image)
		}
		
		if ($('.mod_options[data-id="'+option.val()+'"]').find('.dropdown-select-list-item.selected').length > 0) {
		    $('.mod_options[data-id="'+option.val()+'"]').find('.dropdown-select-list-item.selected').click();
		}
	}); 

	/* $('.select-mod').change(function() {
		var option = $(this).find('option:selected');
		var price = option.data('price');
		var rest = option.data('rest');
		console.log('tyt');
		$('.price-block .price').html(price + ' <i class="fa fa-rub"></i>');
		if (rest > 0) {
			$('.in-store').html('<div class="in-store__icon"><img src="/images/gallery-item/check.svg" alt="" /></div><div class="in-store__text">В наличии</div>');
		} else {
			$('.in-store').html('<div class="in-store__icon"><img src="/images/gallery-item/waiter.svg" alt="" /></div><div class="in-store__text">Ожидается</div>');
		}
	}); */

	$('.clearFilterAll').click(function() {
		$(this).parents('.filter:first').find('input[type="checkbox"], input[type="radio"]').prop('checked', false).removeAttr('checked').removeProp('checked').trigger('change');
		$(this).parents('.filter:first').find('.filter_slider .filter_item.range_from').each(function() {
			$(this).val($(this).attr('data-range-boundary')).trigger('change');
		});
		$(this).parents('.filter:first').find('.filter_slider .filter_item.range_to').each(function() {
			$(this).val($(this).attr('data-range-boundary')).trigger('change');
		});
	});

	$('.clearFilter').click(function() {
		$(this).parents('.filter_item_body:first').find('input[type="checkbox"], input[type="radio"]').prop('checked', false).removeAttr('checked').removeProp('checked').trigger('change');
		var range_from = $(this).parents('.filter_slider:first').find('.filter_item.range_from');
		range_from.val(range_from.attr('data-range-boundary')).trigger('change');
		var range_to = $(this).parents('.filter_slider:first').find('.filter_item.range_to');
		range_to.val(range_to.attr('data-range-boundary')).trigger('change');
	});

	$('.filter_item_body').find('input[type="checkbox"]:checked:first, input[type="radio"]:checked:first').each(function() {
		$(this).parents('.filter_item_body:first').find('.clearFilter').show();
	});

	$('.filter_slider').find('input[type="text"]').each(function() {
		if ($(this).val() != $(this).attr('data-range-boundary')) {
			$(this).parents('.filter_slider:first').find('.clearFilter').show();
		}
	});

	$('input[type="checkbox"], input[type="radio"]').change(function() {
		var parent = $(this).parents('.propertyInput:first');
		var current = $(this);

		if ($(this).is(':checked')) {
			$(this).parents('.filter_item_body:first').find('.clearFilter').show();
		} else {
			if (!parent.find('input:checked').not(current).length) {
				$(this).parents('.filter_item_body:first').find('.clearFilter').hide();
			}
		}
	});

	$(document).on('click', '[data-limit]', function () {
		button = $(this);
		var limit = $(this).data('limit');
		$('#limitField').val(limit);
		setTimeout(function () {
			button.closest('form').submit();
		}, 100);
		return false;
	});

	$(document).on('click', '.sortbutton', function () {
		button = $(this);
		$('#sortingField').val($(this).val());
		$('#sortingField').trigger('change');
	});

	$(document).on('click', '[data-compare]', function (e) {
		e.preventDefault();
		e.isImmediatePropagationStopped();
		e.isPropagationStopped();
		var shop_item_id = $(this).data('compare');
		var path = $(this).data('compare-path');
		if (!$(this).hasClass('active')) {
			//			yaCounter45553296.reachGoal('fav');
		}
		if ($(this).parents('.comparing-box').length) {
			var shop_item = $(this).parents('.shop_item');
			$('.compare_item[data-id="'+shop_item_id+'"]').remove();
			if (shop_item.parent('.comparing-box').length) {
				$('.swiper-container-horizontal > .swiper-wrapper > .shop_item:first').prependTo('.shop_cart_compare_top .comparing-box');
				$('.values_property_compare .compare_item:first').prependTo('.shop_cart_compare_bottom .comparing-box');
			}
			shop_item.remove();
			mySwiper_4.update();
			mySwiper_5.update();
		}
		$(this).toggleClass('active');
		if (!$('.shop_cart_compare_right .shop_item').length) {
			$('.shop_cart_compare_bottom').remove();
		}
		$.clientRequest({path: path + '?compare=' + shop_item_id, callBack: function (data) {
			$.loadingScreen('hide');
			$('header #little_compare').replaceWith(data.little);
			$('.fixedHeader #little_compare').replaceWith(data.little);
			if (data.compare) {
				$('.shop_cart_compare').replaceWith(data.compare);
			}
		}, context: $(this)});
		return false;
	});


	/* --------------
	 ** Маска телефона
	 ** -------------- */
	/* $("input[type='tel']").mask('+7 (000)000-00-00');
	$("input[type='phone']").mask('+7 (999) 999-99-99'); */
	/* --------------
	 ** Слайдеры сайта
	 ** -------------- */
	recomend_slider();
	
	var mySwiper_1 = new Swiper('.slider-block', {
		speed: 400,
		spaceBetween: 100,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + '<span class="prg_bar"><span class="prg_bar_mask full"><span class="fill"></span></span><span class="prg_bar_mask half"><span class="fill"></span></span><span class="prg_bar_counter">'+(index + 1)+'</span></span></span>';
			},
		},
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		}
	});
	setHomePageVideoHeight();
	var mySwiper_2 = new Swiper('.hit-slider', {
		slidesPerView: 4,
		spaceBetween: 24,
		navigation: {
			nextEl: '.hit-block .swiper-button-next',
			prevEl: '.hit-block .swiper-button-prev'
		}
	});
	var mySwiper_9 = new Swiper('.buywith-slider', {
		slidesPerView: 4,
		spaceBetween: 10,
		navigation: {
			nextEl: '.buywith__container .swiper-button-next',
			prevEl: '.buywith__container .swiper-button-prev'
		},
		breakpoints: {
			540: {
				slidesPerView: 2
			},
			1024: {
				slidesPerView: 3
			},	
			1200: {
				slidesPerView: 4
			},	
		}
	});
	var mySwiper_3 = new Swiper('.same-slider', {
		slidesPerView: 5,
		spaceBetween: 10,
		/* slideClass: 'card-item', */
		navigation: {
			nextEl: '.same-container .swiper-button-next',
			prevEl: '.same-container .swiper-button-prev'
		},
		breakpoints: {
			540: {
				slidesPerView: 2
			},
			768: {
				slidesPerView: 3
			},
			1024: {
				slidesPerView: 4
			}
		}
	});
	var mySwiper_10 = new Swiper('.associated-slider', {
		slidesPerView: 5,
		spaceBetween: 10,
		navigation: {
			nextEl: '.associated-container .swiper-button-next',
			prevEl: '.associated-container .swiper-button-prev'
		},
		breakpoints: {
			540: {
				slidesPerView: 2
			},
			768: {
				slidesPerView: 3
			},
			1024: {
				slidesPerView: 4
			}
		}
	});
	var mySwiper_4 = new Swiper('.compare_slider', {
		slidesPerView: 3,
		slidesPerGroup: 1,
		navigation: {
			nextEl: '.compare-container .swiper-button-next',
			prevEl: '.compare-container .swiper-button-prev'
		},
		breakpoints: {
			1199: {
				slidesPerView: 1
			},
			991: {
				slidesPerView: 1
			},
			767: {
				slidesPerView: 1
			}
		}
	});
	var mySwiper_5 = new Swiper('.compare_slider_1', {
		slidesPerView: 3,
		navigation: {
			nextEl: '.compare-container .swiper-button-next',
			prevEl: '.compare-container .swiper-button-prev'
		},
		breakpoints: {
			1199: {
				slidesPerView: 1
			},
			991: {
				slidesPerView: 1
			},
			767: {
				slidesPerView: 1
			}
		}
	});
	if ($(".compare_slider").length) {
		mySwiper_4.controller.control = mySwiper_5;
		mySwiper_5.controller.control = mySwiper_4;
	}
	/*слайдер статей на главной*/
	var mySwiper_6 = new Swiper('#news-slider', {
		slidesPerView: 4,
		spaceBetween: 30,
		slidesPerGroup: 1,
		navigation: {
			nextEl: '.new-group .swiper-button-next',
			prevEl: '.new-group .swiper-button-prev'
		},
		breakpoints: {
			1199: {
				slidesPerView: 4,
				spaceBetween: 50
			},
			991: {
				slidesPerView: 2,
				spaceBetween: 30
			},
			768: {
				slidesPerView: 2,
			},
			575: {
				slidesPerView: 1
			}
		}
	});
	var mySwiper_7 = new Swiper('.sale-slider', {
		slidesPerView: 4,
		spaceBetween: 30,
		navigation: {
			nextEl: 'section.sale .swiper-button-next',
			prevEl: 'section.sale .swiper-button-prev'
		},
		breakpoints: {
			1199: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			991: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			767: {
				slidesPerView: 1
			}
		}
	});
	/* function slider_init_8() {
		var mySwiper_8 = new Swiper('.little-slider-cart', {
			direction: 'vertical',
			slidesPerView: 4,
			spaceBetween: 10,			
			navigation: {
				nextEl: '.images-about-tovar .swiper-button-next',
				prevEl: '.images-about-tovar .swiper-button-prev'
			},
			breakpoints: {
				991: {
					slidesPerView: 3,
					direction: 'horizontal',
				},
				767: {
					slidesPerView: 2,
					direction: 'horizontal',
				},
				575: {
					slidesPerView: 4,
					direction: 'horizontal',
				}
			}
		});
	}
	slider_init_8(); */	


	showMoreText($(".information-about-tovar .description"), 60, "Подробнее", "Скрыть");
	showMoreText($(".tech-char-block .list-chars"), 270, "Показать дополнительные характеристики", "Скрыть дополнительные характеристики");


	$("[data-fancybox='data-fancybox']").fancybox({
		speed: 330,
		image: {
			protect: true
		},
		afterLoad: function () {
			showMoreText($(".information-about-tovar .description"), 60, "Подробнее", "Скрыть");
		}

	});
	
	// ИЗМЕНЕНИЯ КОЛИЧЕСТВА ДОПОВ СЕТОВ
	$('body').on('click', '.dop_sets_item .option_quantity button', function() {
	    
        let option = $(this).closest('.dop_sets_item');
        let count = option.find('.option_quantity input').val();
        
        if ($(this).hasClass('quantity-minus')) {
            count--;
        } else {
            count++;
        }
        
        if(count > 3) {
            count = 3;
        } else if(count < 0){
            count = 0;
        }
        
        option.find('.option_quantity input').val(count);
        option.find('.option__item input').prop('checked', false);
        
        while (count) {
            $(option.find('.option__item input')[count-1]).prop('checked', true);
            count--;
        }
	});
	
	$('body').on('change', '.information-about-tovar [name^=option_]', function() {
		let parent = $(this).parents('.options:first');
		
		let price = parseFloat($('.price_amount', '.information-about-tovar').data('price')) * 100 / 100;
		var $aOptions = $('input[type=hidden],input[type=radio]:checked,input[type=checbox]:checked, select option:selected', parent);
		$aOptions.each(function() {
			price += parseInt($(this).data('price'));
		});
		$('.price_amount', '.information-about-tovar').html(price);
	});
	
	$('body').on('click', function(e) {
		let div = $('.dropdown-select');
		if (!div.is(e.target) // если клик был не по нашему блоку
				&& div.has(e.target).length === 0) { // и не по его дочерним элементам
			$('.dropdown-select').removeClass('opened');
		}
	});
	$('body').on('click', '.dropdown-select-selected', function() {
		let parent = $(this).parents('.dropdown-select:first');
		parent.toggleClass('opened');
	});
	$('body').on('click', '.dropdown-select-list-item', function() {
		let parent = $(this).parents('.dropdown-select:first');
		parent.removeClass('opened');
		let value = $(this).data('value');
		let price = $(this).data('price');
		$('input', parent).val(value).data('price', price).trigger('change');
		$('.dropdown-select-selected span', parent).html($(this).html());
		$(this).addClass('selected').siblings().removeClass('selected');
	});
	/* -------------------------------------
	 ** Смена изображений в карточке товара
	 ** -----------------------------------*/
	$(document).on("click", ".little-imgs > div", function () {
		$(".little-imgs > div").each(function () {
			$(this).removeClass("show");
		});
		$(this).addClass("show");
		var img = $(this).find("img");
		var link = img.data("img");
		var src = img.attr('src');
		var big_img = $("#current-img");
		var big_a = $("#current-link");
		big_img.attr('src', src);
		$('#imgZoom img.zoomImg').attr('src', src);
		big_a.attr('href', link);
	});

	/*Фенсибокс карточки товара*/
	$(document).on("click", "#current-link", function () {
		/*Собираем урлы файлов, которые будем показывать*/
		var fancyUrls = [];
		$(".little-imgs .swiper-slide [data-img]").each(function () {
			fancyUrls.push({
				src: $(this).attr("data-img")
			});
		});
		var productCardFancy = $.fancybox.open(fancyUrls);

	});
	/* --------------------------------
	 ** Раскрывание категории в фильтре
	 ** -------------------------------*/
	$(".filter-block__legend").on('click', function () {
		$(this).next(".filter-block__values").slideToggle();
	});
	/* ----------------------------
	 ** Подключение мобильного меню
	 ** ---------------------------*/
	/* $('nav.top-menu .list').slicknav({
		label: '',
		removeClasses: true,
		appendTo: 'header .inner-block',
		init: function () {
			$(".slicknav_nav").prepend("<div class='phone-menu'><a href='tel:+79132123569'><nobr>+7 (3852) 226-226</nobr></a></div>");
			$(".slicknav_nav").prepend("<div class='phone-sity'></div>");
			$(".slicknav_nav").prepend("<div class='logo-menu'><a href='/'><img src='/img/logo.svg' alt=''></div>");
		}
	}); */


	/* --------------------------------
	 ** Раскрывание категории в фильтре
	 ** -------------------------------*/
	/* $(document).on('click', "#menu", function () {
		$("#full-menu").slideToggle();
		$(this).toggleClass("open");
	}); */
	/* --------------------------------
	 ** Раскрывание категории в фильтре
	 ** -------------------------------*/
	$(".btn-search").on('click', function () {
		$("header .search").toggleClass("open");
	});
	$("header .search .search-close").on('click', function () {
		$("header .search").removeClass("open");
	});
	/* --------------
	 ** Выбор города
	 ** ------------*/
	$('.ztooltip .selectother').click(function (e) {
		$('.city .city_selector_fone').fadeIn();
		$('[data-id="selectcity"]').removeClass('active');
		return false;
	});
	$('ul.city_selector').click(function (e) {
		e.stopImmediatePropagation();
	});
	/* --------------
	 ** Крестик в выборе города на десктопе
	 ** ------------*/
	if ($(window).width() >= 768) {
		$('.city_selector_fone .close').click(function (e) {
			$('.city_selector_fone').fadeOut();
		});
	}

	$(window).resize(function () {
		cityMobile();
	});
	cityMobile();
	/**
	 * Настройка регистронезависимого поиска
	 */
	jQuery.expr[":"].contains = function (elem, i, match, array) {
		return (elem.textContent || elem.innerText || jQuery.text(elem) || "").toLowerCase().indexOf(match[3].toLowerCase()) >= 0;
	}
	$('#search_city').change(function () {
		var val = $(this).val();
		var li, letter;
		if (val !== '') {
			li = $('.city_selector').find('a.cityselect').parent();
			// лишки у которых есть такое значение
			$matches = $('.city_selector').find('a.cityselect:contains(' + val + ')').parent();
			// скрываем лишки у которых нет такого значения
			li.not($matches).removeClass("vis").fadeOut();
			$matches.addClass("vis").fadeIn();
			// добавляем класс, тем лишкам, которые остались
			$matches.addClass("vis");
			$(".letter_group").each(function () {
				if (!$(this).find(".vis").length) {
					$(this).find(".letter").fadeOut();
				} else {
					$(this).find(".letter").fadeIn();
				}
			})
		} else {
			/*li = $('.city_selector').find('a.cityselect').parent();            
			 letter = $('.city_selector').find('.letter');              
			 li.fadeIn();
			 letter.fadeIn();*/
			$('.city_selector').find('a.cityselect').parent().fadeIn();
			$('.city_selector').find('.letter').fadeIn();
		}
	}).keyup(function () {
		$(this).change();
	});
	$(document).on("click", ".city_selector .clear_btn", function () {
		$(this).closest(".sity_search_box").find("#search_city").val("");
		$("#search_city").change();
	})
	/* ----------------------------
	 ** Показать фильтры на мобилке
	 ** ---------------------------*/
	$(document).on("click", ".filters_mobile_btn", function () {
		$(".filters_mobile_box").toggleClass("show");
		$(".filters_mobile_body").toggleClass("show");
		$("html").toggleClass("fixed");
	});
	$(document).on("click", ".filters_mobile_body .close, .filters_mobile_box, .filter-buttons__submit", function () {
		$(".filters_mobile_box").removeClass("show");
		$(".filters_mobile_body").removeClass("show");
		$("html").removeClass("fixed");
	});
	$(window).resize(function () {
		sortingMobile();
	});
	sortingMobile();

	$(document).on("click", ".mobile_sort_select", function () {
		$(".mobile_sort_btns").slideToggle();
		$(".mobile_sort_select").toggleClass("open");
	});
	$(".city_select").click(function () {
		$(".city_selector_fone").fadeIn();
	});
	$(document).on("click", ".quickbuy", function () {
		$("#quickModal").fadeIn();
		return false;
	});
	$(document).on("click", "#quickModal .close", function () {
		$("#quickModal").fadeOut();
	});

	var interval = null;
	$(document).on('keyup', 'form.form-cart [name^="quantity_"]', function () {

		clearTimeout(interval);
		interval = setTimeout(function () {
			$.loadingScreen('show');
			var form = $('form.form-cart').serialize() + '&action=update&_=' + Math.random();
			$.ajax({
				type: "POST",
				data: form,
				success: function (data) {

					if ($('.cart-value__num').length) {
						var cartValue =  parseInt(
							$('.cart-value__num')
							.html()
							.replace(/\s/g, "")
						);
					}

					$('.little-cart').html(data.little);
					var cart = $(data.cart);
					$('#page_cart').html($(cart).html());
					$.loadingScreen('hide');
					scrollRevealInit();
					citySelectize();
					$('.airSticky').airStickyBlock({
						offsetTop: 115
					});

					if ($('.cart-value__num').length) {
						var cartValue2 =  parseInt(
							$(data.little).find('.cart-value__num')
							.html()
							.replace(/\s/g, "")
						);
						$('.cart-value__num').prop('number', cartValue).animateNumber({ number: cartValue2 });
					}
					recomend_slider();
				},
				dataType: 'json'
			});
		}, 750);
	});
	$('header .search form input').suggest({
		serviceUrl: '/search/?autocomplete=1',
		delimiter: ',',
		appendTo: '.search form',
		noCache: true,
		minChars: 2,
		onSelect: function (value, data) {
			return false;
		},
		maxHeight: 800,
		deferRequestBy: 500
	});
	$("#contact-form").submit(function (e) {
		e.preventDefault();
		var form = $(this);
		$.ajax({
			type: 'POST',
			data: form.serialize() + "&contact=1",
			success: function (data) {
				form.find('.modal-form__input-area').fadeOut();
				form.find('.modal-form__description').fadeOut();
				form.find('.modal-form__success').html('<p class="modal-form__success-text">Ваше сообщение получено, мы свяжемся с Вами в ближайшее время!</p>');
				form.find('.main__btn').attr('disabled', true);
			},
			error: function (data) {
			}
		});
	});
	$(document).on("click", ".filter legend", function (e) {
		console.log(e.target.tagName);
		if((!e.target.classList.contains("protip")) || e.target.tagName == "svg" ){
			var item = $(this);
			item.closest("fieldset").find(".filter_item_body").slideToggle();
		}
	});

	filterMove();
	/* 
	 ** Проверка ширины окна и выполнение функций в зависимости от размеров
	 */
	if ($(window).width() <= 991) {
		fixedMenuMobile();

		ApplySlinkyMenu();
		AppendSlinkyMenuToTempBlock();
		SlinckyToggleListener();

		if ($(".new-slider").length) {
			mySwiper_6.destroy();
		}
		if ($(".sale-slider").length) {
			mySwiper_7.destroy();
		}
	}
	fixedMenuDesktop();
	if ($(window).width() > 1199) {
		littleCart();
		/* 
		 ** Фиксированный стикер в корзине
		 */
		$(window).load(function () {
			if($('.airSticky').length){
				$('.airSticky').airStickyBlock({
					offsetTop: 115
				});
			}
		});
	}
	/* 
	 ** Изменение размеров окна 
	 ** Перекомпоновка элементов в зависимости от размеров 
	 */
	$(window).resize(function () {
		filterMove();
		if ($(window).width() <= 768) {
			fixedMenuMobile();
			if ($(".new-slider").length) {
				mySwiper_6.destroy();
			}
			if ($(".sale-slider").length) {
				mySwiper_7.destroy();
			}
		}
	})	
	// Выбор файла в окне рассчета
	$(document).on('click', '.delfile',function() {
		$(this).parents('.selectedfile').remove();
	});
	$(".form-callback__file input[type=file]").change(function(){
		var input = $(this);
		var fileList = $(this).get(0).files;
		var filesName = [];
		$.each(fileList, function(index, item) {
			var div = $('<span class="selectedfile">');
			div.append('<span>' + item.name + '<i class="delfile"><svg id="close-svg" viewBox="0 0 47.971 47.971" width="10px" height="10px"><path d="M28.228 23.986L47.092 5.122a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 1 0 4.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L28.228 23.986z"></path></svg></i></span>');
			div.append(input.clone().attr('name', 'file[]'));
			$('.form-callback__list-file').append(div);
			filesName.push(item.name.replace(/.*\\/, ""));
		});
	});

	$(document).on('click', '.form-callback__back',function() {
		$(this).closest("form").removeClass("hidden");
	});	

	$(".form-callback__form").submit(function(e) {
		e.preventDefault();
		var $that = $(this), 
				formData = new FormData($that.get(0));
		formData.append('select_light', 1);
		$.ajax({
			type: 'POST',
			contentType: false,
			processData: false,
			data: formData,
			success: function(data) { 
				$that.addClass("hidden");
				$that.find(".form-callback__field input").val("");
				$that.find('.selectedfile').remove();
			},
			error: function(data) {}
		});
	});

	$(".quick-view-link").fancybox({
		afterLoad: function(){
			forcedPickFirstColor();
			// slider_init_8();
			ZoomImageHandler('#imgZoom');
		}
	});

	scrollRevealInit();

	$('.tabs').each(function () {
		var tabs = $(this);
		var tab = $(this).find('.tabs__content');
		var captions = $('<div class="tabs__captions">');
		tab.hide();
		tab.each(function () {
			var index = tab.index($(this));
			var caption = $('<div class="tabs__caption">' + $(this).attr('data-caption') + '</div>');
			captions.append(caption);
			if (index == 0) {
				caption.addClass('tabs__caption--current');
				$(this).show();
			}
		});
		tabs.prepend(captions);
		captions.find('.tabs__caption').click(function () {
			tabs.find('.tabs__caption').removeClass('tabs__caption--current');
			$(this).addClass('tabs__caption--current');
			var index = $(this).index();
			tabs.find('.tabs__content').hide();
			tabs.find('.tabs__content:eq(' + index + ')').show();
		});
	});

});

function ZoomImageHandler(imageId) {
	$(imageId).zoom({
		magnify: 1
	});
}
function ZoomImgChangerListener() {
	$('body').on('click', ".quick-view .swiper-slide", () => {
		setTimeout(() => {
			ZoomImageHandler('#imgZoom', .7);
		}, 1000);
	})
}
/*function gcaptcha() {
	$('[data-grecaptcha]').grecaptcha({
		sitekey: '6LddIq0UAAAAAI3KNOokbIUyHg6Ej9WzuEsCNA-4',
		size: 'invisible'
	});
}*/

function ApplySlinkyMenu() {
	var slinky = $('#slinkytarget').slinky({
		title: true,
		speed: 300
	});
}
function SlinckyToggleListener() {
	$('.slinky-toggler').click(function () { 
		$('.inner-block').toggleClass('fixidit');
		$('.fixedHeader').toggleClass('showclo');
		$('.slinky__wrapper').toggleClass('slinky__wrapper--show');
		$('.slinky-toggler').toggleClass('is-active');
		$('body').toggleClass('fixed');
		$('html').toggleClass('fixed');

	});
}

function SlinckyToggleListenerNone(){
	let list = document.querySelector('.slinky__wrapper');
	let hamb = document.querySelector('.hamburger');
	$('#slinkytarget .list a').click(function() {
		if(list.classList.contains('slinky__wrapper--show')) {
			list.classList.remove('slinky__wrapper--show');
			document.documentElement.classList.remove("fixed");
			hamb.classList.remove('is-active');
			document.body.classList.remove("fixed");
		} 
	});
}

SlinckyToggleListenerNone();



function AppendSlinkyMenuToTempBlock() {

	let menu = document.querySelectorAll("#slinkytarget");
	let parent = document.querySelector(".slinky__wrapper");
	parent.append(menu[0]);
	let list = menu[0].querySelector(".list");
	let elems = menu[1].querySelectorAll(".list > li");
	list.append(...elems);

	$('.slinky-menu').append('<div class="mob-menu__bottom"></div>');
	$('.mob-menu__bottom').append( $('header .list').clone());
	$('.mob-menu__bottom').append( $('header .list-wish').clone());
	$('.mob-menu__bottom').append( $('header .header__contacts').clone());
	$('.mob-menu__bottom').append( $('header .header__social').clone());
	//$('.mob-menu__bottom .header__time').prepend('Прием заказов с 10-00 до 22-00 <br/>');
	$('.mob-menu__bottom .list-wish a').append('<span>Избранное</span>');
}
function AddCommentBtnListener() {
	$("#btnOpenAddComment").click(function () {
		$("#AddComment").slideToggle();
		$(this).toggleClass("open");
	});
}
function ViewToggleTypeListener() {
	$('.view-toggle__type').click((event) => {
		const type = $(event.target).closest('.view-toggle__type');
		$(type).addClass('view-toggle__type--current');
		$('.view-toggle__type').not(type).removeClass('view-toggle__type--current');
	});
}

function AccordionCollapseListeners() {
	$('.accordion__header').click((event) => {
		const card = $(event.target).closest('.accordion__card');
		$('.accordion__card:not(.vacancy)').not(card).removeClass('accordion__card--opened').find('.accordion__collapse').slideUp();
		$(card).toggleClass('accordion__card--opened').find('.accordion__collapse').slideToggle();
	});
}


/* $(document).ready(function() {

	ApplySlinkyMenu();

}); */




$(document).ready(function() {

	$(window).resize(function () {
		setHomePageVideoHeight();
	});

	$('body').on('click', ".load-modal[data-form]", function() {
		var id = $(this).data('form');
		var modal = $(this).data("modal");
		$.ajax({
			type: "POST",
			data: "getForm="+id,
			success: function(data){
				$(modal).remove();
				$('body').append(data);
				$(modal).fadeIn();
				$('html').addClass('fixed');
				gcaptcha();
				PhoneMask();
			}
		});		
	});

	$("body").on('submit', '[data-ajax]', function (e) {
		e.preventDefault();
		var form = $(this);
		id = form.find('.grecaptcha').attr('id');
		grecaptcha.execute(window['captcha_'+id]);
		return false;
	});

	$("body").on("click", "[class*='modal-form__close']", function() {
		if (typeof $(this).closest(".modal-form__fone").data('data-id') !== 'undefined') {
			FadeOutMainModal(this);
			$('html').removeClass('fixed');
		} else {
			$(this).closest(".modal-form__fone").fadeOut();
			$('html').removeClass('fixed');
		}
	});

	$("body").on("click", ".modal-form__fone", function(e) {
		var div = $(".modal-form"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
				&& div.has(e.target).length === 0) { // и не по его дочерним элементам
			$(this).closest(".modal-form__fone").fadeOut();
			$('html').removeClass('fixed');
		}
	});


	$("body").on("submit", "#cheaper-form", function(event) {
		event.preventDefault();
		var form = $(this);
		$.ajax({
			type: 'POST',
			data: form.serialize() + "&cheaper=1",
			success: function (data) {
				form.find('.modal-form__input-area').fadeOut();
				form.find('.modal-form__description').fadeOut();
				form.find('.modal-form__success').html('<p class="modal-form__success-text">Ваше сообщение получено, мы свяжемся с Вами в ближайшее время!</p>');
				form.find('.main__btn').attr('disabled', true);

				setTimeout(() => {
					FadeOutMainModal(form);
				}, 4000);
			},
			error: function (error) {
				form.find('.modal-form__success').html('<p class="modal-form__success-text">Произошла ошибка. Попробуйте позднее.</p>');
			}
		});
	});

	$("body").on("submit", "#say-when-have__form", function(event) {
		event.preventDefault();
		var form = $(this);
		$.ajax({
			type: 'POST',
			data: form.serialize() + "&say-when-have=1",
			success: function (data) {
				form.find('.modal-form__input-area').fadeOut();
				form.find('.modal-form__description').fadeOut();
				form.find('.modal-form__success').html('<p class="modal-form__success-text">Ваше сообщение получено, мы свяжемся с Вами в ближайшее время!</p>');
				form.find('.main__btn').attr('disabled', true);

				setTimeout(() => {
					FadeOutMainModal(form);
				}, 4000);
			},
			error: function (error) {
				form.find('.modal-form__success').html('<p class="modal-form__success-text">Произошла ошибка. Попробуйте позднее.</p>');
			}
		});
	});



	if ($('.delivery-pickup__box').length) {
		ymaps.ready(deliveryMapInit);

		let deliveryMap;
		let checkedDeliveryAddress = $('.delivery-pickup__box input[checked="checked"]');

		function deliveryMapInit(){
			if ($('.delivery-pickup__box input:checked').length != 0) {
				checkedDeliveryAddress = $('.delivery-pickup__box input:checked');
				// console.log('change');
			}
			let coordDelivery = $(checkedDeliveryAddress).data('coord');
			coordDelivery = coordDelivery.split(',');
			let latDelivery = coordDelivery[0];
			let longDelivery = coordDelivery[1];
			// console.log('change');
			// console.log(latDelivery);

			deliveryMap = new ymaps.Map("delivery_map", {
				center: [longDelivery, latDelivery],
				zoom: 15,
			}),
				myPlacemark = new ymaps.Placemark([longDelivery, latDelivery], {}, {
				preset: 'islands#darkGreenIcon',
			});
			deliveryMap.geoObjects.add(myPlacemark);


		}
		$('.delivery-pickup__box input').on('change', function() {
			deliveryMap.destroy();
			deliveryMapInit();
		})

	}


});




$('body').on("click", ".cheaper-caller", function () {
	$("#cheaper").fadeIn();

	setTimeout(() => {
		const input = document.querySelector('.modal-form__input-textarea');
		input.addEventListener('focusin', () => {
			input.classList.add('focus');
		});
		input.addEventListener('focusout', () => {
			const trimedValue = input.value.trim();
			if (trimedValue) {
			} else {
				input.classList.remove('focus');
			}
		});
	}, 2000);
	return false;
});

$('body').on("click", ".say-when-have", function () {
	$("#say-when-have").fadeIn();
});

$('body').on("click", ".sizes-caller", function () {
	$("#sizes").fadeIn();
	return false;
});


function FadeOutMainModal(selector) {
	$(selector).closest(".modal-form__fone").fadeOut(() => {
		$(selector).closest(".modal-form__fone").remove();
	});
}

var disabledFields = {};
var requiredFields = {};

/*схлопывалка отзывов*/
$(document).ready(function () {
	$(document).on('click', '.more_comments', function () {
		/*высота текста*/
		var h = 0;
		$(this).closest(".request__comment").find(".request__comment-text").children().each(function(){
			h += $(this).outerHeight();
		});

		if($(this).prev(".request__comment-text").hasClass("expanded")){
			$(this).prev(".request__comment-text").attr("style", "");
		}
		else{
			$(this).prev(".request__comment-text").css({maxHeight: h})
		}
		$(this).prev(".request__comment-text").toggleClass("expanded");
		$(this).text($(this).text() == 'Развернуть' ? 'Свернуть' : 'Развернуть');
	});
});

jQuery.validator.addMethod("phoneAny", function(phone_number, element) {
phone_number = phone_number.replace(/\s+/g, ""); 
return this.optional(element) || phone_number.length > 10 &&
    phone_number.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/);
});

$(document).ready(function () {


$("#buyoneclick form").on("submit", function(event) {
	console.log('Купить в 1 клик');
		//dataLayer.push({'event': 'order'});					
});	
	
$(".form-cart").on("submit", function(event) {
	//console.log('Оформить заказ в корзине');
		dataLayer.push({'event': 'order'});					
});
	
	
	
	$(document).on('click', '.notification__close', function () {
		elem = $(this);
		elem.closest(".notification").slideUp();
		setTimeout(function () {
			$(".notification").remove();
		}, 500)
	});

	$("body").attr("style", "--header-height: " + $('header').height() + "px;");

	if ($(window).width() < 992) {
		$('header .cart').appendTo('body');
	}
    
    if($('.timepicker').length > 0) {
        var date = new Date();
        $('.timepicker').wickedpicker({
    	    now: date.getHours()+":"+Math.round(date.getMinutes()/10)*10,
    		twentyFour: true,
    		minutesInterval: 10,
    	});
    }

	if ($('.datepicker-here').length) {
		$('.datepicker-here').datepicker({
			inline: true,
			minDate:  new Date(),
			onSelect: function(selectedDate){
				$('input.datepicker-here').attr('value', selectedDate);
			}
		});
		$('.datepicker-here').data('datepicker').selectDate(new Date());
	}
    
	$('body').on('click', '.tabs_cart .tabs_link a', function(e) {
		var parent = $(this).parents('.tabs_cart:first');
		var id = $(this).data('id');
		var price_dost1 = $('.itog_col .body > .dost');
		var price_dost2 = $('.itog_col .body > .it_dost');
		parent.find('.tabs_link a:not([data-id="'+id+'"])').removeClass('active');
		$(this).addClass('active');
		if (id == 'tab_delivery_7') {
			price_dost1.hide();
			price_dost2.hide();
		} else {
			price_dost1.show();
			price_dost2.show();
		}
		setTimeout(function() {
			parent.find('.tabs_tab:not(#'+id+')').hide();

			parent.find('.tabs_tab:not(#'+id+')').each(function() {
				var tab = $(this);
				if (disabledFields[tab.attr('id')] === undefined) {
					disabledFields[tab.attr('id')] = [];
				}
				if (requiredFields[tab.attr('id')] === undefined) {
					requiredFields[tab.attr('id')] = [];
				}
				tab.find('input, select, textarea').each(function() {
					$(this).prop('disabled', true);
					disabledFields[tab.attr('id')].push($(this));

					if ($(this).prop('required')) {
						requiredFields[tab.attr('id')].push($(this));
						$(this).prop('required', false);
					}
				});
			});

			var showTab = parent.find('.tabs_tab#'+id);
			showTab.show();
			if (disabledFields[id] !== undefined) {
				$.each(disabledFields[id], function() {
					$(this).prop('disabled', false);
				});
				disabledFields[id] = [];
			}
			if (requiredFields[id] !== undefined) {
				console.log(requiredFields[id]);
				$.each(requiredFields[id], function() {
					//		$(this).prop('required', true);
				});
				requiredFields[id] = [];
			}

			var conditions = showTab.find('[type="hidden"][name="shop_delivery_condition_id"], [name="shop_delivery_condition_id"]:checked, [name="shop_delivery_condition_id"] option:selected');
			$.set_delivery($(conditions).get(0));
			/*
			setTimeout(function() {
	//			window.maprest.container.fitToViewport();
	//			window.maprest.setBounds(window.maprest.geoObjects.getBounds());
			}, 100);
			*/
		}, 30);

		$('.oformlenie-box.form-cart').validate({
            rules: {
                phone: {
                    phoneAny: true
                }
            },
            messages: {
                phone: {
                    phoneAny: 'Некорректный номер!'
                }
            }
        });
		
// 		if ($('.tabs_btns .h3__card[data-id="tab_delivery_7"]').hasClass('active')) {
// 		    if (!$('.card-contact__box .data-input__card').hasClass('has-error')) {
// 		        $('[type="submit"]').prop('disabled', false);
// 		        $('[type="submit"]').removeClass('disabled');
// 		    } else {
// 		        $('[type="submit"]').prop('disabled', true);
// 		        $('[type="submit"]').addClass('disabled');
// 		    }
// 		}
		
		return false;
	});
	
	setTimeout(function() {
		$('.tabs_cart .tabs_link:first a').trigger('click');
	}, 200);

	$('.data-input__card input[required]').change(function() {
		//$(this).parents('.data-input__card').addClass('input-changed field_large');

// 		if ($('.tabs_btns .h3__card[data-id="tab_delivery_7"]').hasClass('active')) {
// 		    if ($('.card-contact__box .has-error').length == 0) {
// 		        $('[type="submit"]').prop('disabled', false);
// 		        $('[type="submit"]').removeClass('disabled');
// 		    } else {
// 		        $('[type="submit"]').prop('disabled', true);
// 		        $('[type="submit"]').addClass('disabled');
		        
// 		    }
// 		} else {
// 		    if ($('.data-input__card').hasClass('has-error')) {
// 		        $('[type="submit"]').prop('disabled', true);
// 		        $('[type="submit"]').addClass('disabled');
// 		    } else {
// 		        $('[type="submit"]').prop('disabled', false);
// 		        $('[type="submit"]').removeClass('disabled');
// 		    }
// 		}


	});

	$('input[name="property_366"]').change(function() {
		var input = $(this);
		var block = input.parents('.delivery-date__box:first').find('input:not([type=radio])').prop('disabled', true);
		$(input).parents('.delivery-date__item:first').find('input').not(input).prop('disabled', false);
		if (input.val() == 575) {
		    $('input[name="property_363"]').prop('required',true).attr('required','required');
		} else {
		    $('input[name="property_363"]').prop('required',false).removeAttr('required');
		}
	});

	$('.tabs_tab .radio__item:first').find('input[type=radio]').prop('checked', true).attr('checked', 'checked');

});

window.onload = function clerUrl() {
	if(location.hash.trim()) {
		var hashurl = location.hash.split("!")[1];
		location.hash = hashurl;
	}
};


/*Подсвечиваем пункт меню блок которого перед нами*/
jQuery(function($) {
	var section = $('.shop_table'),
			nav = $('.fixedHeader ul:first'),
			navHeight = nav.outerHeight(); // получаем высоту навигации 
	// поворот экрана 
	window.addEventListener('orientationchange', function () {
		navHeight = nav.outerHeight();
	}, false);
	var itemList = [];
	var navwidth = nav.outerWidth();
	var firstleft = $('.fixedHeader ul li:first').offset().left;
	nav.children('li').each(function() {
		itemList.push($(this).position().left);
	});
	$(window).on('scroll', function () {
		const position = $(this).scrollTop() + 400;
		section.each(function () {
			const top = $(this).offset().top - navHeight - 5,
						bottom = top + $(this).outerHeight();
			if (position >= top && position <= bottom && !$(this).hasClass('focus')) {
				$('.shop_table.focus').removeClass('focus');
				$(this).addClass('focus');
				nav.find('a').removeClass('active');
				section.removeClass('active');
				var menuSec = nav.find('a[href="/#!' + $(this).attr('id') + '"]');
				var parent = menuSec.parent('li');

				if (menuSec.length) {
					if (!menuSec.hasClass('active')) {
						menuSec.addClass('active');
						scrollLeft = itemList[parent.index()];
						if (scrollLeft >= Math.floor(navwidth / 2) - parseInt(parent.outerWidth() / 2)) {
							//console.log('scrollLeft >= Math.floor(navwidth / 2)');
							//console.log(scrollLeft, Math.floor(navwidth / 2));
							scrollLeft = scrollLeft - Math.floor(navwidth / 2) + parseInt(parent.outerWidth() / 2);
							//console.log(scrollLeft);
						} else if (scrollLeft < Math.floor(navwidth / 2)) {
							scrollLeft = 0;
						}
						/*function scrollFixMenu() {
							nav.stop().animate({
							scrollLeft: scrollLeft
						}, 500, "linear");
							requestAnimationFrame(scrollFixMenu);
						}
						scrollFixMenu();*/

						nav.stop().animate({
							scrollLeft: scrollLeft
						}, 100, "linear");
						return false;						
					}
				}
			}
		});
	});
});

let submenu = document.querySelector('.submenu-delivery')
let topSubmenu = document.querySelector('.submenu-delivery__wrp')
topSubmenu.append(submenu)

$(document).ready(function(){
    
    if($('.tab_group_glav').length > 0) {
        $('.tab_group_glav .tab_title').on('click', function(){
            $('.tab_group_glav').find('.active').removeClass('active');
            $(this).addClass('active');
            $('.shop_table.card-list.hiden_tab').removeClass('hiden_tab');
            let id = $(this).data('tab');
            $('#'+id).addClass('hiden_tab');
        })
    }
    
  $('.fixedHeader .list').slick({
	infinite: false,
	speed: 300,
	variableWidth: true,
	swipeToSlide: true,
	arrows: false,
	slidesToScroll: 3,
	responsive: [
		{
			breakpoint: 1360,
			settings: {

			}
		},
		{
			breakpoint: 1024,
			settings: {

			}
		},
		{
			breakpoint: 992,
			settings: {

			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 376,
			settings: {
				slidesToShow: 2,
			}
		}
	]
  });
  
    var mySwiper_33 = new Swiper('#sliderHome', {
      slidesPerView: 1,
      autoplay: {
        delay: 5000,
      },
      loop: true,
      pagination: {
        el: '#sliderHome .swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
 
});