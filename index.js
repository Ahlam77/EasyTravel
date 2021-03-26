var client_id = 'mGGYQayW5TYAwlFfFLpRVvtpimIL94cY';
var client_secret = 'Ef1CzL2vsiygVqBb';

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

var accesToken ='';
var hotelId = '';

var hotelIdArray = [];

var divResultElement = document.getElementById('result-hotels');

/*const urlParams = new URLSearchParams(window.location.search); 

var cityName = '';
if(urlParams.has('where')){
	cityName = urlParams.get('where');
}

var checkinDate = '';
if(urlParams.has('checkin')){
	checkinDate = urlParams.get('checkin');
}

var checkoutDate = '';
if(urlParams.has('checkout')){
	checkoutDate = urlParams.get('checkout');
}

var numberOfPeople = '';
if(urlParams.has('guess')){
	numberOfPeople = urlParams.get('guess');
}

if(cityName === '' || checkinDate === ''  || checkoutDate === '' || numberOfPeople === ''){
	console.log(cityName + ' ' + checkinDate + ' ' + ' ' + checkoutDate + ' ' + numberOfPeople);
}else{*/
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
		.then(result => getHotels())
	  	.catch(error => console.log('error', error));

	//Function to get the list of hotels
	function getHotels(){
		var requestHotel = {
			headers: {
				'Authorization':'Bearer ' + accesToken
			},
		}
		fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=LON&checkInDate=2021-03-25&checkOutDate=2021-03-26&adults=1`, requestHotel)
		.then(result => result.json())
		.then(result => {
			console.log(result);
			result.data.forEach(element => {
				hotelId = element.hotel.hotelId;
				getRooms(hotelId, element);
			});
		})
		.catch(error => console.log('error', error))

	}

	function getRooms(hotelId, element){
		var requestOptions = {
			headers: {
				'Authorization':'Bearer ' + accesToken
			},
		};
		fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=${hotelId}`, requestOptions)
            .then(result => result.json())
            .then(result => {
				if(result.hasOwnProperty("data")){
					var divImage = document.createElement('div');
					var div = document.createElement('div');
					var divElementChild = document.createElement('div');
					var divPElement = document.createElement('div');
					var img = document.createElement('img');

					divElementChild.style.display = 'flex';
					divElementChild.style.justifyContent = 'space-between';
					divImage.style.border = '1px solid black';
					divImage.style.borderRadius = '5px';

					if(element.hotel.hasOwnProperty("media")){
						img.setAttribute('src', element.hotel.media[0].uri);
						divImage.appendChild(img);
						img.style.height = '150px';
						divElementChild.appendChild(divImage);
						console.log(element.hotel.media[0].uri);
					}else{
						divImage.style.height = '150px';
						divImage.style.width = '150px';
						divElementChild.appendChild(divImage);
					}

					var pNameHotel = document.createElement('p');
					pNameHotel.innerHTML = element.hotel.name.toUpperCase();
					divPElement.appendChild(pNameHotel);

					var pCityName = document.createElement('p');
					pCityName.innerHTML = element.hotel.address.cityName + ', ' 
									+ element.hotel.address.countryCode
									+ '. ' + element.hotel.address.lines[0].toLowerCase()
									+ ', ' + element.hotel.address.postalCode;
					divPElement.appendChild(pCityName);

					var pElementMedia = document.createElement('span');
					pElementMedia.innerHTML = 'Price: ' + element.offers[0].price.total + '$';
					divPElement.appendChild(pElementMedia);

					var aElementDeals = document.createElement('a');
					aElementDeals.setAttribute('href', `resutlhot.html?hotelId=${element.hotel.hotelId}`);
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
					aElementDeals.style.display = 'inline-block';
					aElementDeals.style.marginTop = '50px';
					var divAElement = document.createElement('div');
					divAElement.appendChild(aElementDeals);
					
					divElementChild.appendChild(divPElement);
					divElementChild.appendChild(divAElement);
					divElementChild.setAttribute('class', 'result-ho1');
					divResultElement.appendChild(divElementChild);
				}
			})
            .catch(error => console.log('error', error));
	}
//}

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

result.data.forEach(element => {
				var div = document.createElement('div');
				var pNameHotel = document.createElement('p');
				pNameHotel.innerHTML = element.hotel.name.toUpperCase();
				div.appendChild(pNameHotel);

				var pCityName = document.createElement('p');
				pCityName.innerHTML = element.hotel.address.cityName + ', ' 
									+ element.hotel.address.countryCode
									+ '. ' + element.hotel.address.lines[0].toLowerCase()
									+ ', ' + element.hotel.address.postalCode;
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
*/