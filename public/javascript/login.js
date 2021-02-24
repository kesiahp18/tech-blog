document.querySelector('#login').classList.add('hide');

async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password && password.length > 7) {
        document.getElementById("signup-form").reset();
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
            username,
            email,
            password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        //check response status
        if(response.ok) {
            console.log('sucess');
        } else {
            alert(response.statusText);
        }
    } 
    else if (username && email && password && password.length < 8) {
        document.getElementById('signup-alert').innerHTML = 'Your password must have at least 8 characters';
    } else {
        document.getElementById('signup-alert').innerHTML = 'All fields are required';
    }
}

async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
        document.getElementById("login-form").reset();
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
            email,
            password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        //check response status
        if(response.ok) {
            document.location.replace('/');
        } else {
            console.log(response.statusText);
            document.getElementById('login-alert').innerHTML = 'Login attempt failed';
        }
    } else {
        document.getElementById('login-alert').innerHTML = 'All fields are required';
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);