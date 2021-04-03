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
				title.style.textShadow = '5px 5px 8px rgb(11, 11, 255)';
				var divResult = document.getElementById('content-result');
				divResult.style.display = 'flex';
				divResult.style.justifyContent = 'space-between';

				var divResultRoom = document.getElementById('result-rooms');

				

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

					/*var divImagePTag = document.createElement('div');

					var pTagImage1 = document.createElement('p');

					var image1 = document.createElement('img');
					image1.setAttribute('src', 'Image/terrasse.jpg');
					image1.style.height = '77px';
					image1.style.width = '150px';
					divImagePTag.appendChild(image1);

					var pTagImage2 = document.createElement('p');

					var image2 = document.createElement('img');
					image2.setAttribute('src', 'Image/piscine.jpg');
					image2.style.height = '77px';
					image2.style.width = '150px';
					divImagePTag.appendChild(image2);
					divImagePTag.style.marginLeft = '10px';

					divGlobelElement.style.height = '150px';
					divGlobelElement.appendChild(divImagePTag);*/

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
					aDeals.setAttribute('href', './pay.html?idRoom=' + element.id);
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
				/*result.data.offers.forEach(element => {
					var divTitle = document.createElement('div');
					var divContent = document.createElement('div');
					divTitle.innerHTML = element.room.typeEstimated.category;
					divTitle.style.backgroundColor = 'rgb(90, 90, 247)';
					divTitle.style.fontSize = '1.2em';
					divTitle.style.color = 'white';
					divTitle.style.marginLeft = '10px';
					divTitle.style.height = '40px';
					divTitle.style.textAlign = 'center';
					divTitle.style.borderRadius = '5px 5px 0px 0px';
					divContent.appendChild(divTitle);

					var divCart = document.createElement('div');
					var spanCard = document.createElement('span');
					divCart.style.border = '1px solid black';
					divCart.style.marginLeft = '10px';
					divCart.style.marginTop = '0px';
					divCart.style.marginBottom = '10px';
					/*spanCard.innerHTML = 'Card accept: ';
					element.policies.guarantee.acceptedPayments.creditCards.forEach(element => {
						spanCard.appendChild(document.createTextNode(element + '  '));
					});

					var pMethodPay = document.createElement('p');
					pMethodPay.innerHTML = 'Pay to: ';
					pMethodPay.style.marginBottom = '3px';
					element.policies.guarantee.acceptedPayments.methods.forEach(element => {
						pMethodPay.appendChild(document.createTextNode(element));
					});

					var pElementBoarType = document.createElement('p');
					pElementBoarType.style.marginBottom = '3px';
					pElementBoarType.innerHTML = 'Board: ' + element.boardType;
					divCart.appendChild(pElementBoarType);

					//divCart.appendChild(pMethodPay);
					divCart.appendChild(spanCard);
					

					var pElementPrice = document.createElement('p');
					pElementPrice.style.marginTop = '3px';
					pElementPrice.style.marginBottom = '3px';
					pElementPrice.innerHTML = 'Price: ' + element.price.total + '$';
					divCart.appendChild(pElementPrice);

					var spanElementDeal = document.createElement('span');
					var aElementSpan = document.createElement('a');
					aElementSpan.setAttribute('href', '/pay.html?id=' + element.id);
					aElementSpan.innerHTML = 'Deals';
					aElementSpan.style.textDecoration = 'none';
					aElementSpan.style.color = 'white';
					spanElementDeal.appendChild(aElementSpan); 
					spanElementDeal.style.border = '1px solid black'
					spanElementDeal.style.backgroundColor = 'rgb(90, 90, 247)';
					spanElementDeal.style.borderRadius = '5px';
					spanElementDeal.style.paddingLeft = '10px';
					spanElementDeal.style.paddingRight = '10px';
					spanElementDeal.style.marginLeft = '150px';
					divElement.appendChild(spanElementDeal);
					/*divCart.style.paddingBottom = '5px';
					divCart.appendChild(spanElementDeal);

					divContent.appendChild(divCart);
                    divRooms.setAttribute('class', 'containaer-card');
					divRooms.appendChild(divContent);
					divElement.appendChild(divRooms);
				});*/
			})
            .catch(error => console.log('error', error));
    }
}