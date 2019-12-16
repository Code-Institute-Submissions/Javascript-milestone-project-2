  // I learned how to do this from the lessons provided to us by the Code Institute. I struggled to make the form clear after it had beens submitted so the out of office tutors
  // provided some useful information from Stack Overflow. Details provided in readme.
  
  function sendMail(contactForm) {

      emailjs.init("user_a9Tx2qqs0p8VMBtOupmUT");

      emailjs.send("gmail", "travelusa", {
              "from_name": contactForm.name.value,
              "from_email": contactForm.email.value,
              "project_request": contactForm.description.value
          })
          .then(
              function(response) {
                  console.log("SUCCESS", response);
                  if (confirm('Successful Message')) {
                      window.location.reload();
                  }

              },

              function(error) {
                  console.log("FAILED", error);
              }
          );
      return false;
  }     