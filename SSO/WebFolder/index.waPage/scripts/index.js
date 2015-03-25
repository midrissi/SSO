
WAF.onAfterInit = function onAfterInit() {// @lock
var mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var login1 = {};	// @login
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		if(waf.directory.currentUser()){
			$$('taow').show();
			$$('signup').hide();
		}else{
			$$('taow').hide();
			$$('signup').show();
		}
	};// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		location.reload();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		location.reload();
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		if(!myUser.firstname){
			alert('The firstname is mondatory!');
			return false;
		}
		
		if(!myUser.lastname){
			alert('The lastname is mondatory!');
			return false;
		}
		
		if(!mailRegex.test(myUser.email)){
			alert('The mail address is invalid');
			return false;
		}
		
		if(!myUser.password){
			alert('The password is mondatory!');
			return false;
		}
		
		if(myUser.password !== myUser.password_){
			alert('Passwords does not match!');
			return false;
		}
		
		ds.User.signup(myUser, {
			onSuccess: function(){
				alert('success');
				myUser = {};
				sources.myUser.sync();
			},
			onError: function(){
				alert('error');
				debugger;
			}
		});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
