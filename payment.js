
var client_id = 'mGGYQayW5TYAwlFfFLpRVvtpimIL94cY';
var client_secret = 'Ef1CzL2vsiygVqBb';

var urlencoded = new URLSearchParams();
urlencoded.append("client_id", client_id);
urlencoded.append("client_secret", client_secret);
urlencoded.append("grant_type", "client_credentials");

const urlParams = new URLSearchParams(window.location.search);

var idRooms = '';

if(urlParams.has('idRoom')){
    idRooms = urlParams.get('idRoom');
    console.log(idRooms)
}

if(idRooms === ''){
    console.log('null');
}else{
    var fullName = document.getElementById('fname').value;
    var nickName = document.getElementById('lname').value;
    var date = document.getElementById('date').value;
    var number = document.getElementById('Numero').value;
    /*var month = document.getElementById('month').value;
    var year = document.getElementById('year').value;*/

    var dateOfBrith = date;

    var genre ='';
    if(document.getElementById('checkbox1').checked == true){
        genre = document.getElementById('male').innerText = 'Male'
    }else if(document.getElementById('checkbox2').checked == true){
        genre = document.getElementById('female').innerText= 'Female';
    }

    var paymentMethod= '';
    if(document.getElementById('check1').checked == true){
        paymentMethod = document.getElementById('check1').innerText = 'MasterCard';
    }else if(document.getElementById('check2').checked == true){
        paymentMethod = document.getElementById('check2').innerText = 'Pay-pal';
    }

    var cartInfo = document.querySelectorAll('#card-info').value;
    /*var cartNumber = document.getElementById('cart-number').value;

    var cardCVC = document.getElementById('card-CVC');*/

    /*var monthEspire = document.getElementById('monthExpire').selected;
    var yearExpire = document.getElementById('yearExpire').selected;
    var dateExpire = monthEspire +'/' + yearExpire;*/
    var array =  Array.from(document.querySelectorAll('#container input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {
    })
    function getPay(){
        if(array === ''){
            console.log('null');
        }else{
            var url = new URL("http://localhost:8000/resultPrenota.html");
            console.log(url);

            url.searchParams.append('fname', fullName);
            url.searchParams.append('lname', nickName);
            url.searchParams.append('date', dateOfBrith);
            url.searchParams.append('genre', genre);
            url.searchParams.append('paymentMethod', paymentMethod);
            url.searchParams.append('cardNumber', cartInfo);
            location.replace(url);

        }

    }

    document.getElementById('button').addEventListener('click', getPay);
}