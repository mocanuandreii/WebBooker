var eventsApp = angular.module('eventsApp', ['ngStorage']);

eventsApp.controller('eventsCtrl', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
    $scope.autocompletePickUp = {};
    $scope.email = {};
    $scope.phonenumber = {
        pattern: /^\+?\d{10}$/
    }

    $scope.logIn = function () {
        $http({
            method: 'GET',
            url: '/api/userEmail/' + $scope.email.text
        }).then(function successCallback(response) {
            if (angular.isUndefined(response.data[0])) {
                alert("Email-ul nu este in baza de date");
            } else {
                if (response.data[0].password === $scope.password.text) {
                    $sessionStorage.valueEmail = $scope.email.text;
                    $sessionStorage.valueId = response.data[0].id_user;
                    $sessionStorage.name = response.data[0].name;
                    $sessionStorage.phone_number = response.data[0].phone_number;
                    window.location.assign("http://localhost:8000/Main.html");
                } else {
                    alert("Parola Gresita!");
                }
            }
        }, function errorCallback(response) {
            console.log("error");
        });
    }

    $scope.initMyProfile = function () {

        var user_id = $sessionStorage.valueId;

        $http({
            method: 'GET',
            url: '/api/user/' + user_id
        }).then(function successCallback(response) {

            $scope.name = response.data[0].name;
            $scope.adress = response.data[0].adress;
            $scope.emailP = response.data[0].email;
            $scope.phoneNumber = response.data[0].phone_number;

        }, function errorCallback(response) {
            console.log("error");
        });
    }

    $scope.updateDetails = function () {

        var email = $sessionStorage.valueToShare;
        var user_id = $sessionStorage.valueId;

        $http({
            method: 'PUT',
            url: '/api/user/' + user_id,
            data: {
                'adress': $scope.adress,
                'phoneNumber': $scope.phoneNumber,
                'name': $scope.name,
                'email': $scope.emailP
            }
        }).then(function successCallback(response) {
            $sessionStorage.valueToShare = $scope.emailP;
            console.log($sessionStorage.valueToShare);
            email = $sessionStorage.valueToShare;

            $scope.initMyProfile();


        }, function errorCallback(response) {
            console.log("error");
        });
    }


    $scope.createBooking = function () {

        var user_id = $sessionStorage.valueId;
        console.log(autocompletePickUpName);
        console.log(autocompleteDestinationName);
        console.log(user_id);
        console.log(total);
        console.log(duration.text);
        console.log($scope.selectCard);

        $http({
            method: 'POST',
            url: '/api/booking/create',
            data: {
                'id_user': user_id,
                'from_adress': autocompletePickUpName,
                'to_adress': autocompleteDestinationName,
                'distance': total,
                'price': total,
                'duration': 123,
                'payment_method': $scope.selectCard,
                'status': 'in progress'
            }
        }).then(function successCallback(response) {


        }, function errorCallback(response) {
            console.log("error");
        });
    }

}]);

