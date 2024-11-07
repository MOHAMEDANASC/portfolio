var nameError = document.getElementById('name-error');
var emailError = document.getElementById('email-error');
var phoneError = document.getElementById('phone-error');
var subjectError = document.getElementById('subject-error');
var messageError = document.getElementById('message-error');
var submitError = document.getElementById('submit-error');
var form = document.getElementById('gform');


function validateName() {
    var name = document.getElementById('contact-name').value;
    
    if (name.length == 0) {
        nameError.innerHTML = 'Name is required';
        return false;
    }
    
    // Updated regular expression to allow a first and last name separated by a single space
    if (!name.match(/^[A-Za-z]+ [A-Za-z]+$/)) {
        // if(!name.match(/^[A-Za-z]\s{1}[A-Za-z]\s{1}[A-Za-z]*$/)){
        nameError.innerHTML = 'Write your full name';
        return false;
    }
    
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    setTimeout(() => {
        nameError.innerHTML = '';
    }, 3000);
    return true;
}

function validateMail(){
    var email = document.getElementById('contact-mail').value;
    if(email.length == 0){
        emailError.innerHTML = 'Email is required';
        return false;
    }

    if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        emailError.innerHTML = 'Email Invalid';
        return false;
    }
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    setTimeout(() => {
        emailError.innerHTML = '';
    }, 3000);
    return true;
}

function validatePhone(){
    var phone = document.getElementById('contact-phone').value;
    if(phone.length == 0){
        phoneError.innerHTML = 'Phone no is required';
        return false;
    }
    if(phone.length !== 10){
        phoneError.innerHTML = 'Phone no should be in the given format';
        return false;
    }
    if(!phone.match(/^[0-9]{10}$/)){
        phoneError.innerHTML = 'Only in format';
        return false;
    }
    phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    setTimeout(() => {
        phoneError.innerHTML = '';
    }, 3000);
    return true;
}
function validateSubject(){
    var subject = document.getElementById('contact-subject').value;
    var required = 15;
    var left = required - subject.length;
    if(left > 0){
        subjectError.innerHTML = left + ' more characters required';
        return false;
    }
    
    subjectError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    setTimeout(() => {
        subjectError.innerHTML = '';
    }, 3000);
    return true;
}
function validateMessage(){
    var message = document.getElementById('contact-message')?.value;
    console.log(message,'message')
    var require = 30;
    var left = require - message.length;
    if(left > 0){
        messageError.innerHTML = left + ' more characters required';
        return false;
    }
    messageError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    setTimeout(() => {
        messageError.innerHTML = '';
    }, 1000);
    return true;
}

function validateForm(){
    if(!validateName() || !validateMail() || !validatePhone() || !validateSubject() || !validateMessage()){
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please fix error to submit';
        setTimeout(function(){submitError.style.display = 'none';}, 3000);
        return false;
    }
    return true;
}

form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const submitButton = document.getElementById('submit_btn');
    
    if(!validateName() || !validateMail() || !validatePhone() || !validateSubject() || !validateMessage()){
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please fix error to submit';
        setTimeout(function(){submitError.style.display = 'none';}, 3000);
        
        return false;
    }

const formData = {
    access_key: 'ee67c7d9-089a-480a-a8f1-248ac9d66525',
    name: document.getElementById("contact-name").value,
    email: document.getElementById("contact-mail").value,
    phone: document.getElementById("contact-phone").value,
    subject: document.getElementById("contact-subject").value,
    message: document.getElementById("contact-message").value,
};

try {
    // Send POST request using Fetch API
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const result = await response.json();
        alert("Message sent successfully!");
        // document.getElementById("gform").reset();
       
         // Reset form on success
        submitError.innerHTML = '';
        submitButton.disabled = true;
        submitButton.innerText = "Submitted";

        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerText = "Submit"; // Reset button text
            form.reset(); // Clear form fields
        }, 3000);
    } else {
        throw new Error("Failed to send message");
    }
} catch (error) {
    submitError.style.display = 'block';
    submitError.innerHTML = 'There was an error sending the message. Please try again later.';
    console.error("Error:", error);
}

    return true;
})