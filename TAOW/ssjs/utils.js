function getParameterByName(name, req) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(req.url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function validateToken (req, resp) {
	var curSession = currentSession();
	var token = getParameterByName('token', req);
	var user = getParameterByName('user', req);

	if(user && token){
		var t = curSession.promoteWith('administrator');
		var tmpSession = ds.TmpSession(token);
		var theUser = tmpSession.user;

		if(theUser && (theUser.username === user || theUser.email === user) && loginByKey(user, token)){
			tmpSession.remove();
			curSession.unPromote(t);
			resp.headers.Location = '/';
			resp.headers.statusCode = 302;
			return;
		}

		curSession.unPromote(t);
	}

	resp.headers.statusCode = 401;
	return 'Not authorized!';
}