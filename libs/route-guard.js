$(document).ready(()=>{
	//checking for loggedIn session
	if(window.localStorage.credentials!=null && window.localStorage.credentials!=undefined &&
		verifyUser(JSON.parse(window.localStorage.credentials))){
			console.log('user is verified');
			if(window.location.href.indexOf('index.html')>0)
			window.location.href='components/all-users.html'
		}
	else if(window.location.href.indexOf('index.html')<=0)
		window.location.href='./../index.html';	
})