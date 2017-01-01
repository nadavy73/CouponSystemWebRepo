// Used to created a new filter
// the filter is used for sending filter coupon data to server
app
    .factory('couponFilterFactory', ['couponTypesFactory', function (couponTypesFactory) {
        return function () {
            var couponTypes = angular.copy(couponTypesFactory);
            var couponFilter = {
                price: null,
                date: null,
                dateRadio: "start",
                couponTypes: couponTypes,
                typeOnfocus: "All",
                message: ''
            };
            couponFilter.couponTypes.push("All");
            return couponFilter;
        }
    }]);