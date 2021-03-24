var client_id = 'mGGYQayW5TYAwlFfFLpRVvtpimIL94cY';
var client_secret = 'Ef1CzL2vsiygVqBb';

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

const urlParams = new URLSearchParams(window.location.search);

var hotelId = '';
var checkInDate = '';
var checkOutDate = '';
var adults = '';
var accesToken = '';

if(urlParams.has('hotelId')){
	hotelId = urlParams.get('hotelId');
}

if(urlParams.has('checkInDate')){
	checkInDate = urlParams.get('checkInDate');
}

if(urlParams.has('checkOutDate')){
	checkOutDate = urlParams.get('checkOutDate');
}

if(urlParams.has('adults')){
	adults = urlParams.get('adults');
}

if(hotelId === '' || checkInDate === '' || checkOutDate === '' || adults === ''){
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
        .then(result => getResultHotel())
        .catch(error => console.log('error', error));

    function getResultHotel(){
        var requestOptions = {
			headers: {
				'Authorization':'Bearer ' + accesToken
			},
		};

        fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=${hotelId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${adults}`, requestOptions)
            .then(result => result.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}