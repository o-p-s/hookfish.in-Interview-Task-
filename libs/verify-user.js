let verifyUser=(credentials)=>{
	if(credentials!==undefined && credentials!==null){
		if(credentials.email!==undefined && credentials.email==='verified-user@admin.com' && credentials.password!==undefined && credentials.password==='verified@admin'){
			return true;
		}
	}else{ 
		return false
	}	
}