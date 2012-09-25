# Img Fill jQuery Plugin (Version 1.0)

This very simple plugin allows you to fill a html element with 1 or more image(s).

Here is a very simple [demo](http://lab.stephaneguigne.com/js/jquery-imgfill/)

## Examples

Here is a basic exemple

    // minimum
    $('.my_elements').imgfill();

Here is a full options exemple

    // full options
    $('.my_elements').imgfill(
    {   
        align       : 'center',     // Set the alignment (center, topleft, top, topright, right, bottomright, bottom, bottomleft, left) case insensitive and shortcut allowed (c, tl, t, tr, r, br, b, bl, l)
        container   : null,         // Define the container class name
        $container  : $(window)     // if you prefer, define directly the container DOM element (It will override "container" option)
    });


## Cross-browser Compatibility

Chrome/Firefox/Safari and IE6+


## License

Feel free to use it, just leave my copyright.

Copyright (c) 2011 [Stéphane Guigné](http://stephaneguigne.com)