require(['jquery', 'lodash', 'json!configuration.json', 'text!templates/exercise.html', 'bootstrap'],
function ($, _, cfg, tmplExercise) {

    'use strict';

    // Use mustache syntax
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    tmplExercise = _.template(tmplExercise);

    var $days = $('#days')
    var $workouts = $('.workouts');
    var $exercises = $('.exercises').empty();
    var weights = JSON.parse(localStorage.getItem('workouts') || '{}'); // @fix Change how exercises are stored
    var defaultWorkout = JSON.parse(localStorage.getItem('default-workout'));
    var today = new Date().getDay();
        today = cfg.days[today].key;


    // Loop through workouts and display
    _.each(cfg.workouts, function (workout, index) {

        // Set key and default storage object, if it's empty
        workout.key = workout.descr.replace(' ', '-').toLowerCase();

        if (typeof weights[workout.key] === 'undefined') {
            weights[workout.key] = {
                default  : false,
                workouts : {},
            };
        }


        // Build tab list
        var $tabWrapper = $('<li/>')
            .appendTo($workouts);
        var $tab = $('<a/>')
            .attr({
                'href'        : '#'+workout.key,
                'role'        : 'tab',
                'data-toggle' : 'tab',
            })
            .text(workout.descr)
            .appendTo($tabWrapper)

            // Set new default tab
            .on('shown.bs.tab', function () {
                localStorage.setItem('default-workout', JSON.stringify(workout.key));
            });


        // Build tab pane
        var $tabPane = $('<div/>', {class : 'tab-pane'})
            .attr('id', workout.key)
            .appendTo($exercises);


        // Set default tab/pane
        if (workout.key === defaultWorkout || (!defaultWorkout && index === 0)) {
            $tabWrapper.addClass('active');
            $tabPane.addClass('active');
        }


        // Build list of days
        var $days = $('<select/>', {class : 'days'})
            .appendTo($tabPane);

        var todayExists = false;
        _.each(workout.days, function (key) {
            var day = _.find(cfg.days, {key : key});

            var $day = $('<option/>')
                .attr('value', day.key)
                .text(day.descr)
                .appendTo($days);

            if (key === today) {
                todayExists = true;
            }
        });

        // Default to today (if it's one of the options)
        if (todayExists) {
            $days.val(today);
        }

        // Filter exercises by the day
        $days.on('change', function () {
            var day = $(this).val();

            $('.workout').trigger('filter', [workout.key, day]);
        });


        // Loop through exercises and display
        _.each(workout.workouts, function (exercise) {

            exercise = _.extend({}, exercise, cfg.exercises[exercise.key]);
            exercise.value = weights[workout.key].workouts[exercise.key] || 0;

            var html = tmplExercise(exercise);
            var $exercise = $(html);

            // Save weight
            $exercise.on('submit', function (e) {

                e.preventDefault();

                var $this = $(this);
                var $input = $this.find('input');
                var value = $input.val();
                var $previous = $this.find('.prev-value');

                // Store values
                // @fix Change how exercises are stored
                weights[workout.key].workouts[exercise.key] = parseInt(value);
                localStorage.setItem('workouts', JSON.stringify(weights));

                // Reset page
                $previous.text(value);
                $input.val('');

                return false;
            });

            // Show or hide
            $exercise.on('filter', function (e, workoutKey, dayKey) {
                if (workoutKey === workout.key) {
                    var filter = (exercise.days.indexOf(dayKey) > -1);

                    $(this).toggle(filter);
                }
            });

            $exercise.appendTo($tabPane);
        });

        // Default exercises to today (if it's one of the options)
        if (todayExists) {
            $('.workout').trigger('filter', [workout.key, today]);
        }
    });
});