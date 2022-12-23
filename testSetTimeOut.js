"use strict";
exports.__esModule = true;
exports.setDelay = void 0;
var waits = [3000, 1000];
var value = 'hello from Paul';
// tslint:disable-next-line:no-shadowed-variable
var setDelay = function (times, value) {
    if (times.length > 0) {
        // Remove the first time from the array
        var wait_1 = times.shift();
        // tslint:disable-next-line:no-unused-expression
        console.log('Waiting... for ', wait_1);
        // Wait for the given amount of time
        setTimeout(function () {
            console.log('Waited. ', wait_1);
            console.log(value);
            console.log();
            // Call the setDelay function again with the remaining times
            (0, exports.setDelay)(times, value);
        }, wait_1);
    }
};
exports.setDelay = setDelay;
(0, exports.setDelay)(waits, value);
