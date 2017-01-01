// Used to created a new empty customer object
angular.module("couponApp")
    .factory('customerFactory', function () {
        return function() {
            return {
                id: null,
                name: '',
                password: ''
            }
        }
    });
