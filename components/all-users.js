let allUsers=[];
let saveFlag='';

$(document).ready(()=>{
	if(window.localStorage.allUsers!=undefined && window .localStorage.allUsers.length!=0){
		allUsers=JSON.parse(window.localStorage.allUsers);
	}

	//adds a user in DOM
	let appendUser=(i)=>{

		//creating new row for the user
		$('#all-users').append('<div id="userId'+i+'" class="d-inline-flex w-100 mb-2"><div id="userpic'+i+'"></div><div id="userinfo'+i+'" class="d-flex flex-column justify-content-center col-10"></div></div>');	
		//appending user picture
		$('#userpic'+i+'').append('<img src="./../assets/default-person.png" class="rounded-circle w-100" />')
		//appending userinfo
		$('#userinfo'+i+'').append('<div id="name">'+allUsers[i].userName+'</div> <div id="email">'+allUsers[i].email+'</div> <div id="pincode">'+allUsers[i].pincode+'</div> <div id="phone">'+allUsers[i].phone+'</div>');
		//appending tools such as edit,delete
		$('#userinfo'+i+'').append('<div id="tools'+i+'" class="d-inline-flex"> <a id="edit" data-toggle="modal" data-target="#userForm" class="btn btn-secondary mr-3 text-white">EDIT</a> <a id="delete" class="btn btn-danger mr-3 text-white">DELETE</a> </div>');
		
		$('#userinfo'+i+' #edit').on('click',()=>{
			$('#userForm #name').val(allUsers[i].userName);
			$('#userForm #email').val(allUsers[i].email);
			$('#userForm #phone').val(allUsers[i].phone);
			$('#userForm #pincode').val(allUsers[i].pincode);
			$('#userForm').find('#error').remove();
			$('#userForm').find('#save').removeAttr("data-dismiss");
			saveFlag='update-'+i+'';
		})

		$('#userinfo'+i+' #delete').on('click',()=>{
			allUsers.splice(allUsers.map(user=>{return user.email}).indexOf($('#userId'+i+'').find('#email').html()),1);
			$('#all-users').find('#userId'+i+'').remove();
			window.localStorage['allUsers']=JSON.stringify(allUsers);
		})
	}

	//Load all Users
	for (let i=0 ;i<allUsers.length; i++) {
		appendUser(i)
	}
	
	//form for creating new user
	$('#newUser').on('click',()=>{
		$('#userForm #name').val('');
		$('#userForm #email').val('');
		$('#userForm #phone').val('');
		$('#userForm #pincode').val('');
		$('#userForm').find('#error').remove();
		$('#userForm').find('#save').removeAttr("data-dismiss");
		saveFlag='create';
	})
	//form validation 
	let validate=(name,email,phone,pincode)=>{
		$('#userForm').find('#error').remove();
		console.log(email)
		if(name==null || name==undefined || !(new RegExp('^[A-Za-z]+$').test(name)) )
			return "Please enter a valid name of minimum 3 characters";
		else if(email==null || email==undefined )
			return "Please enter a valid email";
		else if(phone==null || phone==undefined || !(new RegExp('^[0-9]+$').test(phone)) )
			return "Please enter a valid phone number"
		else if(pincode==null || pincode==undefined || !(new RegExp('^[0-9]+$').test(pincode)) )
			return "Please enter a valid pincode"
		else
			return true;
	}

	// creating & updating user 
	$('#userForm #save').on('click',()=>{
		let name=$('#userForm #name').val();
		let email=$('#userForm #email').val();
		let phone=$('#userForm #phone').val();
		let pincode=$('#userForm #pincode').val();

		//validating fields
		let isValid=validate(name,email,phone,pincode);

		if(isValid===true){
			$('#userForm').find('#save').attr("data-dismiss","modal");
			if(saveFlag=='create'){
				if(window.localStorage['allUsers']==undefined && allUsers.length==0){
					window.localStorage['allUsers']=[];
				}
				//adding new element in list
				allUsers.push({
					userName:name,
					email:email,
					phone:phone,
					pincode:pincode
				})
				//creating new element in DOM
				appendUser(allUsers.length-1);
			}else {
				let uI=parseInt(saveFlag.substring(saveFlag.indexOf('-')+1));
				//upadting list
				allUsers[uI].userName=name;	
				allUsers[uI].email=email;
				allUsers[uI].phone=phone;
				allUsers[uI].pincode=pincode;
				//updating DOM 
				$('#userinfo'+uI+'').find('#name').html(name);
				$('#userinfo'+uI+'').find('#email').html(email);
				$('#userinfo'+uI+'').find('#pincode').html(phone);
				$('#userinfo'+uI+'').find('#phone').html(pincode);
			}
			//updating localstorage
			window.localStorage['allUsers']=JSON.stringify(allUsers);
		}else{
			$('.modal-body').append('<div id="error" style="font-size:0.7em;color:red;">'+isValid+'</div>')
		}
	});

	//logging out a user
	$('#logout').on('click',()=>{
		window.localStorage.removeItem('credentials');
		window.location.href="./../index.html";
	})
});

