var client_id = 'mGGYQayW5TYAwlFfFLpRVvtpimIL94cY';
var client_secret = 'Ef1CzL2vsiygVqBb';

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

const urlParams = new URLSearchParams(window.location.search);

var idRooms = '';

if(urlParams.has('id')){
    idRooms = urlParams.get('id');
}

if(idRooms === ''){
    console.log('null');
}else{
    var accesToken = '';
    
    var requestOptions = {
		method: 'POST',
		body: urlencoded,
		redirect: 'follow'
	  };

	  fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
        .then(result => result.json())
        .then(result => {
            accesToken =result['access_token'];
            console.log(result);
            postPays();
        })
        .catch(error => console.log('Error: ' + error));

        function postPays(){
            
            var requestOptions = {
                headers: {
                    'Authorization':'Bearer ' + accesToken
                },
              };

              fetch("https://test.api.amadeus.com/v2/shopping/hotel-offers/" + idRooms, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    
                })
                .catch(error => console.log('error', error));
    }
}