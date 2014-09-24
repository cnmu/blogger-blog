//<![CDATA[
$(document)['ready'](function () {
        $('#cnmubc')['html']('<a href="http://cnmu.blogspot.com" rel="dofollow" target="_blank">( كن مدون ) </a>');
        setInterval(function () {
                if (!$('#cnmubc:visible')['length']) {
                  window['location']['href'] = 'http://cnmu.blogspot.com';
                };
            }, 3000);
    });

//]]