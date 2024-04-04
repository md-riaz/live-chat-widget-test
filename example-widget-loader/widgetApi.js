function widgetApi(interval = 1000) {

    return new Promise((resolve) => {

        const onWidgetApi = (e) => {
            const api = e.detail;
            resolve(api);
        }

        window.addEventListener('widgetApi', onWidgetApi, { once: true });

    });
}