function setParametreUrl(){
    var url = new URL("http://localhost:8000/hotels.html");
    
    url.searchParams.append('city', document.getElementById('where').value);
    url.searchParams.append('dateCheckIn', document.getElementById('checkIn').value);
    url.searchParams.append('dateCheckout', document.getElementById('checkOut').value);
    url.searchParams.append('guess', document.getElementById('guess').value);
    location.replace(url);
}

document.getElementsByClassName('search')[0].addEventListener('click', setParametreUrl);
