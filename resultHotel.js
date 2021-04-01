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
var divRooms = document.createElement('div');

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
					zoom: 9 // starting zoom
				});
				map.addControl(new mapboxgl.NavigationControl());
				// Set options
				var marker = new mapboxgl.Marker({
					color: "red",
					draggable: false
				}).setLngLat(loc1)
				  .addTo(map);
				title.innerHTML =`${result.data.hotel.type.toUpperCase()} ${result.data.hotel.name.toUpperCase()}`;
				var img = document.createElement('img');

				var h3 = document.getElementById('h3')
				h3.innerHTML = result.data.hotel.name
				h3.style.fontFamily = "roboto"
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
					divCart.style.paddingBottom = '5px';
					divCart.appendChild(spanElementDeal);

					divContent.appendChild(divCart);
                    divRooms.setAttribute('class', 'containaer-card');
					divRooms.appendChild(divContent);
					divElement.appendChild(divRooms);
				});*/
				console.log(result);
			})
            .catch(error => console.log('error', error));
    }
}