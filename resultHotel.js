var client_id = 'SDSllrSFfbGfiUodFbtNE9hcFmkfYq56';
var client_secret = 'Lt8G4viLXGAF5I76';

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

const urlParams = new URLSearchParams(window.location.search);

var hotelId = '';
var title = document.getElementsByTagName('h1')[1];
var divElement = document.getElementsByClassName('info')[0];
//var divRooms = document.createElement('div');

var divNav = document.getElementsByClassName('nave')[0];
//divNav.style.display = 'none';
if(urlParams.has('hotelId')){
	hotelId = urlParams.get('hotelId');
}

if(hotelId === ''){
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

        fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers/by-hotel?hotelId=${hotelId}`, requestOptions)
            .then(result => result.json())
            .then(result => {
				var loc1 = [result.data.hotel.longitude, result.data.hotel.latitude]
				console.log(result)
				mapboxgl.accessToken = 'pk.eyJ1Ijoia2c0MDY4MDUiLCJhIjoiY2ttdzM5ZGdpMGI2eTJudXQ3cmEweGt3bSJ9.mqwbXCjoewW9zXEjXWCRDw';
				var map = new mapboxgl.Map({
					container: 'map-result',
					style: 'mapbox://styles/mapbox/streets-v11',
					center: loc1, // starting position
					zoom: 15 // starting zoom
				});
				map.addControl(new mapboxgl.NavigationControl());
				// Set options
				var marker = new mapboxgl.Marker({
					color: "red",
					draggable: false
				}).setLngLat(loc1)
				  .addTo(map);

				console.log(result);

				title.innerHTML =`${result.data.hotel.type.toUpperCase()} ${result.data.hotel.name.toUpperCase()}`;
				title.style.color = 'rgb(111, 111, 255)';
				var divResult = document.getElementById('content-result');
				divResult.style.display = 'flex';
				//divResult.style.justifyContent = 'space-between';

				var divResultRoom = document.getElementById('result-rooms');
				divResultRoom.style.height = '400px';
				divResultRoom.style.overflowY = 'auto';

				

				result.data.offers.forEach(element => {
					var divGlobelElement = document.createElement('div');
					divGlobelElement.style.display = 'flex';
					var divImg = document.createElement('div');
					var img = document.createElement('img');
					img.setAttribute('src', 'Image/hotel-name.jpg');
					img.style.width = '150px';
					img.style.height = '150px';
					divImg.appendChild(img)
					divGlobelElement.appendChild(divImg)

					var divPElement = document.createElement('div');

					var divImagePTag = document.createElement('div');
					divImagePTag.style.height = '150px';

					var pTagImage1 = document.createElement('p');

					var image1 = document.createElement('img');
					image1.setAttribute('src', 'Image/terrasse.jpg');
					image1.style.height = '70px';
					image1.style.width = '150px';
					pTagImage1.appendChild(image1)
					pTagImage1.style.height = '70px';
					pTagImage1.style.marginTop = '2px';
					pTagImage1.style.marginBottom = '4px';
					divImagePTag.appendChild(pTagImage1);

					var pTagImage2 = document.createElement('p');

					var image2 = document.createElement('img');
					image2.setAttribute('src', 'Image/piscine.jpg');
					image2.style.height = '70px';
					image2.style.width = '150px';
					pTagImage2.appendChild(image2)
					pTagImage2.style.height = '70px';
					pTagImage2.style.marginTop = '1px';
					divImagePTag.appendChild(pTagImage2);
					divImagePTag.style.marginLeft = '10px';

					divGlobelElement.style.height = '150px';
					divGlobelElement.appendChild(divImagePTag);

					var pTagTypeRoom = document.createElement('p');
					pTagTypeRoom.innerHTML = element.room.typeEstimated.category;
					pTagTypeRoom.style.marginTop = '0px';
					pTagTypeRoom.style.marginLeft = '10px';
					pTagTypeRoom.style.paddingTop = '0px';
					divPElement.appendChild(pTagTypeRoom);

					var spanAdress = document.createElement('span');
					spanAdress.appendChild(document.createTextNode(result.data.hotel.address.lines[0]));
					spanAdress.appendChild(document.createTextNode(', ' + result.data.hotel.address.cityName));
					spanAdress.appendChild(document.createTextNode(', ' + result.data.hotel.address.postalCode));
					spanAdress.appendChild(document.createTextNode(', ' + result.data.hotel.address.countryCode));
					spanAdress.style.marginLeft = '10px';

					var pSpan = document.createElement('p');
					pSpan.appendChild(spanAdress);
					divPElement.appendChild(pSpan);

					if(result.data.hotel.hasOwnProperty("contact")){
						var pTagEmail = document.createElement('p');
						pTagEmail.innerHTML = 'Email Adress: ' + result.data.hotel.contact.email;
						pTagEmail.style.marginLeft = '10px';
						divPElement.appendChild(pTagEmail);
					}

					var divPriceDeals = document.createElement('div');
					divPriceDeals.style.display = 'flex';
					divPriceDeals.style.justifyContent = 'space-between';

					var pTagPrice = document.createElement('p');
					pTagPrice.innerHTML = 'Price: ' + element.price.total + '$';
					pTagPrice.style.marginLeft = '10px';
					divPriceDeals.appendChild(pTagPrice);

					var pTagDeals = document.createElement('p');
					
					var aDeals = document.createElement('a');
					aDeals.innerHTML = 'Deals';
					aDeals.style.backgroundColor = 'blue';
					aDeals.style.paddingLeft = '15px';
					aDeals.style.paddingRight = '15px';
					aDeals.style.paddingTop = '7px';
					aDeals.style.paddingBottom = '7px';
					aDeals.style.color = 'white';
					aDeals.style.textDecoration = 'none';
					aDeals.style.borderRadius = '5px';
					aDeals.style.fontWeight = 'bold';
					aDeals.setAttribute('href', './paymentpage.html?idRoom=' + element.id);
					pTagDeals.style.marginLeft = '10px';
					pTagDeals.appendChild(aDeals);
					divPriceDeals.appendChild(pTagDeals);

					
					divPElement.appendChild(divPriceDeals);
					

					divGlobelElement.appendChild(divPElement)
					divGlobelElement.style.border = '1px solid black';
					divGlobelElement.style.paddingRight = '10px';
					divGlobelElement.style.marginBottom = '10px';
					divGlobelElement.style.borderRadius = '8px';
					divResultRoom.appendChild(divGlobelElement);

				});
			})
            .catch(error => console.log('error', error));
    }
}