function loginListener(username, password, asKey) {
	var u = null;
	var validatePass = true;

	switch (application.name) {
		case 'TAOW':
			if(asKey){
				var tmp = ds.TmpSession.find('ID == :2 and (user.username == :1 or user.email == :1)', username, password);
				if(tmp){
					u = tmp.user;
					validatePass = false;
				}
			}else{
				u = ds.User.find('username == :1 or email == :1', username);
			}
			break;
		case 'Dash':
			u = ds.User.find('username == :1 or email == :1', username);
			break;
	}

	if (u == null)
		return false;

	if (!validatePass || u.isPasswordValid(password)) {
		return {
			ID: u.getKey(),
			name: username,
			fullName: u.fullname,
			belongsTo: ['authenticated'],
			storage: {
				time: new Date(),
				ID: u.getKey(),
				username: username
			}
		};
	}

	return {
		error: 1024,
		errorMessage: "invalid login or password!"
	}
}