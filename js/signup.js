/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";
document.addEventListener('DOMContentLoaded', function() {
    var signupForm = document.getElementById('signup');
    var stateList = signupForm.elements['state'];
    var idx;
    var option;
    var state;

    for(idx = 0; idx < usStates.length; ++idx) {
        option = document.createElement('option');
        state = usStates[idx];
        option.value = state.code;
        option.innerHTML = state.name;
        stateList.appendChild(option);
    }

    signupForm.addEventListener('change', function() {
        var occupy = signupForm.elements['occupation'];
        if(occupy.value == 'other') {
            var other = signupForm.elements['occupationOther'];
            other.style.display = 'block';
        }
    });

    var check = document.getElementById('cancelButton');

    check.addEventListener('click', function () {
        if(window.confirm('Are you sure you want to leave?')) {
           window.location = 'http://google.com';
        }
    });

    signupForm.addEventListener('submit', onSubmit);

});

function onSubmit(evt) {
    var valid = true;

    try {
        valid = validateForm(this);
    }
    catch(exception) {
        console.log(exception);
        valid = false;
    }
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    evt.returnValue = valid;
    return valid;
}//onSubmit

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var occupy = form.elements['occupation'];
    if(occupy.value == 'other') {
        requiredFields.push(['occupationOther']);
    }

    var idx;
    var valid = true;
    var zipRegExp = new RegExp('^\\d{5}$');
    for (idx = 0; idx < requiredFields.length; ++idx) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }

    var zipTest = form.elements['zip'];
    if(!zipRegExp.test(zipTest.value)) {
        valid = false;
        zipTest.className = 'form-control invalid';
    }

    var bday = form.elements['birthdate'];
    var years = moment().diff(bday.value, 'years');
    if(years < 13) {
        valid = false;
        bday.className = 'form-control invalid';
        var message = document.getElementById('birthdateMessage');
        message.innerHTML = 'You must be 13 years older to submit the form!';
    }

    return valid;
}

function validateRequiredField(field) {
    var  value = field.value;
    value = value.trim();
    var valid = value.length > 0;

    if(valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid';
    }
    return valid;
}
