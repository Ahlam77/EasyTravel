
var client_id = 'mGGYQayW5TYAwlFfFLpRVvtpimIL94cY';
var client_secret = 'Ef1CzL2vsiygVqBb';

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

var accesToken ='';
var hotelId = '';

var requestOptions = {
  method: 'POST',
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
  .then(response => response.json())
  .then(result => {
	  accesToken =result['access_token'];
	})
	.then(result => getHotels())
  .catch(error => console.log('error', error));

function getHotels(){
	var requestHotel = {
		headers: {
			'Authorization':'Bearer ' + accesToken
		},
	}
	fetch('https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=PAR', requestHotel)
	.then(result => result.json())
	.then(result => {
        var divElement = document.getElementById('root');
        console.log(result);
		result.data.forEach(element => {
            var pTag = document.createElement('p');
            pTag.innerHTML = element.hotel.name;
            divElement.appendChild(pTag);
        });
	})
	.then(result => getRooms())
	.catch(error => console.log('error', error))
}

function getRooms(){
	var requestRoom = {
		headers: {
			'Authorization':'Bearer ' + accesToken
		},
	}
	fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=${hotelId}`, requestRoom)
	.then(result => result.json())
	.then(result => console.log(result))
}