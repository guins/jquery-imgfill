$(function()
{
	var _w = $(window),
		_pages = $('[data-role=page]'),
		_exemples = $('[data-imgfill]');

	_w.bind('load resize', function()
	{
		var w = $(window).width(),
			h = _w.height();

		_pages.css({ width : w, height : h });
		_exemples.css({
			width 	: (((w-4*20)/3)>>0) + 'px',
			height 	: (((h-4*20)/3)>>0) + 'px'
		});
	});

	// Home
	$('#home > img').imgfill();

	// All exemples
	_exemples.each(function()
	{
		var $container = $(this),
			align = $container.attr('data-imgfill-align'),
			$imgs = $('img', $container);

		$imgs.imgfill({
			$container 	: $container,
			align 		: align
		});
	});
});