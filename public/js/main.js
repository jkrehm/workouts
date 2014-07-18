require(['app/storageDriver', 'app/display'],
function (Storage, displayWorkouts) {

    'use strict';

    var storage = new Storage('workouts', displayWorkouts);
});