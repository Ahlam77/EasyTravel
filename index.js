fetch("https://noodlio-pay.p.rapidapi.com/tokens/create", {
	"method": "POST",
	"headers": {
		"content-type": "application/x-www-form-urlencoded",
		"x-rapidapi-key": "0cf4e201bcmshb5d5d815aa7c0cep1c1067jsnb1ef63b183d1",
		"x-rapidapi-host": "noodlio-pay.p.rapidapi.com"
	},
	"body": {
		"number": "4242424242424242",
		"cvc": "123",
		"exp_month": "08",
		"exp_year": "2020"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});