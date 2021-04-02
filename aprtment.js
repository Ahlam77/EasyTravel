fetch("https://mashvisor-api.p.rapidapi.com/rental-rates?state=CA&source=airbnb&city=Los%20Angeles&zip_code=90291", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "0cf4e201bcmshb5d5d815aa7c0cep1c1067jsnb1ef63b183d1",
		"x-rapidapi-host": "mashvisor-api.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});