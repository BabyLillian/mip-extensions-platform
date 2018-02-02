/**
 * @file ZOL私有业务--收藏
 * @author  mulianju
 * @time  2017-12-03 20:42:29
 * @version 1.0.0
 */
define(function (require, exports, module) {
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var customElement = require('customElement').create();
    var mipToast = require('./mip-zol-toast');
    var toast = function (msg, t) {
        mipToast('<div class="mip-zol-toast-container">' + msg + '</div>', t);
    };

    function addfavor(options, callback) {
        var url = options.favorUrl;
        var data = options.data || {};
        typeof ZOL_USER_INFO !== 'undefined' && (data.userId = window.ZOL_USER_INFO.userid);
        if (!window.ZOL_USER_INFO.checkLogState()) {
            return;
        }

        if (addfavor.posting) {
            toast('\u60a8\u7684\u624b\u901f\u592a\u5feb\uff0c\u4f11\u606f\u4e00\u4e0b\u518d\u8bd5\u5427~');
            return;
        }
        addfavor.posting = true;

        data[options.favorFlag] = typeof options.actions === 'string'
            ? JSON.parse(options.actions)[options.favorAction]
            : !options.favorAction;

        fetchJsonp(makeUrl(url, data), {}).then(function (res) {
            return res.json();
        }).then(function (request) {
            addfavor.posting = false;
            callback && callback(request);
        });
    }

    function makeUrl(url, data) {
        var str = url.indexOf('?') > 0 ? '&' : '?';

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (str.length > 1) {
                    str += '&';
                }
                str += key + '=' + data[key];
            }
        }

        return url + str;
    }
    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        var element = this.element;
        var dataset = element.dataset;
        var options = util.fn.extend({}, element.dataset);
        if (!options.favoredClass) {
            options.favoredClass = 'favorited';
        }
        var customData;
        try {
            var script = document.querySelector('[data-name="favor-config"]');
            if (script) {
                customData = JSON.parse(script.textContent);
            }
        }
        catch (e) {
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
        }
        for (var key in dataset) {
            if (dataset.hasOwnProperty(key)) {
                if (/^data([A-Z][\w]+)/.test(key)) {
                    var pkey = key;
                    pkey = pkey.replace(/^data[A-Z]/, pkey.slice(4, 5).toLowerCase());
                    if (customData || (customData = {})) {
                        customData[pkey] = dataset[key];
                    }
                }
            }
        }
        customData && (options.data = customData);

        element.addEventListener('click', function () {
            options.favorAction = Number(element.classList.contains(options.favoredClass));
            addfavor(options, function (request) {
                if (parseInt(request.state, 10) === 1) {
                    element.classList.toggle(options.favoredClass);
                } else {
                    request.msg && toast(request.msg);
                }
            });
        });

        var data = typeof options.data === 'string' ? JSON.parse(options.data) : {};

        fetchJsonp(makeUrl(options.checkUrl, data), {}).then(function (res) {
            return res.json();
        }).then(function (request) {
            if (parseInt(request.state, 10) === 1) {
                element.classList.add(options.favoredClass);
            } else {
                element.classList.remove(options.favoredClass);
            }
        });
    };
    return customElement;
});
