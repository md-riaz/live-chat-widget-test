<?php

// Get the requested path from the server
$requestPath = $_SERVER['REQUEST_URI'];

// Remove any query string parameters from the request path
$requestPath = strtok($requestPath, '?');

// Remove leading and trailing slashes and explode the path into segments
$routeSegments = explode('/', trim($requestPath, '/'));


$accountKey = $routeSegments[0] ?? '';
$widgetId = $routeSegments[1] ?? '';

// Check if the account key and widget ID are valid
if (!preg_match('/^[a-z0-9]{24}$/', $accountKey) || !preg_match('/^[a-z0-9]{9}$/', $widgetId)) {
    // Invalid account key or widget ID
    http_response_code(404);
    exit;
}

$URL = 'https://live-chat.app';

header('Content-Type: application/javascript');

?>
(function(global) {
    global.$_IPBX_AccountKey = '<?= $accountKey ?>';
    global.$_IPBX_WidgetId = '<?= $widgetId ?>';
    global.$_IPBX_Unstable = false;
    global.$_IPBX = global.$_IPBX || {};

    (function(w) {

        function loadWidget() {
            if (window.$_IPBX.init !== undefined) {
                return;
            }

            window.$_IPBX.init = true;

            var files = [
                '<?= $URL ?>/js/widget.js',
            ];

            if (!window.crypto) {
                window.crypto = window.msCrypto;
            }

            var s0 = document.getElementsByTagName('script')[0];

            for (var i = 0; i < files.length; i++) {
                var s1 = document.createElement('script');
                s1.src = files[i];
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin', '*');
                s0.parentNode.insertBefore(s1, s0);
            }
        }

        // Check if the document is ready before loading the widget
        if (document.readyState === 'complete') {
            loadWidget();
        } else {
            w.addEventListener('load', loadWidget, false);
        }


    })(window);

})(window);
