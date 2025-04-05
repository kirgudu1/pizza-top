function initMapCart() {
	var zoom = 11;
	
	    var textLayouts = {
            label: '<div>{{properties.description}}</div>',
            hint: ymaps.templateLayoutFactory.createClass('<div>{{properties.description}}</div>')
        };
    window['myMap'] = new ymaps.Map('map_cart', {
            center: [83.695740, 53.314532],
            zoom: zoom,
            controls: []
        }),
        deliveryPoint = new ymaps.GeoObject({
            geometry: {type: 'Point'},
            properties: {iconCaption: 'Адрес'}
        }, {
            preset: 'islands#blackDotIconWithCaption',
            draggable: true,
            iconCaptionMaxWidth: '215'
        }),
        //myMap.behaviors.disable('scrollZoom');
       
     
		
    //    searchControl = myMap.controls.get('searchControl');
		

	//	console.log(searchControl);
	//	searchControl.options.set({noPlacemark: true, placeholderContent: 'Введите адрес доставки'});
		myMap.geoObjects.add(deliveryPoint);

	/*
		if (widthWindow <= 768) {
			myMap.behaviors.disable('drag');
		}
*/
//	 if ($('body').hasClass('mobile')) {		 
//	 }
    function onZonesLoad(json) {
		
		var correctID = false;
		var sendForm = false;
		var bsendForm = false;
		$().ready(function() {
			timeOut = false;
			/*
			$(document).on('change' ,'select[name="address"]', function(){
				search();
			});
			*/
			$('[data-id="tab_delivery_2"]').on('click', function(){
				search();
			});
			$('[name="address_id"]').change(function() {
				search2();
			});

			$(document).on('change', 'input[name="house"]', function(){
				var value = $(this).val();
				if (value.trim() != '') {
					search();
				}
			});
			

			
			$('#shop_delivery_condition_id').on('change', function() {
				correctID = false;
			});
	
			$('body').on('submit', '.oformlenie-box.form-cart', function() {
				if ($('[data-id="tab_delivery_2"].active').length) {
					$('html').addClass('loading');
					if (bsendForm && correctID) {
						bsendForm = false;
						sendForm = false;
						correctID = false;
						$(this).append('<input value="1" name="makeorder" type="hidden"/>');
						return true;
					}
					correctID = false;
					sendForm = true;
					search();
					return false;
				} else {
					$(this).append('<input value="1" name="makeorder" type="hidden"/>');
				}
			});
			/*
			$(document).on('change', 'input[name="flat"]', function(){
				search();
			});
			*/
		});

        // Добавляем зоны на карту.
        var deliveryZones = ymaps.geoQuery(json).addToMap(myMap);
		var aPoints = [];
        // Задаём цвет и контент балунов полигонов.
		
		// Создадим менеджер объектов.
		var objectManager = new ymaps.ObjectManager();

        deliveryZones.each(function (obj) {
            var color = obj.properties.get('fill');
			var stroke = obj.properties.get('stroke');
            obj.options.set({fillColor: color, fillOpacity: 0.4, strokeColor: stroke, strokeWidth: 1,labelDefaults: 'light', labelLayout: textLayouts.label,labelTextSize: {'3_6': 12, '7_18': 14},labelPermissibleInaccuracyOfVisibility: 4});
      //      obj.properties.set('balloonContent', obj.properties.get('name'));
    //        obj.properties.set('balloonContentHeader', 'Стоимость доставки: ' + obj.properties.get('price') + ' р.');
			if (obj.geometry.getType() != 'Point') {
				obj.events.add('click', function(e) {
					var object = e.get('target');
					if (object.geometry.getType() != 'Point') {
						var coords = e.get('coords');
						deliveryPoint.geometry.setCoordinates(coords);
						highlightResult(deliveryPoint);
						ymaps.geocode(coords).then(function (res) {
							var nearest = res.geoObjects.get(0);
							var name = nearest.properties.get('name');
							var GeocoderMetaData = nearest.properties.get('metaDataProperty.GeocoderMetaData')
							$('#data-address').val('');
							$('#data-house').val('');
							GeocoderMetaData.Address.Components.forEach(function(item) {
								switch (item.kind) {
									case 'street': {
										sStreet = item.name.replace(/улица/gi, '');
										if (sStreet.indexOf('проспект') == 0) {
											sStreet = sStreet.replace(/проспект/gi, '') + ' проспект';
										}
										sStreet = sStreet.replace(/ё/gi, 'е');
										sStreet = sStreet.trim();
										$('#data-address').val(sStreet);
										break;
									}
									case 'house': {
										$('#data-house').val(item.name);
										break;
									}
									case 'entrance': {
									//	$('#prop_podezd').val(item.name.replace(/[^0-9]/gim,''));
										break;
									}
								}
							});

							var sStreet = name.split(',')[0];
							$('select#select_street option').val(sStreet).html(sStreet);

							$('input#select_house').val(name.split(',')[1]).trigger('change');

							$('#select_street-selectized').val(sStreet).attr('value', sStreet).css({width: 'auto'}).trigger('change').siblings('.item').html(sStreet);
						});
					}
				});
			} else {
		//		obj.addToMap(myMap);
				aPoints.push(obj);
			}
		//	myMap.geoObjects.add(obj);
		//	obj.options
			objectManager.add(obj);
        });
	
		myMap.geoObjects.add(objectManager);

	//	const polylabel = new Polylabel(map, objectManager);
		//const polylabel = new ymaps.polylabel.create(myMap, objectManager);
		var oPoints = ymaps.geoQuery(aPoints);
		
		

        // Проверим попадание результата поиска в одну из зон доставки.
    /*    searchControl.events.add('resultshow', function (e) {
            highlightResult(searchControl.getResultsArray()[e.get('index')]);
        });*/
/*
        // Проверим попадание метки геолокации в одну из зон доставки.
        myMap.controls.get('geolocationControl').events.add('locationchange', function (e) {
            highlightResult(e.get('geoObjects').get(0));
        });
		*/
        // При перемещении метки сбрасываем подпись, содержимое балуна и перекрашиваем метку.
        deliveryPoint.events.add('dragstart', function () {
            deliveryPoint.properties.set({iconCaption: '', balloonContent: ''});
            deliveryPoint.options.set('iconColor', 'black');
        });

        // По окончании перемещения метки вызываем функцию выделения зоны доставки.
        deliveryPoint.events.add('dragend', function () {			
            highlightResult(deliveryPoint);
        });
		/*
		$('body').on('click', 'form.oformlenie-box.form-cart .send-order', function() {
			console.log($('[data-id="tab_delivery_2"].active'));
			if ($('[data-id="tab_delivery_2"].active').length) {
				search();
			}
		});
		*/
		
		if (window.searchMap) {
			search();
			window.searchMap = false;
		}
		if (window.searchMap2) {
			window.searchMap2 = false;
			search2();
		}

		
		function search2() {
			var ulitsa = $('select[name="address_id"]').find('option:selected').html();

            var city = 'Барнаул';
	//		console.log(value);
			var myGeocoder = ymaps.geocode(ulitsa + ' ' + city, {
				results: 1
			});

			myGeocoder.then(
				function(res) {
					var coords = res.geoObjects.get(0).geometry.getCoordinates();
					deliveryPoint.geometry.setCoordinates(coords);
					
					
					var coords = deliveryPoint.geometry.getCoordinates(),
					// Находим полигон, в который входят переданные координаты.
					polygon = deliveryZones.searchContaining(coords).get(0);
					correctID = false;
					if (polygon) {
						// Уменьшаем прозрачность всех полигонов, кроме того, в который входят переданные координаты.
						var sum = parseInt($('.basket-table__total').data('sum'));
						var free = parseInt(polygon.properties.get('free'));
						if (sum >= free) {
							price = 0;
							id = polygon.properties.get('free_id');
						} else {
							var price = polygon.properties.get('price');
							var id = polygon.properties.get('id');
						}
						$('#shop_delivery_condition_id').val(id);
						$('#shop_delivery_condition_id').attr('data-prices', price);
						correctID = true;
						$('[name="time"]').val(polygon.properties.get('time'));
						$('#stoimost_dostavki span').html(price + ' руб.');
						//$('[type="submit"]').removeAttr('disabled');
					}
				},
				function(err) {
					correctID = false;
					$('body').append('<div class="back-modal"><div class="warning-win modal-win nodelivery-win"><div class="btn-close-win"><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><use xlink:href="#close-icon" x="0" y="0"></use></svg></div><div class="warning__title">Внимание!</div><div class="warning__text">К сожалению, пока данный адрес не входит в зону доставки, укажите другой адрес или воспользуйтесь самовывозом</div><div class="map-delivery__map_ok"><span class="btn orange-btn">Ок</span></div></div></div>');
					clearMarkers();
					//$('[type="submit"]').attr('disabled', 'disabled');
					// обработка ошибки
				}
			);
			return;
		}

		function search() {
			var ulitsa = $('#data-address').val();
			
            var dom = $('input[name="house"]').val();
			
			if (dom.trim() == '') {
				//$('body').append('<div class="back-modal"><div class="warning-win modal-win nodelivery-win"><div class="btn-close-win"><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><use xlink:href="#close-icon" x="0" y="0"></use></svg></div><div class="warning__title">Внимание!</div><div class="warning__text">К сожалению, пока данный адрес не входит в зону доставки, укажите другой адрес или воспользуйтесь самовывозом</div><div class="map-delivery__map_ok"><span class="btn orange-btn">ОК</span></div></div></div>');
			//	clearMarkers();
				//$('[type="submit"]').attr('disabled', 'disabled');				
				return;
			}
            var value = ulitsa + ' ' + dom;
            var city = 'Барнаул';
	//		console.log(value);
			var myGeocoder = ymaps.geocode(value + ' ' + city, {
				results: 1
			});

			myGeocoder.then(
				function(res) {
					var coords = res.geoObjects.get(0).geometry.getCoordinates();
					
					var GeocoderMetaData = res.geoObjects.get(0).properties.get('metaDataProperty.GeocoderMetaData');
					GeocoderMetaData.Address.Components.forEach(function(item) {
						switch (item.kind) {
							case 'street': {
								sStreet = item.name.replace(/улица/gi, '');
								if (sStreet.indexOf('проспект') == 0) {
									sStreet = sStreet.replace(/проспект/gi, '') + ' проспект';
								}
								sStreet = sStreet.replace(/ё/gi, 'е');
								sStreet = sStreet.trim();
								$('#data-address').val(sStreet);
								break;
							}
							case 'house': {
								$('#data-house').val(item.name);
								break;
							}
							case 'entrance': {
							//	$('#prop_podezd').val(item.name.replace(/[^0-9]/gim,''));
								break;
							}
						}
					});
					myMap.setCenter(coords, myMap.getZoom());
					deliveryPoint.geometry.setCoordinates(coords);
					
			//		$('[type="submit"]').removeAttr('disabled');
					
					highlightResult(deliveryPoint);
				},
				function(err) {
					$('body').append('<div class="back-modal"><div class="warning-win modal-win nodelivery-win"><div class="btn-close-win"><svg xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16"><use xlink:href="#close-icon" x="0" y="0"></use></svg></div><div class="warning__title">Внимание!</div><div class="warning__text">К сожалению, пока данный адрес не входит в зону доставки, укажите другой адрес или воспользуйтесь самовывозом</div><div class="map-delivery__map_ok"><span class="btn orange-btn">Ок</span></div></div></div>');
					clearMarkers();
					//$('[type="submit"]').prop('disabled', true);
					// обработка ошибки
				}
			);
			return;
		}
		
		function setData (obj, polygon, deliveryPoint) {
			var house = obj.getPremiseNumber() || false;
			var total = parseFloat($('.itogo .price').data('price')) * 100 / 100;
			if (!house) {
				//$('[type="submit"]').prop('disabled', true);
				price = '--';
				$('.fullpricedelivery').html(total);
				deliveryPoint.properties.set({
					iconCaption: 'Выберите корректный адрес',
					balloonContent: '',
					balloonContentHeader: ''
				});
				$('#data-house').val('');
				//alert('Сюда доставки временно нет.');
			} else {
				var address = [obj.getThoroughfare(), obj.getPremiseNumber(), obj.getPremise()].join(' ');
				if (address.trim() === '') {
					address = obj.getAddressLine();
				}
				$('#data-house').val(house);
				var price = parseFloat(polygon.properties.get('price')) * 100 / 100;
				var free = parseFloat(polygon.properties.get('free')) * 100 / 100;
				var id_ship = polygon.properties.get('id');	
				if (total >= free) {
					id_ship = polygon.properties.get('free_id');
					price = 0;
				}
				$('.fullpricedelivery').html(total + price);
			//	var price = price + ' рублей';
				$('#shop_delivery_condition_id').attr('data-prices', price);
				$("#shop_delivery_condition_id").val(id_ship);
				console.log(id_ship);
				correctID = true;
		//		$('#pricedelivery span').html(price);
				//$('#valid_address').prop('checked', true);
				//$('.pricedelivery').html(price);
				deliveryPoint.properties.set({
					iconCaption: address.trim() + ": " + price,
					balloonContent: address.trim(),
					balloonContentHeader: '<b>Стоимость доставки: ' + price + '</b>'
				});
			}
			if (sendForm && correctID) {
				bsendForm = true;

				$('.oformlenie-box.form-cart').trigger('submit');
			}
			//$('.oformlenie-box.form-cart').validator('validate');
			// if ($('.oformlenie-box.form-cart .has-error').length == 0) {
			// 	$('[type="submit"]').prop('disabled', false);
			// } else {
			// 	$('[type="submit"]').prop('disabled', true);
			// }
			$('.pricedelivery').html(price);
		}
		
		function highlightResult(obj) {
			// Сохраняем координаты переданного объекта.
		//	console.log(deliveryZones);
			var coords = obj.geometry.getCoordinates();
					// Находим полигон, в который входят переданные координаты.
			
			polygon = deliveryZones.searchContaining(coords).get(0);

			if (polygon) {
				// Уменьшаем прозрачность всех полигонов, кроме того, в который входят переданные координаты.
				deliveryZones.setOptions('fillOpacity', 0.4);
				polygon.options.set('fillOpacity', 0.8);
				// Перемещаем метку с подписью в переданные координаты и перекрашиваем её в цвет полигона.

				deliveryPoint.geometry.setCoordinates(coords);
				deliveryPoint.options.set('iconColor', polygon.options.get('fillColor'));

				//$('.oformlenie-box.form-cart').validator('validate');
				// Задаем подпись для метки.
				if (typeof (obj.getThoroughfare) === 'function') {
					setData(obj, polygon, deliveryPoint);
					//	setData(obj);
				} else {
					// Если вы не хотите, чтобы при каждом перемещении метки отправлялся запрос к геокодеру,
					// закомментируйте код ниже.
					ymaps.geocode(coords, {results: 1}).then(function (res) {
						var obj = res.geoObjects.get(0);
						setData(obj, polygon, deliveryPoint);
					});
				}
			} else {
				// Если переданные координаты не попадают в полигон, то задаём стандартную прозрачность полигонов.
				deliveryZones.setOptions('fillOpacity', 0.4);
				// Перемещаем метку по переданным координатам.
				deliveryPoint.geometry.setCoordinates(coords);
				// Задаём контент балуна и метки.
				$('#pricedelivery span').html('-- рублей');
				deliveryPoint.properties.set({
					iconCaption: 'Нет доставки',
					balloonContent: 'К сожалению сюда нет доставки',
					balloonContentHeader: ''
				});
				//$('.oformlenie-box.form-cart').validator('validate');
				$('#data-address').val('');
				$('#data-house').val('');
				//$('#valid_address').prop('checked', false);
				// Перекрашиваем метку в чёрный цвет.
				deliveryPoint.options.set('iconColor', 'black');
				//$('[type="submit"]').prop('disabled', true);
			}
			$('html').removeClass('loading');
		}
    }

    $.ajax({
        url: '/js/shipping.json?'+Date.now(),
        dataType: 'json',
        success: onZonesLoad
    });
}
$().ready(function(){
	
	if ($('#map_cart').length) {	
		ymaps.ready(initMapCart);
	}
	
	$('#data-address').autocomplete({
		serviceUrl: '/menu/cart/?autocomplete=1',
		delimiter: ',',
		appendTo: $('#data-address').parent(),
		noCache: true,
		minChars: 2,
		paramName: 'getStreet',
		description: false,
		onSelect: function (suggestion) {
		//	$(this).trigger('onSelectComplete');
			return false;
		},
		maxHeight: 400,
		deferRequestBy: 500
	});
});