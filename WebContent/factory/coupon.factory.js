// Used to created a new empty coupon object
company
    .factory('couponFactory', function () {
        return function () {
            return {
                id: null,
                title: '',
                startDate: '',
                endDate: '',
                amount: '',
                type: '',
                message: '',
                price: '',
                image: ''
            }
        }
    });
