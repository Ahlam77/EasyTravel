function setParametreUrl(){
    var url = new URL("http://hotels.html");

    url.searchParams.append('city', document.getElementById('where').value);

    url.searchParams.append('checkIn', document.getElementById('checkin').value);

    url.searchParams.append('checkOut', document.getElementById('checkout').value);

    url.searchParams.append('numberOfPlace', document.getElementById('guess').value);
    console.log(url)
}

document.getElementById('search').addEventListener('click', setParametreUrl);
