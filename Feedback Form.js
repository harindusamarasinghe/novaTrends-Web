function validateForm() {
    var Comment = document.getElementById("Comment").value;
    var Name = document.forms["feedback form"]["Name"].value;
    var Comment = document.forms["feedback form"]["Comment"].value;
    var Phonenumber = document.forms["feedback form"]["Phone number"].value;
    var Email = document.forms["feedback form"]["Email"].value;
  
    if (Name == "") {
      alert("Name should be filled out!");
      return false;
    }

    if (Email == "") {
      alert("Email should be filled out!");
      return false;
    } else if (!validateEmail(Email)) {
      alert("Email is invalid!");
      return false;
    }

    if (Phonenumber != "" && !validatePhoneNumber(Phonenumber)) {
      alert("Phone number is invalid!");
      return false;
    }
  
    if (Comment == "") {
      alert("Comments should be filled");
      return false;
    }
  
    var radios = document.getElementsByName("Rating");
    for (var i = 0, len = radios.length; i < len; i++) {
      if (radios[i].checked) {
        var Rating = radios[i].value;
        alert("Dear " + Name + ", Thank You For Your Feedback! You have rated our site as " + Rating + " and your commment was " + Comment + ".");
        return true;
      }
    }
  
    alert("No rating is given!");
    return false;
  }
  
  function validateEmail(Email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(Email);
  }
  
  function validatePhoneNumber(Phonenumber) {
    var regex = /^\d{10}$/;
    return regex.test(Phonenumber);
  }