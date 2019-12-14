    
function sendMail(contactForm)
{
    
emailjs.init("user_a9Tx2qqs0p8VMBtOupmUT");
 
  emailjs.send("gmail","travelusa", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.query.value
    })
    .then (
        function(response) {
            console.log("SUCCESS", response);   
        },
       
            function(error) {
                console.log("FAILED", error);
            }
        );
    return false; 
}