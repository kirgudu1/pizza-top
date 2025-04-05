$().ready(function() {
	var fixedHeader = $('<div class="fixedHeader"><div class="container"></div></div>');
	window.headerHeight = $('header').outerHeight() + $('.top-menu').outerHeight();
	var container = fixedHeader.find('.container');
	//container.append( $('header .logo').clone());
	container.append( '<div class="logo"><a href="/" title="Kirimati"><img src="/img/kirim_logo_small.svg" alt=""></a></div>');
	container.append( $('.top-menu.tovar_menu ul.list').clone());
	container.append( $('header .header__contacts').clone());
	// container.append( $('header .compare').clone());
	// container.append( $('header .list-wish').clone());
	container.append( $('header .cart').clone());
        container.append( '<div class="hamburger__btn"><div class="hamburger slinky-toggler" id="hamburger-1"><span class="line"></span><span class="line"></span><span class="line"></span></div></div>');
	// container.append( $('header .btn-search').clone());

	fixedHeader.appendTo('body');
});