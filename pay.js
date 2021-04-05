const urlParams = new URLSearchParams(window.location.search);

var idRooms = '';

if(urlParams.has('idRoom')){
    idRooms = urlParams.get('idRoom');
}

if(idRooms === ''){
    console.log('null');
}else{
    function pay(){
        var firstName = document.getElementById('fname').value;
        var lastName = document.getElementById('lname').value;
        var dateBrithday = document.getElementById('date').value;
        var numTelefone = document.getElementById('Numero').value;
        var select = document.getElementById('Country');
        var countryName = select.options[select.selectedIndex].text;

        var genre ='';

        if(document.getElementById('checkbox1').checked){
            genre = document.getElementById('checkbox1').value;
        }else if(document.getElementById('checkbox2').checked){
            genre = document.getElementById('checkbox2').value;
        }

        var typePay = '';

        if(document.getElementById('check1').checked){
            typePay = document.getElementById('check1').value;
        }else if(document.getElementById('check2').checked){
            typePay = document.getElementById('check1').value;
        }

        var cardNumber = document.getElementById('card-number').value;
        var cardCVC = document.getElementById('cardCVC').value;

        var selectMonth = document.getElementById('cart-date');

        var monthExpireCard = selectMonth.options[selectMonth.selectedIndex].value;

        var selectYear = document.getElementById('cart-year');

        var yearExpireCard = selectYear.options[selectYear.selectedIndex].value;

        var dateExpireCard = monthExpireCard + '/' + yearExpireCard; 

        if(firstName ==='' || lastName==='' || dateBrithday==='' || numTelefone==='' 
        || genre==='' || typePay==='' || cardNumber==='' || cardCVC===''){
            location.replace(urlParams);
        }else{
            var url = new URL("http://localhost:8000/resultPrenota.html");
    
            url.searchParams.append('firstName', firstName);
            url.searchParams.append('lastName', lastName);
            url.searchParams.append('dateBrithday', dateBrithday);
            url.searchParams.append('numTelefone', numTelefone);
            url.searchParams.append('genre', genre);
            url.searchParams.append('typePay', typePay);
            url.searchParams.append('cardNumber', cardNumber);
            url.searchParams.append('cardCVC', cardCVC);
            url.searchParams.append('countryName', countryName);
            url.searchParams.append('dateExpireCard', dateExpireCard);
            location.replace(url);
            console.log(dateExpireCard);
        }
    }

    document.getElementById('button').addEventListener('click', pay);
}