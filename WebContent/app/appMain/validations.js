app.service('validations', function ($location){
	
	//Name Validation
	this.validateName = function (name) {
		 var userExists = false;
		 angular.forEach ($scope.companies, function (company) {
			 if (userExists === false) 
			 {
				 	if(company.name === name)
				 {
					userExists = true;
					console.log ("Duplicate!");
					return userExists; 
				 } 
				 	else 
				 {
				 	userExists = false;
					console.log ("Not Duplicate!");
					return userExists;
				 }
			}
		 });
		if (userExists==true || name.length<1) 
		{
			return "Company Name already exist\n"
				+ "Please enter different name"	;
		} 
	};
	
	this.passwordValidation = function (password) {
        var pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{4,9}/g;
        if (pattern.test(password) && (password.length < 10)) {
            return true;
        } else {
            return "Password must contain:\n"
                + "4-9 characters\n"
                + "At lest one upper case letter\n"
                + "At lest one lower case letter\n"
                + "At lest one digit";
        }
    
    };
})