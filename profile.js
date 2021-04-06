 

     
   
        document.getElementById("button").addEventListener("click", te1 )
        function te1() {
            var p1 =document.getElementById('p1');
             p1.innerHTML = `
             I am a person who loves success, loves challenges, and I have a love <br>
             for programming,and that is what  pushed me to take on the PowerCoders<br>
             challengeI am  a person who loves success, loves challenges,and I have<br>
             a love for programming,and that is what pushed me to take on the PowerCoders<br>
             challengeI am a person who loves success, loves challenges,and I have a love<br>
             for programming, and that is what pushed me to take on the PowerCoders challenge<br>
             <br>
                  <strong>THANK YOU POWERCODERS</strong>
            
             
            
             `;
           
            
         }
         
           
        
         
        
           
           
         


       
        function te2() {
            var p2 =document.getElementById('p2');
             p2.innerHTML = `I am a person who loves success, loves challenges, and I have a love <br>
             for programming,and that is what  pushed me to take on the PowerCoders<br>
             challengeI am  a person who loves success, loves challenges,and I have<br>
             a love for programming,and that is what pushed me to take on the PowerCoders<br>
             challengeI am a person who loves success, loves challenges,and I have a love<br>
             for programming, and that is what pushed me to take on the PowerCoders challenge<br>
             <br>
                  <strong>THANK YOU POWERCODERS</strong>
             `;
         }
         
         document.getElementById("button2").addEventListener("click", te2 )



         function te3() {
            var p3 =document.getElementById('p3');
             p3.innerHTML = `I am a person who loves success, loves challenges, and I have a love <br>
             for programming,and that is what  pushed me to take on the PowerCoders<br>
             challengeI am  a person who loves success, loves challenges,and I have<br>
             a love for programming,and that is what pushed me to take on the PowerCoders<br>
             challengeI am a person who loves success, loves challenges,and I have a love<br>
             for programming, and that is what pushed me to take on the PowerCoders challenge<br>
             <br>
                  <strong>THANK YOU POWERCODERS</strong>
             `;
         }
         document.getElementById("button3").addEventListener("click", te3 )
      


         function te4() {
            var p4 =document.getElementById('p4');
             p4.innerHTML = `I am a person who loves success, loves challenges, and I have a love <br>
             for programming,and that is what  pushed me to take on the PowerCoders<br>
             challengeI am  a person who loves success, loves challenges,and I have<br>
             a love for programming,and that is what pushed me to take on the PowerCoders<br>
             challengeI am a person who loves success, loves challenges,and I have a love<br>
             for programming, and that is what pushed me to take on the PowerCoders challenge<br>
             <br>
                  <strong>THANK YOU POWERCODERS</strong>
             `;
         }
         document.getElementById("button4").addEventListener("click", te4 )

 

         function te5() {
            var p5 =document.getElementById('p5');
             p5.innerHTML = `I am a person who loves success, loves challenges, and I have a love <br>
             for programming,and that is what  pushed me to take on the PowerCoders<br>
             challengeI am  a person who loves success, loves challenges,and I have<br>
             a love for programming,and that is what pushed me to take on the PowerCoders<br>
             challengeI am a person who loves success, loves challenges,and I have a love<br>
             for programming, and that is what pushed me to take on the PowerCoders challenge<br>
             <br>
                  <strong>THANK YOU POWERCODERS</strong>
             `;
         }
         document.getElementById("button5").addEventListener("click", te5 )


                
            var slideIndex = 1;
showSlides(slideIndex);


function plusSlides(n) {
  showSlides(slideIndex += n);
}


function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
 
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
 
  slides[slideIndex-1].style.display = "block";
  
}

             