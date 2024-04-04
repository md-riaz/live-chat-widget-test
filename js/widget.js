(() => {
    const script = document.currentScript;

    const createWidget = () => {
        const widget = document.createElement("div");
        const iframe = document.createElement("iframe");

        // Widget styles
        widget.style.cssText = `
            display: none;
            box-sizing: border-box;
            width: 400px;
            height: 647px;
            position: fixed;
            bottom: 40px;
            right: 40px;
        `;

        // Iframe styles
        iframe.style.cssText = `
            box-sizing: border-box;
            position: absolute;
            right: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: 0;
            margin: 0;
            padding: 0;
        `;

        widget.appendChild(iframe);
        document.body.appendChild(widget);

        return { widget, iframe };
    };

    const loadWidget = () => {

        const widgetUrl = 'https://embed-chat.netlify.app';

        const { widget, iframe } = createWidget();

        const API = {

            sendMessage: (message) => {
                iframe.contentWindow.postMessage({ sendMessage: message }, widgetUrl);
            },

            show: () => {
                widget.style.display = "block";
            },

            hide: () => {
                widget.style.display = "none";
                onHide();
            },

            toggle: () => {
                const display = window.getComputedStyle(widget, null).display;
                widget.style.display = display === "none" ? "block" : "none";
            },

            onHide: () => {
                // Additional actions to perform when widget is hidden
            },

        };

        const onMessage = (evt) => {
            if (evt.origin !== widgetUrl) {
                return;
            }

            if (evt.data === "hide") {
                hide();
            }
        };

        const onWidgetApiReady = () => {
            
            const event = new CustomEvent('widgetApi', { detail: API });
            window.dispatchEvent(event);
        };


        const greeting = script.getAttribute("data-greeting");

        iframe.addEventListener("load", () => {

            onWidgetApiReady();

            window.addEventListener("message", onMessage);

            iframe.contentWindow.postMessage({ greeting }, widgetUrl);
            widget.style.display = "block";
        });

        iframe.src = widgetUrl + '?license=123';
    };

    if (document.readyState === "complete") {
        loadWidget();
    } else {
        document.addEventListener("readystatechange", () => {
            if (document.readyState === "complete") {
                loadWidget();
            }
        });
    }
})();

function widgetApi() {

    return new Promise((resolve) => {

        const onWidgetApi = (e) => {
            const api = e.detail;
            resolve(api);
        }

        window.addEventListener('widgetApi', onWidgetApi, { once: true });

    });
}

widgetApi().then(api => window.$_IPBX_WIDGET_API = api);