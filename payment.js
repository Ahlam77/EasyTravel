
document.querySelector("button").addEventListener('click', myFunction());
 
function myFunction(){
    var fname = document.getElementById("fname").value;
    document.getElementById("response").innerText = fname;
}