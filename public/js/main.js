require(['jquery', 'lodash', 'json!workouts.json', 'text!templates/exercise.html'],
function ($, _, workouts, tmplExercise) {

    'use strict';

    // Use mustache syntax
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    tmplExercise = _.template(tmplExercise);

    var $workouts = $('.workouts').empty();
    var storedValues = JSON.parse(localStorage.getItem('workouts') || '{}');

    // Loop through workouts and display
    _.each(workouts, function (workout) {

        _.each(workout.workouts, function (exercise) {

            exercise.key = exercise.descr.replace(' ', '-').toLowerCase();
            exercise.value = storedValues[exercise.key] || 0;

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
                storedValues[exercise.key] = parseInt(value);
                localStorage.setItem('workouts', JSON.stringify(storedValues));

                // Reset page
                $previous.text(value);
                $input.val('');

                return false;
            });

            $workouts.append($exercise);
        });
    });
});