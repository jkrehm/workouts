require.config({
    waitSeconds: 10,
    paths: {
        'bootstrap' : [
            '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',
            '../vendor/bootstrap/dist/bootstrap.min',
            '../vendor/bootstrap/dist/bootstrap',
        ],
        'bootstrap-select' : [
            '//cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.5.4/bootstrap-select.min',
            '../vendor/bootstrap-select/bootstrap-select.min',
            '../vendor/bootstrap-select/bootstrap-select',
        ],
        'detectmobilebrowser' : [
            '../vendor/detectmobilebrowser/detectmobilebrowser',
        ],
        'dropbox' : [
            'https://www.dropbox.com/static/api/dropbox-datastores-1.1-latest',
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
        'bootstrap-select' : {
            deps : ['jquery', 'bootstrap'],
        },
        'detectmobilebrowser' : {
            deps : ['jquery'],
        },
    },
});

require(['main']);