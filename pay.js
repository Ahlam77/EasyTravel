var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

const urlParams = new URLSearchParams(window.location.search);

var idRooms = '';

if(urlParams.has('idRoom')){
    idRooms = urlParams.get('idRoom');
}

if(idRooms === ''){
    console.log('null');
}else{
    var fullName = document.getElementById('full-name').value;
    var nickName = document.getElementById('nick-name').value;
    var email = document.getElementById('email').value;
    var day = document.getElementById('day').value;
    var month = document.getElementById('month').value;
    var year = document.getElementById('year').value;

    var dateOfBrith = day + '-' + month + '-' + year;

    var genre ='';
    if(document.getElementById('gendar-mal').checked){
        genre = document.getElementById('gendar-mal').value
    }else if(document.getElementById('gendar-femel').checked){
        genre = document.getElementById('gendar-femel').value;
    }

    var paymentMethod= '';
    if(document.getElementById('pay-cart').checked){
        paymentMethod = document.getElementById('pay-cart').value;
    }else if(document.getElementById('pay-pal').checked){
        paymentMethod = document.getElementById('pay-pal').value;
    }

    var cartNumber = document.getElementById('cart-number').value;

    var cardCVC = document.getElementById('card-CVC');

    /*var monthEspire = document.getElementById('monthExpire').selected;
    var yearExpire = document.getElementById('yearExpire').selected;
    var dateExpire = monthEspire +'/' + yearExpire;*/

    function getPay(){
        if(fullName === ''){
            console.log('null');
        }else{
            var url = new URL("http://localhost:8000/resultPrenota.html");
            console.log(url);

            url.searchParams.append('fullName', fullName);
            /*url.searchParams.append('nickName', nickName);
            url.searchParams.append('email', email);
            url.searchParams.append('dateOfBrith', dateOfBrith);
            url.searchParams.append('genre', genre);
            url.searchParams.append('paymentMethod', paymentMethod);
            url.searchParams.append('cardNumber', cartNumber);*/
            location.replace(url);
        }

    }

    document.getElementById('valid').addEventListener('click', getPay);
}