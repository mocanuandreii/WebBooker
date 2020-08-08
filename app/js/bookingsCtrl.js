var eventsApp = angular.module('eventsApp', ['ngStorage']);

eventsApp.controller('bookingsCtrl', function ($scope, $http, $localStorage, $sessionStorage) {
    $http.get('/api/booking/' + $sessionStorage.valueId).then(function (data) {
        $scope.bookings = data.data;
    });
});
