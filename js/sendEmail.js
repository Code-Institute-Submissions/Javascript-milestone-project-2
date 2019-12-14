function sendMail(contactForm) {
    emailjs.send("gmail","travelusa", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "query": contactForm.query.value
    })
    .then (
        function(response) {
            console.log("SUCCESS", response);   
        },
        function(error) {
            console.log("FAILED", error);
        })
}