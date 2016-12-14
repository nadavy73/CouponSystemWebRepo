admin.controller('companyCtrl', function ($scope, $http, $rootScope, $location, $document,
			couponUtil, loginProxy, companyProxy, customerProxy,
			companyFactory, customerFactory) {

    // Companies model array
    $scope.companies = [];
    // customer model array
    $scope.customers = [];
    // coupon image size
    $scope.couponPicSize = {width: "200px", height: "75px"};
    // Search text
    $scope.searchText = '';
    // client Type
    $scope.clientType = $rootScope.clientType;
    // sidebar navigation click model
    $scope.sideBarRadioClickModel = "views/adminCompany.view.html";

    // Clear Search Text
    $scope.ClearSearchText = function () {
        $scope.searchText = '';
    };

    // Validation method //
    // Validation method are called before sending data to the server
    // and stop the request if detecting illegal values

    // password Validation
    $scope.onberofesavePASSWORD = function (data) {
        return couponUtil.passwordValidation(data);
    };
    // customer name Validation
    $scope.onberofesaveCompanyName = function (name) {
        return couponUtil.nameValidation(name);
    };
    // company name Validation
    $scope.onberofesaveCustomerName = function (data) {
        var names = [];
        for (var i = 0; i < $scope.customers.length; i++) {
            names.push($scope.customers[i].name);
        }
        return couponUtil.nameValidation(data, names);
    };


    /////////////
    // COMPANY //
    /////////////
    // Get all companies
    $scope.getAllCompanies = function () {
        companyProxy.getAll()
            .then(
                function successCallback(response) {
                    $scope.companies = response.data;
                },
                function errorCallback(response) {
                    couponUtil.handleBadResponse('ERROR:', response);
                });
    };
    $scope.getAllCompanies (); // loading companies on page startup
    // Remove company
    $scope.removeCompany = function (index) {
        alert("B4 if null");
        if ($scope.companies[index].id != null) {
            alert("NOT null");
            companyProxy.remove($scope.companies[index].id)
                .then(
                    function successCallback(response) {
                        console.log('DELETED:');
                        console.log(response.data);
                        // Delete comapny from model
                        $scope.companies.splice(index, 1);
                    },
                    function errorCallback(response) {
                        couponUtil.handleBadResponse('ERROR:', response);
                    });
        } else {
            $scope.companies.splice(index, 1);
        }
    };
    // Add/Update company (presest)
    $scope.addUpdateCompany = function (data, index) {
        if ($scope.companies[index].id == null) {
            // Add new company to db
            companyProxy.create(data)
                .then(
                    function successCallback(response) {
                        couponUtil.handleBadResponse('New company added to DB:', response);
                        // update model
                        $scope.companies[index] = response.data;
                    },
                    function errorCallback(response) {
                        couponUtil.handleBadResponse('ERROR:', response);
                        $scope.companies.splice(index, 1);
                    });
        } else {
            // Update company in DB
            companyProxy.update($scope.companies[index].id, data).then(
                function successCallback(response) {
                    couponUtil.handleBadResponse('Company updated', response);
                    // update model
                    $scope.companies[index] = response.data;
                },
                function errorCallback(response) {
                    couponUtil.handleBadResponse('ERROR:', response);
                });
        }
    };
    // Get all company coupons
    $scope.getCompanyCoupons = function (id, index) {
        companyProxy.getCoupons(id)
            .then(
                function successCallback(response) {
                    $scope.companies[index].coupons = response.data;
                    $scope.focusOn = $scope.companies[index];
                    $scope.sideBarRadioClickModel = "views/coupons.view.html"
                },
                function errorCallback(response) {
                    couponUtil.handleBadResponse('ERROR:', response);
                });
    };
    // Add ROW for new company
    $scope.addRowForCompany = function () {
        $scope.companies.push(companyFactory());
    };


    //////////////
    // CUSTOMER //
    //////////////
    // Get all customers
    $scope.getAllCustomers = function () {
        customerProxy.getAll()
            .then(
                function successCallback(response) {
                    $scope.customers = response.data;
                },
                function errorCallback(response) {
                    couponUtil.handleBadResponse('ERROR:', response);
                });
    };
    // Remove customer
    $scope.removeCustomer = function (index) {
        if ($scope.customers[index].id != null) {
            customerProxy.remove($scope.customers[index].id)
                .then(
                    function successCallback(response) {
                        console.log('DELETED:');
                        console.log(response.data);
                        // Delete comapny from model
                        $scope.customers.splice(index, 1);
                    },
                    function errorCallback(response) {
                        couponUtil.handleBadResponse('ERROR:', response);
                    });
        } else {
            $scope.customers.splice(index, 1);
        }
    };
    // Add/Update customer (presest)
    $scope.addUpdateCustomer = function (data, index) {
        if ($scope.customers[index].id == null) {
            // Add new company to db
            customerProxy.create(data).then(
                function successCallback(response) {
                    couponUtil.handleBadResponse('New company added to DB:', response);
                    // update model
                    $scope.customers[index] = response.data;
                },
                function errorCallback(response) {
                    couponUtil.handleBadResponse('ERROR:', response);
                    $scope.companies.splice(index, 1);
                });
        } else {
            // Update customer in DB
            customerProxy.update($scope.customers[index].id, data).then(
                function successCallback(response) {
                    couponUtil.handleBadResponse('Company updated', response);
                    // update model
                    $scope.customers[index] = response.data;
                },
                function errorCallback(response) {
                    couponUtil.handleBadResponse('ERROR:', response);
                });
        }
    };
    // Get all customer coupons
    $scope.getCustomerCoupons = function (id, index) {
        customerProxy.getCoupons(id)
            .then(
                function successCallback(response) {
                    $scope.customers[index].coupons = response.data;
                    $scope.focusOn = $scope.customers[index];
                    $scope.sideBarRadioClickModel = "views/coupons.view.html"
                },
                function errorCallback(response) {
                    couponUtil.handleBadResponse('ERROR:', response);
                });
    };
    // Add ROW for new company
    $scope.addRowForCustomer = function () {
        // new customer object pushed to local model
        $scope.customers.push(customerFactory());
    };
});