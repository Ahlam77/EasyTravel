var client_id = 'mGGYQayW5TYAwlFfFLpRVvtpimIL94cY';
var client_secret = 'Ef1CzL2vsiygVqBb';

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

var accesToken = '';
var hotelId = '';

var divResultElement = document.getElementById('result-hotels');

const urlParams = new URLSearchParams(window.location.search);

var cityName = '';
if (urlParams.has('where')) {
    cityName = urlParams.get('where');
}

var checkinDate = '';
if (urlParams.has('checkin')) {
    checkinDate = urlParams.get('checkin');
}

var checkoutDate = '';
if (urlParams.has('checkout')) {
    checkoutDate = urlParams.get('checkout');
}

var numberOfPeople = '';
if (urlParams.has('guess')) {
    numberOfPeople = urlParams.get('guess');
}

if (cityName === '' || checkinDate === '' || checkoutDate === '' || numberOfPeople === '') {
    console.log(cityName + ' ' + checkinDate + ' ' + ' ' + checkoutDate + ' ' + numberOfPeople);
} else {
    var requestOptions = {
        method: 'POST',
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://test.api.amadeus.com/v1/security/oauth2/token", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            accesToken = result['access_token'];
        })
        .then(result => getHotels())
        .catch(error => console.log('error', error));

    //Function to get the list of hotels
    function getHotels() {
        var requestHotel = {
            headers: {
                'Authorization': 'Bearer ' + accesToken
            },
        }
        fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=LON&checkInDate=${checkinDate}&checkOutDate=${checkoutDate}&adults=${numberOfPeople}`, requestHotel)
            .then(result => result.json())
            .then(result => {
                result.data.forEach(element => {
                    var div = document.createElement('div');
                    var pNameHotel = document.createElement('p');
                    pNameHotel.innerHTML = element.hotel.name.toUpperCase();
                    div.appendChild(pNameHotel);

                    var pCityName = document.createElement('p');
                    pCityName.innerHTML = element.hotel.address.cityName + ', ' +
                        element.hotel.address.countryCode +
                        '. ' + element.hotel.address.lines[0].toLowerCase() +
                        ', ' + element.hotel.address.postalCode;
                    div.appendChild(pCityName);

                    var pElementMedia = document.createElement('span');
                    pElementMedia.innerHTML = 'Price: ' + element.offers[0].price.total + '$';
                    div.appendChild(pElementMedia);

                    var aElementDeals = document.createElement('a');
                    aElementDeals.setAttribute('href', `resutlhot.html?hotelId=${element.hotel.hotelId}&checkInDate=${checkinDate}&checkOutDate=${checkoutDate}&adults=${numberOfPeople}`);
                    aElementDeals.innerHTML = 'Deals';
                    aElementDeals.style.textDecoration = 'none';
                    aElementDeals.style.borderRadius = '5px';
                    aElementDeals.style.backgroundColor = 'blue';
                    aElementDeals.style.marginRight = '10px';
                    aElementDeals.style.marginLeft = '200px';
                    aElementDeals.style.color = 'white';
                    aElementDeals.style.fontSize = '1.2em';
                    aElementDeals.style.fontStyle = 'italic';
                    aElementDeals.style.fontWeight = 'normal';
                    aElementDeals.style.paddingLeft = '8px';
                    aElementDeals.style.paddingRight = '8px';
                    div.appendChild(aElementDeals);

                    div.setAttribute('class', 'result-ho1');
                    divResultElement.appendChild(div);
                });
                console.log(result);
            })
            .catch(error => console.log('error', error))
    }
}

/*function searchHotels(){
	var cityName = document.getElementById('where').value;
	var dateCheckin = document.getElementById('checkin').value;
	var dateCheckout = document.getElementById('checkout').value;
	var quest = document.getElementById('guess').value;
	console.log(cityName +' ' + dateCheckout +' ' + dateCheckin);
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
		//Function to get the list of hotels
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
			.catch(error => console.log('error', error))
		}
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
*/