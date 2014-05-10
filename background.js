chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('index.html', {
        'bounds': {
            "width": 500,
            "height": 500

        },
        minWidth: 300,
        minHeight: 200,
        maxWidth: 700,
        maxHeight: 900,
    });
});