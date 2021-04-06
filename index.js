var client_id = 'SDSllrSFfbGfiUodFbtNE9hcFmkfYq56';
var client_secret = 'Lt8G4viLXGAF5I76';

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

var accesToken ='';
var hotelId = '';

var hotelArray = [{media: './Images/Easy_Travel.png'}, {}, {}];

var divResultElement = document.getElementsByClassName('body')[0];

const urlParams = new URLSearchParams(window.location.search); 

var city = '';
if(urlParams.has('city')){
	city = urlParams.get('city');
}

var checkinDate = '';
if(urlParams.has('dateCheckIn')){
	checkinDate = urlParams.get('dateCheckIn');
}

var checkoutDate = '';
if(urlParams.has('dateCheckout')){
	checkoutDate = urlParams.get('dateCheckout');
}

var numberOfPeople = '';
if(urlParams.has('guess')){
	numberOfPeople = urlParams.get('guess');
}

if(city === '' || checkinDate === ''  || checkoutDate === '' || numberOfPeople === ''){
	console.log(null);
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
		.then(result => getHotels())
	  	.catch(error => console.log('error', error));

	//Function to get the list of hotels
	function getHotels(){
		var requestHotel = {
			headers: {
				'Authorization':'Bearer ' + accesToken
			},
		}
		fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=LON&checkInDate=${checkinDate}&checkOutDate=${checkoutDate}&adults=${numberOfPeople}`, requestHotel)
		.then(result => result.json())
		.then(result => {
			console.log(result);
			result.data.forEach(element => {
				hotelId = element.hotel.hotelId;
				getRooms(hotelId, element);
			})
		})
		.catch(error => console.log('error', error))

	}

	mapboxgl.accessToken = 'pk.eyJ1Ijoia2c0MDY4MDUiLCJhIjoiY2ttdzM5ZGdpMGI2eTJudXQ3cmEweGt3bSJ9.mqwbXCjoewW9zXEjXWCRDw';
					
	var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-0.1277583, 51.5073509], // starting position
			zoom: 12 // starting zoom
	});
	map.addControl(new mapboxgl.NavigationControl());

	function getRooms(hotelId, element){
		var requestOptions = {
			headers: {
				'Authorization':'Bearer ' + accesToken
			},
		};

		function addUrlHotel(){
			var url = new URL("http://localhost:8000/resutlhot.html");
			url.searchParams.append('hotelId', hotelId);
			location.replace(url);
		}
		fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=${hotelId}`, requestOptions)
            .then(result => result.json())
            .then(result => {
				if(result.hasOwnProperty("data")){
					var loc1 = [element.hotel.longitude, element.hotel.latitude];
					// Set options
					var marker = new mapboxgl.Marker({
					  color: "red",
					  draggable: false
					}).setLngLat(loc1)
					  .addTo(map);

					var div = document.createElement('div');
					div.style.marginBottom = '10px';
					div.style.border = '1px rgb(90, 90, 247) solid'
					div.style.borderRadius = '5px';
					div.style.width = '99%';
					div.style.height = '200px';

					var divComponent = document.createElement('div');
					div.style.display = 'flex';

					var img = document.createElement('img');
					img.setAttribute('src', './Image/hotel-name.jpg');
					img.style.height = '200px';
					img.style.width = '250px';
					img.style.borderRadius = '5px';
					img.style.border = '1px black solid';
					img.style.marginRight = '10px'
					div.appendChild(img);

					var pNameHotel = document.createElement('p');
					pNameHotel.innerHTML = element.hotel.name.toUpperCase();
					pNameHotel.style.fontFamily = 'Roboto';
					pNameHotel.style.fontSize = '1.2em';
					pNameHotel.style.backgroundColor = ' rgb(90, 90, 247)';
					pNameHotel.style.color = 'white';
					pNameHotel.style.fontWeight = 'normal';
					pNameHotel.style.marginTop = '10px';
					pNameHotel.style.paddingLeft = '10px';
					pNameHotel.style.paddingRight = '10px';
					//pNameHotel.style.display = 'inline';
					divComponent.appendChild(pNameHotel);

					var pAdress = document.createElement('p');

					var spanAdress = document.createElement('span');
					spanAdress.innerHTML = element.hotel.address.lines[0]
											+ ', ' + element.hotel.address.cityName
											+ ', ' + element.hotel.address.postalCode
											+ ', ' + element.hotel.address.countryCode;
					pAdress.appendChild(spanAdress);
					divComponent.appendChild(pAdress);

					var pPrice = document.createElement('p');
					pPrice.innerHTML = 'Distance from city center:  ' 
					+ element.hotel.hotelDistance.distance + '' 
					+ element.hotel.hotelDistance.distanceUnit;
					divComponent.appendChild(pPrice);

					var pType = document.createElement('p');
					pType.innerHTML = 'Type:  ' + element.hotel.type;
					pType.style.marginBottom = '2px';
					divComponent.appendChild(pType);

					var pButton = document.createElement('p');
					pButton.style.border = '1px solid'
					pButton.style.height = '40px';
					pButton.style.width = '115px';
					pButton.style.borderRadius = '5px'
					pButton.style.padding = '0px'
					pButton.style.marginLeft = '300px';

					var button = document.createElement('button');
					button.setAttribute('class', 'signup-btn');
					button.innerHTML = 'Deals';
					button.style.margin = '0px';
					button.addEventListener('click', addUrlHotel);
					pButton.appendChild(button)
					divComponent.appendChild(pButton);

					div.appendChild(divComponent);
					document.getElementById('hotels-info').appendChild(div);
				}
			})
            .catch(error => console.log('error', error));
	}
}