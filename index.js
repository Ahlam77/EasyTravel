var client_id = 'SDSllrSFfbGfiUodFbtNE9hcFmkfYq56';
var client_secret = 'Lt8G4viLXGAF5I76';

var loc1 = [];
var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

var accesToken = '';
var hotelId = '';

var hotelArray = [{ media: './Images/Easy_Travel.png' }, {}, {}];

var divResultElement = document.getElementsByClassName('body')[0];

const urlParams = new URLSearchParams(window.location.search);


var city = '';
if (urlParams.has('city')) {
	city = urlParams.get('city');
}

var checkinDate = '';
if (urlParams.has('dateCheckIn')) {
	checkinDate = urlParams.get('dateCheckIn');
}

var checkoutDate = '';
if (urlParams.has('dateCheckout')) {
	checkoutDate = urlParams.get('dateCheckout');
}

var numberOfPeople = '';
if (urlParams.has('guess')) {
	numberOfPeople = urlParams.get('guess');
}

if (city === '' || checkinDate === '' || checkoutDate === '' || numberOfPeople === '') {
	console.log(null);
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
				console.log(result);
			var data1 = { lat: result.data[0].hotel.latitude, lon: result.data[0].hotel.longitude }
			var data2 = { lat: result.data[1].hotel.latitude, lon: result.data[1].hotel.longitude }
			var data3 = { lat: result.data[2].hotel.latitude, lon: result.data[2].hotel.longitude }
			var data4 = { lat: result.data[3].hotel.latitude, lon: result.data[3].hotel.longitude }
			var data5 = { lat: result.data[4].hotel.latitude, lon: result.data[4].hotel.longitude }
			var data6 = { lat: result.data[5].hotel.latitude, lon: result.data[5].hotel.longitude }
			var data7 = { lat: result.data[6].hotel.latitude, lon: result.data[6].hotel.longitude }
			var data8 = { lat: result.data[7].hotel.latitude, lon: result.data[7].hotel.longitude }
			var data9 = { lat: result.data[8].hotel.latitude, lon: result.data[8].hotel.longitude }
			var data10 = { lat: result.data[9].hotel.latitude, lon: result.data[9].hotel.longitude }
			var data11 = { lat: result.data[10].hotel.latitude, lon: result.data[10].hotel.longitude }
			var data12 = { lat: result.data[11].hotel.latitude, lon: result.data[11].hotel.longitude }
			
			var map = L.map('map').setView(data1, 10);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
			}).addTo(map);

			L.control.scale().addTo(map);
			L.marker(data1).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/hotel.jpg"><p>Hotel inn Paris<br> notre dame</p>').addTo(map);
			L.marker(data2).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/hotel2.jpg"><p>Hotel demo Paris</p>').addTo(map);
			L.marker(data3).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/hotel1.jpg"><p>Hotel test Paris</p>').addTo(map);
			L.marker(data4).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/bulle-d-hiver.jpg"><p>Novotel Paris les Halles</p>').addTo(map);
			L.marker(data5).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/479903.jpg"><p>Renaissance Paris Vendome</p>').addTo(map);
			L.marker(data6).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/479903.jpg"><p>Renaissance Paris Vendome</p>').addTo(map);
			L.marker(data7).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/479903.jpg"><p>Renaissance Paris Vendome</p>').addTo(map);
			L.marker(data8).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/479903.jpg"><p>Renaissance Paris Vendome</p>').addTo(map);
			L.marker(data9).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/479903.jpg"><p>Renaissance Paris Vendome</p>').addTo(map);
			L.marker(data10).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/479903.jpg"><p>Renaissance Paris Vendome</p>').addTo(map);
			L.marker(data11).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/479903.jpg"><p>Renaissance Paris Vendome</p>').addTo(map);
			L.marker(data12).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/479903.jpg"><p>Renaissance Paris Vendome</p>').addTo(map);
            
			

				result.data.forEach(element => {
					hotelId = element.hotel.hotelId;
					getRooms(hotelId, element);
				})
			})
			.catch(error => console.log('error', error))

	}

	function getRooms(hotelId, element) {
		var requestOptions = {
			headers: {
				'Authorization': 'Bearer ' + accesToken
			},
		};
		fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=${hotelId}`, requestOptions)
			.then(result => result.json())
			.then(result => {

				if (result.hasOwnProperty("data")) {
					loc1 = [element.hotel.longitude, element.hotel.latitude]
					console.log(loc1)
					



					/*var divImage = document.createElement('div');
					var div = document.createElement('div');
					var divElementChild = document.createElement('div');
					var divPElement = document.createElement('div');
					divPElement.style.marginLeft = '10px';
					var img = document.createElement('img');

					divElementChild.style.display = 'flex';
					divElementChild.style.justifyContent = 'space-between';
					divImage.style.border = '1px solid black';
					divImage.style.borderRadius = '5px';

					if(element.hotel.hasOwnProperty("media")){
						img.setAttribute('src', element.hotel.media[0].uri);
						divImage.appendChild(img);
						img.style.height = '150px';
						img.style.width = '150px';
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
					divElementChild.setAttribute('class', 'result-ho1')
					divResultElement.appendChild(divElementChild);*/
				}
			})
			.catch(error => console.log('error', error));
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

				var data1 = { lat: element.hotel.latitude, lon: element.hotel.longitude }


			var map = L.map('map').setView(data1, 15);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
			}).addTo(map);

			L.control.scale().addTo(map);
			L.marker(data1).bindPopup('<img background-size="cover" width="100px" height="100px" src="images/hotel.jpg"><p>Hotel inn Paris<br> notre dame</p>').addTo(map);

*/