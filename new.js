
// selcting background colour
function bgcolour()
{
    //change background colour
	let selColor = document.getElementById("bgclr").value;

		switch(selColor)
		 {
			case "Chocolate":

				
				document.body.style.backgroundColor = "#4A051C";
				break;
			case "green":
				document.body.style.backgroundColor = "#0B5345";
				break;

			case "purple":
				document.body.style.backgroundColor = "#210124";
				break;
	
			case "blue":
				document.body.style.backgroundColor = "#0B4F6C";
				break;
			
			case "Aquamarine":
				document.body.style.backgroundColor = "#7AE7C7 ";
				break;

			default:
				document.body.style.backgroundColor = "black";
			}
};

//selecting text size
function textsize11()
{
	// change text size
    var elements = document.getElementsByClassName("textslide");

    for(var i = 0; i < elements.length; i++) {
        var names = elements[i];
        let setSize = document.getElementById("textsize").value;
    // let text = document.getElementById("textslide");

	    switch(setSize)
	    {
		    case "small":

		        names.style.fontSize = "small"
			    break;

		    case "large":
			    names.style.fontSize = "large"
			    break;
	
		    default:
                names.style.fontSize = "medium"
		}
		
}

	
};


