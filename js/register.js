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
	function validateTextField (field, regex, message) {
		'use strict';

		if (regex.test(field.value.trim())) {
			removeErrorMessage(field.name);
		} else {
			addErrorMessage(field.name, message);
			error = true;
		} 
	}
	

	// Validate the first name:
	validateTextField(firstName, /^[a-z ,.'\-]{2,30}$/i, 'Please enter letters, commas, spaces and hyphens only.' );
	// Validate the last name:
	validateTextField(lastName, /^[a-z ,.'\-]{2,30}$/i, 'Please enter letters, commas, spaces and hyphens only.');
	// Validate the email address:
	validateTextField(email, /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/, 'Please enter a valid email address.');
	// Validate the phone number:
	validateTextField(phone, /\d{3}[ \-]?\d{3}[ \-]?\d{4}/, 'Please enter your phone number in the format XXX XXX XXX, XXX-XXX-XXXX or XXXXXXXXXX.');
	// Validate City:
	validateTextField(city, /^[a-z ,.'\-]{2,40}$/i, 'Please enter letters, commas, spaces, hyphens  and full-stops only.');
	// Validate the state:
	if (state.selectedIndex != 0) {
		removeErrorMessage('state');
	} else {
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
		validateTextField(zip, postCodeRegex(state.value), 'Please enter your post code starting with the correct digit and with exactly 4 digits.');
	} else {
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

// Function called when the terms checkbox changes.
// Function enables and disables the submit button.
function toggleSubmit() {
	'use strict';
    
	// Get a reference to the submit button:
	var submit = U.$('submit');
	
	// Toggle its disabled property:
	if (U.$('terms').checked) {
		submit.disabled = false;
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
	/* inputs.forEach(id => U.enableTooltips(id)); */
	es5: 
	inputs.forEach(function(id) {
		U.enableTooltips(id);
	});
	
    
};