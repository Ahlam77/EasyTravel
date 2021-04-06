const urlParams = new URLSearchParams(window.location.search);

var divResult = document.getElementsByClassName('result')[0];
divResult.style.paddingLeft = '20px';
divResult.style.paddingRight = '20px';
divResult.style.paddingBottom = '20px';
divResult.style.fontSize = '1.3em';
divResult.style.borderRadius = '6px';

var firstName = '';

if(urlParams.has('firstName')){
	firstName = urlParams.get('firstName');
}

var lastName = '';
if(urlParams.has('lastName')){
	lastName = urlParams.get('lastName');
}

var dateBrithday = '';
if(urlParams.has('dateBrithday')){
	dateBrithday = urlParams.get('dateBrithday');
}

var numTelefone = '';
if(urlParams.has('numTelefone')){
	numTelefone = urlParams.get('numTelefone');
}

var genre = '';
if(urlParams.has('genre')){
	genre = urlParams.get('genre');
}

var typePay = '';
if(urlParams.has('typePay')){
	typePay = urlParams.get('typePay');
}

var cardNumber = '';
if(urlParams.has('cardNumber')){
	cardNumber = urlParams.get('cardNumber');
}

var cardCVC = '';
if(urlParams.has('cardCVC')){
	cardCVC = urlParams.get('cardCVC');
}

var countryName = '';
if(urlParams.has('countryName')){
	countryName = urlParams.get('countryName');
}

var dateExpireCard = '';
if(urlParams.has('dateExpireCard')){
	dateExpireCard = urlParams.get('dateExpireCard');
}

if(firstName ==='' || lastName==='' || dateBrithday==='' || numTelefone==='' 
        || genre==='' || typePay==='' || cardNumber==='' || cardCVC===''){
    console.log('null');
}else{
	var pTagFirstName = document.createElement('p');
	pTagFirstName.innerHTML = 'Firstname: ' + firstName;
	divResult.appendChild(pTagFirstName);

	var pTagLastname = document.createElement('p');
	pTagLastname.innerHTML = 'Lastname: ' + lastName;
	divResult.appendChild(pTagLastname);

	var pTagDateBrith = document.createElement('p');
	pTagDateBrith.innerHTML = 'Date of Birth: ' + dateBrithday
	divResult.appendChild(pTagDateBrith);

	var pTagPhone = document.createElement('p');
	pTagPhone.innerHTML = 'Phone number: ' + numTelefone;
	divResult.appendChild(pTagPhone);

	var pTagKind = document.createElement('p');
	pTagKind.innerHTML = 'Kind: ' + genre;
	divResult.appendChild(pTagKind);

	var pTagCountry = document.createElement('p');
	pTagCountry.innerHTML = 'Country: ' + countryName;
	divResult.appendChild(pTagCountry);

	var pTagCardType = document.createElement('p');
	pTagCountry.innerHTML = 'Type Card: ' + typePay;
	divResult.appendChild(pTagCountry);

	var pTagDateExpire = document.createElement('p');
	pTagDateExpire.innerHTML = 'Expiration Card: ' + dateExpireCard;
	divResult.appendChild(pTagDateExpire);

	var aElementConfirm = document.createElement('a');
	aElementConfirm.setAttribute('href', 'index.html');
	aElementConfirm.innerHTML = 'Confirm';
	
	var divLink = document.createElement('div');
	divLink.classList.add('result-link');
	divLink.appendChild(aElementConfirm);

	divResult.appendChild(divLink);
}