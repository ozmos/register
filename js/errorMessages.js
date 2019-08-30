// Script 10.1 - errorMessages.js
// This script defines functions for adding and removing error messages.

// This function adds the error message.
// It takes two arguments: the form element ID and the message.

function addErrorMessage(id, msg) {
   	'use strict';
    
    // Get the form element reference:
    var elem = document.getElementById(id);
    
    // Define the new span's ID value:
    var newId = id + 'Error';
    
    // Check for the existence of the span:
    var span = document.getElementById(newId);
    if (span) {
        span.firstChild.value = msg; // Update
    } else { // Create new.
    
        // Create the span:
        span = document.createElement('span');
        span.id = newId;
        //adding error class to span
       
		span.classList.add('error');
        span.appendChild(document.createTextNode(msg));
        
        // Add the span to the parent:
        elem.parentNode.appendChild(span);
        // adding error class to label
       
        elem.previousElementSibling.classList.add('error');

    } // End of main IF-ELSE.

} // End of addErrorMessage() function.

// This function removes the error message.
// It takes one argument: the form element ID.
function removeErrorMessage(id) {
   	'use strict';

    // Get a reference to the span:
    var span = document.getElementById(id + 'Error');
	if (span) {
    
	    // Remove the class from the label:
	    span.previousElementSibling.previousElementSibling.classList.remove('error');
        
	    // Remove the span:
	    span.parentNode.removeChild(span);
        
	} // End of IF.
    
} // End of removeErrorMessage() function.

function addSuccessMessage(id) { 
    'use strict';

    // Get the form element reference:
    var elem = document.getElementById(id);
    
    // Define the new span's ID value:
    var newId = id + 'Success';
    
    // Check for the existence of the span:
    var span = document.getElementById(newId);
    if (span) {
        span.firstChild.value = '\u2714'; // Update
    } else { // Create new.
    
        // Create the span:
        span = document.createElement('span');
        span.id = newId;
        // add success class
		span.classList.add('success');
        span.appendChild(document.createTextNode('\u2714'));
        
        // Add the span to the parent:
        elem.parentNode.appendChild(span);
        // add success class
       
        elem.previousElementSibling.classList.add('success');

    } // End of main IF-ELSE.
   
} //end of addSuccessMessage Function

function removeSuccessMessage (id) {
   
    'use strict';

    // Get a reference to the span:
    var span = document.getElementById(id + 'Success');
    if (span) {
    
        // Remove the class from the label:
        span.previousElementSibling.previousElementSibling.classList.remove('success');
        
        // Remove the span:
        span.parentNode.removeChild(span);
     
    } // End of IF.
    


} //end of removeSuccessMessage function