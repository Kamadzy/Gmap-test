app.controller('MapCtrl', ['NgMap','$scope', function (NgMap, $scope) {
    var vm = this;
    vm.placeChanged = function () {
        vm.place = this.getPlace();
        $scope.places.push({
            text: vm.place.formatted_address,
            loc: vm.place.geometry.location
        });
        localStorage.setItem('places', JSON.stringify($scope.places));
        vm.map.setCenter(vm.place.geometry.location);
    };

    $scope.changePlace = function (city) {
        vm.map.setCenter(city.loc);
    };

    NgMap.getMap().then(function (map) {
        vm.map = map;
    });

    $scope.saved = localStorage.getItem('places');
    $scope.places = (localStorage.getItem('places') !== null) ? JSON.parse($scope.saved) : [];
    localStorage.setItem('places', JSON.stringify($scope.places));
    $scope.remove = function (place) {
        var index = $scope.places.indexOf(place);
        $scope.places.splice(index, 1);
        localStorage.setItem('places', JSON.stringify($scope.places));
    };
}]);