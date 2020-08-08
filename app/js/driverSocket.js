mainApp.factory('driverSocket', function ($document, $q, $timeout) {

    var serverAddress = 'https://notify.insoftd.com:9910';
    var companyID = '248';
    var start = function () {

        injectScript(serverAddress + '/socket.io/socket.io.js').then(function () {
            setTimeout(function () {
                socket = io.connect(serverAddress + '?companyId=' + companyID);
                if (!socket.id) {
                    socket = io.connect(serverAddress + '?companyId=' + companyID);
                } else {
                    // loadDefaultListeners();
                }
                socket.on('monitoring', function (msg) {
                    for (var i in msg.params.DriverToCar) {
                        addMarker(msg.params.DriverToCar[i].lat, msg.params.DriverToCar[i].lng, msg.params.DriverToCar[i].id_driver_to_car, 'red');
                    }
                });

                socket.on('dap', function (msg) {
                    for (var i in markers) {
                        if (markers[i].title == msg.params.Booking[2]) {
                            addMarker(markers[i].position.lat(), markers[i].position.lng(), markers[i].title, "yellow");
                            markers.splice(i, 1);
                        }
                    }
                });

                socket.on('pob', function (msg) {
                    for (var i in markers) {
                        if (markers[i].title == msg.params.Booking[2]) {
                            addMarker(markers[i].position.lat(), markers[i].position.lng(), markers[i].title, "purple");
                            markers.splice(i, 1);
                        }
                    }
                });

                socket.on('dow', function (msg) {
                    for (var i in markers) {
                        if (markers[i].title == msg.params.Booking[2]) {
                            addMarker(markers[i].position.lat(), markers[i].position.lng(), markers[i].title, "orange");
                            markers.splice(i, 1);
                        }
                    }
                    console.log(msg);
                });

                socket.on('done', function (msg) {
                    for (var i in markers) {
                        if (markers[i].title == msg.params.Booking[2]) {
                            addMarker(markers[i].position.lat(), markers[i].position.lng(), markers[i].title, "green");
                            markers.splice(i, 1);
                        }
                    }

                });
            }, 0);
        }).catch(function () {
            FloatMessage.toConsole('Error on socket.io script injection');
        });
    }

    var injectScript = function (src) {
        var deferred = $q.defer();
        var script = $document[0].createElement('script');
        script.onload = script.onreadystatechange = function (e) {
            $timeout(function () {
                deferred.resolve(e);
            });
        };
        script.onerror = function (e) {
            $timeout(function () {
                deferred.reject(e);
            });
        };
        script.src = src;
        $document[0].head.appendChild(script);
        return deferred.promise;
    };
    return {
        start: start
    };
})


