'use strict';

(function() {
	var m = model.User;
	var formatter = require("formatting");
	var eMethods = m.entityMethods;
	var methods = m.methods;
	var events = m.events;

	m.password = {
		onGet: function() {
			return '***********';
		},
		onSet: function(value) {
			this.key = directory.computeHA1(this.getKey(), value);
		}
	};

	m.fullname = {
		onGet: function() {
			var str = "";

			if (this.firstname) {
				str += formatter.formatString(this.firstname, 'c');
			}

			if (this.lastname) {
				str += ' ' + this.lastname.toUpperCase();
			}

			return str;
		},
		onSet: function(){

		}
	};

	eMethods.isPasswordValid = function(password) {
		return directory.computeHA1(this.getKey(), password) === this.key;
	};
	
	methods.signup = function(user){
		(new this(user)).save();
		
		try{
			var taowDS = solution.getApplicationByName("TAOW").ds;
			(new taowDS.User({
				username: user.username,
				firstname: user.firstname,
				lastname: user.lastname,
				password: user.password,
				email: user.email
			})).save();
		}catch(e){

		}
		
		return true;
	};
	methods.signup.scope = 'public';
})();