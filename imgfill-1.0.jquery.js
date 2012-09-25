/* ------------------------------------------------------------------------------------------------------
| A jQuery plugin to fill an element with image(s)
| -------------------------------------------------------------------------------------------------------
|
| This very simple plugin allows you to fill a html element with 1 or more image(s).
|
| Plugin name : Img Fill
| Version : 1.0
| author : Stéphane Guigné (http://stephaneguigne.com)
|
| Simple exemple : 
    $('.my_elements').imgfill();
|
| Full options exemple : 
    $('.my_elements').imgfill(
    {	
    	align 		: 'center', 	// Set the alignment (center, topleft, top, topright, right, bottomright, bottom, bottomleft, left) case insensitive and shortcut allowed (c, tl, t, tr, r, br, b, bl, l)
    	container 	: null,			// Define the container class name
		$container 	: $(window) 	// if you prefer, define directly the container DOM element (It will override "container" option)
    });
|
*/
;(function($)
{
	var imgFill = (function()
	{
		var settings = {
				isInit  : false,
				aImgs 	: []
			},
			_w = $(window);

		function _init()
		{
			settings.isInit = true;
			_w.bind("load.imgfill resize.imgfill", function() 
			{ 
				$.each(settings.aImgs, function(i,$img)
				{
					if($img && $img.length>0) resizeAndReplaceImg($img);
				});
			});
		}

		function onImgLoaded($img)
		{
			if(!settings.isInit) _init();

			$img.data('originalHeight', $img.height() );
			$img.data('originalWidth', $img.width() );

			settings.aImgs.push($img);
			resizeAndReplaceImg($img);
		}

		function resizeAndReplaceImg($img)
		{
			var options = $img.data('options'),
				ratio = $img.data('originalHeight') / $img.data('originalWidth'),
				containerWidth = options.$container.width(),
				containerHeight = options.$container.height(),
				widthTo, heightTo, leftTo, rightTo, topTo, bottomTo;
			
			// Scale
			if ((containerHeight/containerWidth) > ratio){
				heightTo = containerHeight;
				widthTo = containerHeight / ratio;
			} else {
				widthTo = containerWidth;
				heightTo = containerWidth * ratio;
			}

			// Replace
			switch(options.align.toUpperCase())
			{
				case 'TL' || 'TOPLEFT' :
					topTo = 0;
					rightTo = "auto";
					bottomTo = "auto";
					leftTo = 0;
				break;
				case 'TR' || 'TOPRIGHT' :
					topTo = 0;
					rightTo = 0;
					bottomTo = "auto";
					leftTo = "auto";
				break;
				case 'T' || 'TOP':
					topTo = 0; 
					rightTo = "auto";
					bottomTo = "auto";
					leftTo = (containerWidth - widthTo)/2;
				break;
				case 'BL' || 'BOTTOMLEFT' :
					topTo = (containerHeight - heightTo); 
					rightTo = "auto";
					bottomTo = "auto";
					leftTo = 0;
				break;
				case 'BR' || 'BOTTOMRIGHT': 
					topTo = (containerHeight - heightTo);
					rightTo = 0;
					bottomTo = "auto";
					leftTo = "auto";
				break;
				case 'B' || 'BOTTOM':
					topTo = (containerHeight - heightTo); 
					rightTo = "auto";
					bottomTo = "auto";
					leftTo = (containerWidth - widthTo)/2;
				break;
				case 'C' || 'CENTER':
					topTo = (containerHeight - heightTo)/2;
					rightTo = "auto";
					bottomTo = "auto";
					leftTo = (containerWidth - widthTo)/2;
				break;
				case 'L' || 'LEFT':
					topTo = (containerHeight - heightTo)/2;
					rightTo = "auto";
					bottomTo = "auto";
					leftTo = 0;
				break;
				case 'R' || 'RIGHT':
					topTo = (containerHeight - heightTo)/2;
					rightTo = 0;
					bottomTo = "auto";
					leftTo = "auto";
				break;
				default:
					topTo = (containerHeight - heightTo)/2;
					rightTo = "auto";
					bottomTo = "auto";
					leftTo = (containerWidth - widthTo)/2;
				break;
			}
			
			$img.css({
				'position' 	: "absolute",
				'width' 	: widthTo,
				'height' 	: heightTo,
				'left'		: leftTo,
				'right'		: rightTo,
				'top'		: topTo,
				'bottom'	: bottomTo
			});
		}

		return {
			onImgLoaded 		: onImgLoaded,
			resizeAndReplaceImg : resizeAndReplaceImg
		};
	})();

	$.fn.imgfill = function(options) {

		var defaults = { 
				align 		: 'center',
				container 	: null,
				$container 	: $(window)
			};

		if(options && options.container && options.container!="") {
			options.$container = $(options.container);
			options.$container.css('overflow','hidden');
		}
		options = $.extend({}, defaults, options);
		
		return this.each(function () 
		{	
			var $img = $(this);
			$img.data('options', options );

			if($img.height() && $img.height()>0)
				imgFill.onImgLoaded($img);
			else
				$img.load(function(){ imgFill.onImgLoaded($img); });
		});
	};

})(jQuery);