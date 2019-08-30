// Script 10.7- register.js
// This script validates a form.
// reusable validation function to keep code dry

// Function called when the form is submitted.
// Function validates the form data.
function validateForm(e) {
    'use strict';

    // Get the event object:
	if (typeof e == 'undefined') e = window.event;

		// Get form references:
	
	var firstName = U.$('firstName');
	var lastName = U.$('lastName');
	var email = U.$('email');
	var phone = U.$('phone');
	var city = U.$('city');
	var state = U.$('state');
	var zip = U.$('zip');
	var terms = U.$('terms');

	// Flag variable:
	var error = false;

	// re-useable validation function
	function validateTextField (field, regex) {
		'use strict';
		// trim leading/trailing white space before passing testing with regex
		if (regex.test(field.value.trim())) {
			removeErrorMessage(field.name);
			addSuccessMessage(field.name);
		} else {
			removeSuccessMessage(field.name);
			addErrorMessage(field.name, `Please enter your ${field.dataset.message}`);
			error = true;
		} 
		
	}
	

	// Validate the first name:
	validateTextField(firstName, /^[a-z ,.'\-]{2,30}$/i);
	// Validate the last name:
	validateTextField(lastName, /^[a-z ,.'\-]{2,30}$/i);
	// Validate the email address:
	validateTextField(email, /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/);
	// Validate the phone number:
	validateTextField(phone, /\d{3}[ \-]?\d{3}[ \-]?\d{4}/);
	// Validate City:
	validateTextField(city, /^[a-z ,.'\-]{2,40}$/i);
	// Validate the state:
	if (state.selectedIndex != 0) {
		removeErrorMessage('state');
		addSuccessMessage('state');
	} else {
		removeSuccessMessage('state');
		addErrorMessage('state', 'Please select your state.');
		error = true;
	}
	
	// Validate the zip code:
	// separate function to dynamically create regular expression that will target correct leading digit depending on state/territory
	function postCodeRegex (state) {
		'use strict';
		switch(state) {
			case 'WA' :
				var prefix = '6';
				break;
			case 'SA' :
				var prefix = '5';
				break;
			case 'VIC' :
				var prefix = '3|8'; //allows for PO box post code
				break;
			case 'TAS' :
				var prefix = '7';
				break;
			case 'NSW' :
				var prefix = '1|2'; //allows for PO box post code
				break;
			case 'QLD' :
				var prefix = '4|9'; //allows for PO box post code
				break;
			case 'ACT' :
			case 'NT' :
				var prefix = '0';
				break;
			default:
			var	prefix = '';
		}
		
		return new RegExp('^'+prefix+'\\d{3}$'); //special characters need to be double escaped using regex constructor see https://stackoverflow.com/questions/17863066/why-do-regex-constructors-need-to-be-double-escaped
	}
	// validates depending if state has been selected
	if (state.selectedIndex != 0) {
		removeErrorMessage('zip');
		validateTextField(zip, postCodeRegex(state.value));
	} else {
		removeSuccessMessage('zip');
		addErrorMessage('zip', 'Please select your state before you enter your post code');
		error = true;
	}
	

    // If an error occurred, prevent the default behavior:
	if (error) {

		// Prevent the form's submission:
	    if (e.preventDefault) {
	        e.preventDefault();
	    } else {
	        e.returnValue = false;
	    }
	    return false;
    
	}
    
} // End of validateForm() function.

// Function to get correct field name for error message 
function fieldName (id) {
	//check if id is camel cased
	var regex = /[A-Z]/;
	var splitPoint = /([A-Z])/g;
	if (regex.test(id)) {
		//split at uppercase see https://stackoverflow.com/questions/18379254/regex-to-split-camel-case
		return id.replace(splitPoint, ' $1').toLowerCase();
	} return id;
}
// Function to add or remove error messages when terms checkbox changes
function toggleErrors() {
	var inputs = Array.from(document.getElementsByClassName('field'));
	// toggle error class on any empty fields
	//check for any empty fields
	var emptyFields = inputs.filter(field => field.value === '');
	if (emptyFields.length > 0) error = true;
	// toggle error class on empty fields
	
	emptyFields.forEach(field => {
		!field.classList.contains('error') && field.classList.add('error');
		addErrorMessage(field.id, 'Please enter your ' + fieldName(field.name)); //TODO: use previousElementChild.innerHtml to get name value
	});
}
// Function called when the terms checkbox changes.
// Function enables and disables the submit button.
function toggleSubmit() {
	'use strict';
 
	// Get a reference to the submit button:
	var submit = U.$('submit');
	var checked = U.$('terms').checked;
	
	// Toggle its disabled property:
	if (checked) {
		submit.disabled = false;
		validateForm();
	} else {
		submit.disabled = true;
	
	}
	
} // End of toggleSubmit() function.



// Establish functionality on window load:
window.onload = function() {
    'use strict';

	// The validateForm() function handles the form:
    U.addEvent(U.$('theForm'), 'submit', validateForm);

	// Disable the submit button to start:
	U.$('submit').disabled = true;

	// Watch for changes on the terms checkbox:
    U.addEvent(U.$('terms'), 'change', toggleSubmit);

	// Enbable tooltips on all input elements:
	var inputs = ['firstName', 'lastName', 'phone', 'email', 'city', 'state', 'zip'];
	
	inputs.forEach(function(id) {
		U.enableTooltips(id);
	});
	
    
}