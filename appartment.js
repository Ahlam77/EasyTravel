function addAppartement(){
    const user ={
        "firstName": document.getElementById('first-name').value, 
        "lastName": document.getElementById('last-name').value,
        "phoneNumber": document.getElementById('tel').value,
        "countryName": document.getElementById('country').value,
        "cityName": document.getElementById('city').value,
        "emailAddress": document.getElementById('email').value,
        "logitude": document.getElementById('longitude').value,
        "latitude": document.getElementById('latitude').value
    };

    var json = JSON.stringify(user);

    fetch('http://localhost:3000/users',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json
    })
    .then(data => console.log(data));
}

document.getElementById('btn-save').addEventListener('click', addAppartement);

fetch('http://localhost:3000/users')
 .then(response => (response.json()))
 .then(data => {
     data.forEach(element => {
         console.log(element.firstName);
         console.log(element.countryName)
     });
 });

/*fetch('http://localhost:3000/users', {
    method: 'DELETE',
   })
    .then(response => console.log(response))*/

/**
 * const user = { "id": 3, "name": "Doe", "age": 26 };
var json = JSON.stringify(user)

// create a user
fetch('http://localhost:3000/users', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: json
})
 */