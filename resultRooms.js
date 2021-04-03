var client_id = 'SDSllrSFfbGfiUodFbtNE9hcFmkfYq56';
var client_secret = 'Lt8G4viLXGAF5I76';

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

const urlParams = new URLSearchParams(window.location.search);

var idOffers = '';

if(urlParams.has('fullName')){
    idOffers = urlParams.get('fullName');
}

if(idOffers === ''){
    console.log('null');
}else{
    var requestOptions = {
		method: 'POST',
		body: urlencoded,
		redirect: 'follow'
	  };

	  fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
	  	.then(response => response.json())
	  	.then(result => {
			  console.log(result);
		  accesToken =result['access_token'];
		})
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

		function resultRooms(){
			var requestOptions = {
				headers: {
					'Authorization':'Bearer ' + accesToken
				},
			};
			fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers/${idOffers}`, requestOptions)
			.then(result => result.json())
			.then(data => console.log(data))
			.catch(error => console.log('error', error));
		}
}