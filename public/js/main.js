require(['jquery', 'lodash', 'json!workouts.json', 'text!templates/exercise.html', 'bootstrap'],
function ($, _, workouts, tmplExercise) {

    'use strict';

    // Use mustache syntax
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    tmplExercise = _.template(tmplExercise);

    var $days = $('#days')
    var $workouts = $('.workouts');
    var $exercises = $('.exercises').empty();
    var weights = JSON.parse(localStorage.getItem('workouts') || '{}');
    var defaultWorkout = JSON.parse(localStorage.getItem('default-workout'));


    // Loop through workouts and display
    _.each(workouts, function (workout, index) {

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


        // Loop through exercises and display
        _.each(workout.workouts, function (exercise) {

            exercise.key = exercise.descr.replace(' ', '-').toLowerCase();
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
                weights[workout.key].workouts[exercise.key] = parseInt(value);
                localStorage.setItem('workouts', JSON.stringify(weights));

                // Reset page
                $previous.text(value);
                $input.val('');

                return false;
            });

            $exercise.appendTo($tabPane);
        });
    });

    // Show/hide exercises based on selected day
    function toggleDays (day) {
        var day = $days.val();

        $('[data-days]').each(function () {
            var $this = $(this);
            var showOrHide = $this.data('days').indexOf(day) > -1;

            $this.toggle(showOrHide);
        });
    }


    $(function () {

        // Default the days select to today
        (function () {
            var days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
            var today = new Date().getDay();

            $days.val(days[today]);
            toggleDays();
        })();

        // Show/hide exercises based on selected day
        $('#days').change(toggleDays);

    });
});