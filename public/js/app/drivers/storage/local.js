define(function () {

    'use strict';

    var Storage = {
        getItem: function (key) {

            var value = localStorage.getItem(key) || '';

            return JSON.parse(value);
        },
        setItem: function (key, value) {

            value = JSON.stringify(value);

            return localStorage.setItem(key, value);
        }
    };

    return Storage;
});