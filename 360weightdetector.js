var chrome_weight = {
    "result": "Chrome",
    "details": {
        "Chrome": 5,
        "Chromium": 0,
        "_360SE": 0,
        "_360EE": 0,
    },
    "sorted": ["Chrome", "360SE", "360EE", "Chromium"],
    "exec": function (results) {
        var details = {
            "Chrome": 5,
            "Chromium": 0,
            "_360SE": 0,
            "_360EE": 0,
        }
        var _ua = window.navigator.userAgent;
        if ((/Chrome\/([\d.])+\sSafari\/([\d.])+$/).test(_ua)) {
            if (window.navigator.platform == "Win32") {
                if (!window.clientInformation.languages) {
                    details._360SE += 8;
                }
                if ((/zh/i).test(navigator.language)) {
                    details._360SE += 3;
                    details._360EE += 3;
                }
                if (window.clientInformation.languages) {
                    var lang_len = window.clientInformation.languages.length;
                    if (lang_len >= 3) {
                        details.Chrome += 10;
                        details.Chromium += 6;
                    } else if (lang_len == 2) {
                        details.Chrome += 3;
                        details.Chromium += 6;
                        details._360EE += 6;
                    } else if (lang_len == 1) {
                        details.Chrome += 4;
                        details.Chromium += 4;
                    }
                }
                for (var i in window.navigator.plugins) {
                    if (window.navigator.plugins[i].filename == "np-mswmp.dll") {
                        details._360SE += 20;
                        details._360EE += 20;
                    }
                }
                if (Object.keys(window.chrome.webstore).length <= 1) {
                    details._360SE += 7;
                } else if (Object.keys(window.chrome.webstore).length == 2) {
                    details._360SE += 4;
                    details.Chromium += 3;
                }

                if (window.navigator.plugins.length >= 30) {
                    details._360EE += 7;
                    details._360SE += 7;
                    details.Chrome += 7;
                } else if (window.navigator.plugins.length < 30 && window.navigator.plugins.length > 10) {
                    details._360EE += 3;
                    details._360SE += 3;
                    details.Chrome += 3;
                } else if (window.navigator.plugins.length <= 10) {
                    details.Chromium += 6;
                }

            } else {
                details._360SE -= 50;
                details._360EE -= 50;
                if ((/Linux/i).test(window.navigator.userAgent)) {
                    details.Chromium += 5;
                }

            }
            var found = 0;
            for (var i in window.navigator.plugins) {
                if (!!(respdf = (/^(.+) PDF Viewer$/).exec(window.navigator.plugins[i].name))) {
                    //console.log(respdf[1]);
                    if (respdf[1] == "Chrome") {
                        details.Chrome += 6;
                        details._360SE += 6;
                        found = 1;
                        break;
                    }
                    if (respdf[1] == "Chromium") {
                        details.Chromium += 10;
                        details._360EE += 6;
                        found = 1;
                        break;
                    }
                }
            }
            if (!found) {
                details.Chromium += 9;
            }

        }
        var chrome_result = new Object;
        chrome_result['Chrome'] = details.Chrome;
        chrome_result['Chromium'] = details.Chromium;
        chrome_result['360SE'] = details._360SE;
        chrome_result['360EE'] = details._360EE;
        var sortable = [];
        for (var value in chrome_result)
            sortable.push([value, chrome_result[value]])
        sortable.sort(function (a, b) {
            return b[1] - a[1]
        });
        this.sorted = sortable;
        this.details = details;
        this.result = sortable[0][0];
        /*console.log("Chrome Weight "+details.Chrome);
				console.log("Chromium Weight "+details.Chromium);
				console.log("360SE Weight "+details._360SE);	
				console.log("360EE Weight "+details._360EE);*/
        if (results == "result") {
            return sortable[0][0];
        } else if (results == "details") {
            return chrome_result;
        } else if (results == "sorted") {
            return sortable;
        }
    }

}
chrome_weight.exec();