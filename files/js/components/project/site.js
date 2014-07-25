/* Site JS 
	
CLIENT ID	e80aed71816c41899cf2aa9638751979
CLIENT SECRET	92464ebabcd4468fb9d76a00dac9b185
WEBSITE URL	http://envano.com
REDIRECT URI	http://envano.com/about
Access token http://jelled.com/instagram/access-token
		//load spinner next to title
		//$('.loader').addClass('spin');
		//look up the user
									<img src="' + b.profile_picture +'" alt="profile picture">


*/ 


$(document).ready(function(){
	
var usercontainer = document.createElement('ul'),
		//this holds the search term
		queryString;
	$(usercontainer).addClass('users');
	$('.results').append(usercontainer);
		
 	$('.searchUser').keyup(function(e){
		//value of search box
		var searchKey = $('.searchUser').val();
		$(usercontainer).html('');
		//console.log(searchKey);
		if(searchKey.length >= 1) {
		//load spinner next to title
			$('.loader').addClass('spin-play');
			
		}
		if(searchKey.length >= 3) {
			console.log(searchKey);
			queryString = "https://api.instagram.com/v1/users/search?q=" + searchKey +"&access_token=359438134.e80aed7.a2363c18a8ae4200b1770b3f942bffed"
			$.ajax({
				url: queryString,
				type: "GET",
				//external server request must use jsonp 
				dataType: "jsonp",
				global: true,
				success: function(respondDATA) {
					//display all found usernames
					console.log(respondDATA.data.length);
					var allimgURL = Array();
					$.each(respondDATA.data, function(a,b){
						//console.log(b);
						var user = document.createElement('li');
						var usrIMG = document.createElement('img');
						usrIMG.setAttribute('src', b.profile_picture);
						usrIMG.setAttribute('alt', b.full_name);
						
						//add user info
						$(user).html(
							'<a href="#' + b.username + '"data-user-id="' + b.id + '" data-user-img="' + b.profile_picture + '">
							<img src="../../files/css/images/loader.gif"  alt="loader">
							<p><strong>Username: </strong>' + b.username + '</p>
							<p><strong>Full Name: </strong>' + b.full_name + '</p>
							<p><strong>User ID: </strong>'+ b.id +'</p>
							</a>'
						);
						console.log(b.profile_picture);
						$(usercontainer).append(user);
					
 						
					});
					
				},
				
				error: function(xhr, status, errorThrown) {
 					alert('Something bad happened');
				},
				
				complete: function(xhr, status) {
					console.log('This request is done');
					$('.loader').removeClass('spin-play').addClass('spin-stop');
					loaderFired = false;

				} 
				
		})		

		} //end of if
		return false;
	});

});

