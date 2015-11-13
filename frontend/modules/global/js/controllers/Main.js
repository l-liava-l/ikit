(function() {
    'use strict';

    angular.module('global')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'core'];

    function MainCtrl($scope, core) {
        var vm = this;

        vm.coursesList = core.getCoursesList();
    }
})();
