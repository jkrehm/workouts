require.config({
    waitSeconds: 10,
    paths: {
        'bootstrap' : [
            '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
            '../vendor/bootstrap/dist/bootstrap.min',
            '../vendor/bootstrap/dist/bootstrap',
        ],
        'jquery' : [
            '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
            '../vendor/jquery/dist/jquery.min',
            '../vendor/jquery/dist/jquery',
        ],
        'json' : [
            '../vendor/requirejs-plugins/src/json.min',
            '../vendor/requirejs-plugins/src/json',
        ],
        'lodash' : [
            '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
            '../vendor/lodash/dist/lodash.min',
            '../vendor/lodash/dist/lodash',
        ],
        'text' : [
            '../vendor/requirejs-plugins/lib/text.min',
            '../vendor/requirejs-plugins/lib/text',
        ],
    },
    shim: {
        'bootstrap' : {
            deps : ['jquery'],
        },
    },
});

require(['main']);