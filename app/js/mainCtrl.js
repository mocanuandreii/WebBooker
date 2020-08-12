var mainApp = angular.module('mainApp', ['ngStorage'])

    mainApp.controller('mainCtrl' , function ($scope, $http, $sessionStorage) {
    $scope.carTypes = {
    }
    $scope.updateCarTypeSelect = function () {
        $http({
            method: 'GET',
            url: 'https://api-test.insoftd.com/v1/operator/car_type?q=[{%22key%22:%22CarType.enabled%22,%22value%22:1,%22op%22:%22=%22}]&order=(CarType.rank%20DESC)',
            headers: {
                'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='
            }
        }).then(function (data) {

            $scope.carTypes = data.data.records;

        });
    }
    $scope.calculate = function () {
        $http({
            method: 'POST',
            url: 'https://api-test.insoftd.com/v1/operator/hubble',
            headers: {
                'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='
            },
            data: {
                'name': 'direction',
                "startPoint":{
                    "lat": latPickUp,
                    "lng": lngPickUp,
                    "address": autocompletePickUpName
                },
                "endPoint":{
                    "lat": latDestination,
                    "lng": lngDestination,
                    "address": autocompleteDestinationName

                },
                "wayPoints":[
                ],
                "app":"backoffice"
            }

        }).then(function (data) {
            $scope.route = data.data.records;

            for (var i in $scope.route) {
                $scope.distanceH = "Distance: " + $scope.route[i].details.distance/1000 + " km.";
                $scope.durationH = "Duration: " + $scope.route[i].details.duration / 60 + " minutes.";

                $sessionStorage.distance = $scope.route[i].details.distance;
                $sessionStorage.duration = $scope.route[i].details.duration;
            }

            $http({
                method: 'POST',
                url: 'https://api-test.insoftd.com/v1/operator/price',
                headers: {
                    'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='
                },
                data: {
                    "price_for_all_with_details": 1,
                    "priceList": [
                        {
                            "BookingCharge": {
                                "cash": 0,
                                "credit": 0,
                                "driver_tip": 0
                            },
                            "RouteInfo": {
                                "legs": [
                                    9399
                                ],
                                "duration": $sessionStorage.duration,
                                "distance": $sessionStorage.distance,
                                "points_list": [
                                    {
                                        "type": "p",
                                        "address": autocompletePickUpName,
                                        "lat": latPickUp,
                                        "lng": lngPickUp
                                    },
                                    {
                                        "type": "d",
                                        "address": autocompleteDestinationName,
                                        "lat": latDestination,
                                        "lng": lngDestination
                                    }
                                ]
                            },
                            "Booking": {
                                "id_car_type": 1,
                                "infant_seats_number": 0,
                                "child_seats_number": 0,
                                "booster_seats_number": 0,
                                "id_client": null,
                                "pickup_time": "2021-02-23 02:10:00",
                                "passengers_number": 1,
                                "payment_method": "cash",
                                "waiting_time": 0,
                                "voucher_code": null
                            }
                        }
                    ]
                }

            }).then(function (data) {

                $scope.priceH = "Price: " + data.data.records.total_price/100 + " $.";
                $sessionStorage.price = data.data.records.total_price;

            });
        });
    }

    $scope.insertBooking = function () {
        $http({
            method: 'POST',
            url: 'https://api-test.insoftd.com/v1/operator/booking',
            headers: {
                'Authorization': 'Basic aW50ZXJuc2hpcEBpbnNvZnRkZXYuY29tOmJhY2tvZmZpY2VAfEAyNDg='
            },
            data: {
                "BookingList": [{
                    "Booking": {
                        "id_car_type": $scope.cars,
                        "id_client": $sessionStorage.valueId,
                        "order_number": "",
                        "id_driver_to_car": null,
                        "passenger_name": $sessionStorage.name,
                        "passenger_email": $sessionStorage.valueEmail,
                        "passenger_mobile": $sessionStorage.phone_number,
                        "payment_method": $scope.selectCard,
                        "status": "Unallocated",
                        "source": "backoffice",
                        "infant_seats_number": 0,
                        "child_seats_number": 0,
                        "booster_seats_number": 0,
                        "passengers_number": $scope.passengerNumber,
                        "pickup_address": autocompletePickUpName,
                        "dropoff_address": autocompleteDestinationName,
                        "pickup_time": "2016-7-14 15:14:0",
                        "pickup_lat": latPickUp,
                        "pickup_lng": lngPickUp,
                        "dropoff_lat": latDestination,
                        "dropoff_lng": lngDestination,
                        "duration": $sessionStorage.duration,
                        "journey_distance": $sessionStorage.distance,
                        "waiting_time": 0,
                        "journey_type": "asap",
                        "booking_type": 1,
                        "cancel_reason": null,
                        "id_pickup_zone": "791",
                        "id_dropoff_zone": "791",
                        "pickup_details": "",
                        "dropoff_details": ""
                    },
                    "BookingCharge": {
                        "extra_card_payment": 0,
                        "base_journey_charge": 17.01,
                        "driver_base_journey_charge": 0,
                        "extra_baby_seat": 0,
                        "extra_stow": 5,
                        "duration_charge": 0,
                        "extra_waiting_time": 0,
                        "extra_car_type": 0,
                        "exception": 0,
                        "time_frame": 17.01,
                        "cash": $sessionStorage.price,
                        "credit": 0,
                        "commission": 0,
                        "discount": 0,
                        "driver_tip": 0,
                        "total_journey": $sessionStorage.price,
                        "driver_total_journey": 0,
                        "zone_extra_charge": 0,
                        "voucher_discount": 0,
                        "administration_fee": 5,
                        "vat": 22.01,
                        "driver_charges_1": 0,
                        "driver_charges_2": 0,
                        "driver_earnings": 0,
                        "override_driver_earnings": 0,
                        "company_earnings": 0,
                        "pay_to_driver": 0,
                        "pay_to_company": 0,
                        "company_report_income": 0,
                        "company_report_income_vat": 0,
                        "company_report_vat": 0,
                        "percent_driver_total": 0
                    },
                    "Payment": {
                        "payment_method": $scope.selectCard,
                        "payment_status": "Pending"
                    }
                }]
            }

        }).then(function (data) {

            alert(data.data.records[0].result);
        });
    }
});

mainApp.service('driverService', ['driverSocket', function (driverSocket) {

    var start = function() {
        driverSocket.start();
    }
    return {
        start: start
    }

}]);

mainApp.controller('driverCtrl', ['$scope', 'driverService', function ($scope, driverService) {

    driverService.start();

}]);
