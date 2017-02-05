

customer.controller("testCtrl", ['$rootScope', '$scope', '$state', '$location', 'Flash',
	function ($rootScope, $scope, $state, $location, Flash) {


    $scope.couponTypes = [
        {
            image: "camping",
            title: "Camping"
        },
        {
            image: "clothes",
            title: "Clothes"
        },
        {
            image: "electronics",
            title: "Electronics"
        },
        {
            image: "food",
            title: "Food"
        },
        {
            image: "health",
            title: "Health"
        },
        {
            image: "restaurants",
            title: "Restaurants"
        },
        {
            image: "sport",
            title: "Sport"
        },
        {
            image: "travelling",
            title: "Travelling"
        }
    ];


    console.log("coming to Portfolio controller");


}]);

