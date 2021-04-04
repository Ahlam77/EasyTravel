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
<<<<<<< HEAD
var divRooms = document.createElement('div');
var container = document.getElementById('Iflex');
=======
//var divRooms = document.createElement('div');
>>>>>>> 52dfe87c82ba327a1711ffe45ccfb91e380a67cb

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
				var img = document.createElement('img');

				var h3 = document.getElementById('h3')
				h3.innerHTML = result.data.hotel.name
				h3.style.fontFamily = "roboto"
				h3.style.fontWeight = 'bold'
				result.data.offers.forEach(element => {
					/*var text = document.getElementById('info-room')
					text.style.fontSize = '20px'
					text.style.fontWeight = 'bold'
					var text1 = document.getElementById('info-room1')
					text1.style.fontSize = '20px'
					text1.style.fontWeight = 'bold'
					var text2 = document.getElementById('info-room2')
					text2.style.fontSize = '20px'
					text2.style.fontWeight = 'bold'
					
					text.innerHTML ="Suit-type:"+" "+ element.room.typeEstimated.bedType
					text1.innerHTML = "Rooms:"+" "+ element.room.typeEstimated.beds
					text2.innerHTML = "Category:"+" "+ element.room.typeEstimated.category*/
					var infoRooms = document.getElementById('info-rooms')
					var divElement = document.createElement('div')
					var divImage = document.createElement('div')
					var divPara = document.createElement('div')
					divElement.appendChild(divImage)
					var image = document.createElement('img')
					image.setAttribute('src', './Image/place-10.jpg')

					image.style.width = '100px'
					image.style.height = '90px'
					
					divImage.appendChild(image)
					divElement.appendChild(divPara)
					
					var ptag = document.createElement('p')
					var ptag2 = document.createElement('p')
					var ptag3 = document.createElement('p')
					var button = document.createElement('button')


					ptag.innerHTML = 'Price:'+" "+element.price.total+""+""+'$'
					ptag2.innerHTML = 'Category:'+' '+element.room.typeEstimated.category
					button.innerText = 'Book Now'
					
					//

					divPara.appendChild(ptag)
					divPara.appendChild(ptag2)
					divPara.appendChild(button)
					divElement.setAttribute('id', 'info-rooms')
					divElement.style.width = '600px'
					divElement.style.height = '120px'
					
					divElement.style.color = 'grey'
					divElement.style.border = '3px solid black'
					divElement.style.borderRadius = '10px'
					divElement.style.display = 'flex'
					divElement.style.flexDirection = 'row'
					divPara.style.display = 'block'
					divPara.style.margin = '0 15px'
					button.style.backgroundColor = 'blue'
					button.style.border = 'none'
					button.style.color = 'white'
					button.style.borderRadius = '10px'

					container.appendChild(divElement)
				
					
					





					/*var divTitle = document.createElement('div');
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
			})
            .catch(error => console.log('error', error));
    }
}