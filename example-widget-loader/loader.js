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
        const { widget, iframe } = createWidget();

        const sendMessage = (message) => {
            iframe.contentWindow.postMessage({ sendMessage: message }, "http://localhost:3000");
        };

        const show = () => {
            widget.style.display = "block";
        };

        const hide = () => {
            widget.style.display = "none";
            onHide();
        };

        const toggle = () => {
            const display = window.getComputedStyle(widget, null).display;
            widget.style.display = display === "none" ? "block" : "none";
        };

        const onHide = () => {
            // Additional actions to perform when widget is hidden
        };

        const onMessage = (evt) => {
            if (evt.origin !== "http://localhost:3000") {
                return;
            }

            if (evt.data === "hide") {
                hide();
            }
        };

        const onWidgetApiReady = () => {
            const api = {
                sendMessage,
                show,
                hide,
                toggle,
                onHide
            };
            const event = new CustomEvent('widgetApi', { detail: api });
            window.dispatchEvent(event);
        };


        const greeting = script.getAttribute("data-greeting");
        const license = script.getAttribute("data-license");
        const widgetUrl = `http://localhost:3000?license=${license}`;

        iframe.addEventListener("load", () => {
            
            onWidgetApiReady();

            window.addEventListener("message", onMessage);

            iframe.contentWindow.postMessage({ greeting }, "http://localhost:3000");
            widget.style.display = "block";
        });

        iframe.src = widgetUrl;
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
