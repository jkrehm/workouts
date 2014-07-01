require(['jquery', 'lodash', 'json!workouts.json', 'text!templates/workout.html'],
function ($, _, workouts, tmplWorkout) {

    'use strict';

    // Use mustache syntax
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    tmplWorkout = _.template(tmplWorkout);

    function setValue ($inputGroup) {

        var $input = $inputGroup.find('input');
        var value = $input.val();
        var $previous = $inputGroup.find('.prev-value');

        localStorage.setItem($input.attr('name'), value);
        $previous.text(value);
        $input.val('');
    }

    var $workouts = $('.workouts');

    _.each(workouts, function (workout) {

        workout.key = workout.descr.replace(' ', '-').toLowerCase();
        workout.value = localStorage.getItem(workout.key) || 0;

        var html = tmplWorkout(workout);
        var $workout = $(html);

        // Save weight on button click or enter pressed
        $workout
            .find('button')
            .on('click', function () {
                setValue($(this).closest('.input-group'));
            });

        $workout
            .find('input')
            .on('keypress', function (e) {
                if (e.keyCode === 13) {
                    setValue($(this).closest('.input-group'));
                }
            });

        $workouts.append($workout);
    });
});