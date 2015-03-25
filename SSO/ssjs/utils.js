function taowLogin (req, resp) {
	var curSession = currentSession();

	if(curSession.belongsTo('authenticated')){
		var taowDS = solution.getApplicationByName("TAOW").ds;
		var token = curSession.promoteWith('administrator');
		var user = taowDS.User.find('username == :1 or email == :1', sessionStorage.username);
		if(user){
			var tmpSession = new taowDS.TmpSession({
				user: user
			});
			tmpSession.save();
			curSession.unPromote(token);
			resp.headers.Location = 'http://localhost:8082/validateToken?token=' + tmpSession.getKey() + '&user=' + encodeURIComponent(sessionStorage.username);
			resp.headers.statusCode = 302;
			return;
		}
		curSession.unPromote(token);
	}

	resp.headers.statusCode = 401;
	return 'Not authorized!';
}