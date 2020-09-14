function validateForm(event, state) {
  const inputs = document.getElementsByClassName("required");
  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].classList.contains("error")) {
      inputs[i].classList.remove("is-danger");
    }
  }

  if (state.hasOwnProperty("username") && state.username === "") {
    document.getElementById("username").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("firstname") && state.firstname === "") {
    document.getElementById("firstname").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("lastname") && state.lastname === "") {
    document.getElementById("lastname").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("email") && state.email === "") {
    document.getElementById("email").classList.add("is-danger");
    return { blankfield: true };
  }
  if (
    state.hasOwnProperty("verificationcode") &&
    state.verificationcode === ""
  ) {
    document.getElementById("verificationcode").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("password") && state.password === "") {
    document.getElementById("password").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("oldpassword") && state.oldpassword === "") {
    document.getElementById("oldpassword").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("newpassword") && state.newpassword === "") {
    document.getElementById("newpassword").classList.add("is-danger");
    return { blankfield: true };
  }
  if (state.hasOwnProperty("confirmpassword") && state.confirmpassword === "") {
    document.getElementById("confirmpassword").classList.add("is-danger");
    return { blankfield: true };
  }
  if (
    state.hasOwnProperty("password") &&
    state.hasOwnProperty("confirmpassword") &&
    state.password !== state.confirmpassword
  ) {
    document.getElementById("password").classList.add("is-danger");
    document.getElementById("confirmpassword").classList.add("is-danger");
    return { passwordmatch: true };
  }
  if (
    state.hasOwnProperty("newpassword") &&
    state.hasOwnProperty("confirmpassword") &&
    state.newpassword !== state.confirmpassword
  ) {
    document.getElementById("newpassword").classList.add("is-danger");
    document.getElementById("confirmpassword").classList.add("is-danger");
    return { passwordmatch: true };
  }
  return;
}

function validateSignUp() {
  let errMsg = validateRequiredControls();
  if (errMsg === "") {
    const email = document.getElementById("email");
    errMsg = validateEmail(email.value);
    if(errMsg !== "") {
      removeOrAddValidationClasses(true, email, errMsg);
    } else {
      removeOrAddValidationClasses(false, email);
    }
  }
  if (errMsg === "") {
    const password = document.getElementById("password");
    errMsg = validatePassword(password.value);
    if(errMsg !== "") {
      removeOrAddValidationClasses(true, password, errMsg);
    }
  }
  return errMsg;
}

function validateLogin() {
  let errMsg = validateRequiredControls();
  if (errMsg === "") {
    const email = document.getElementById("username");
    errMsg = validateEmailLogin(email.value);
    if(errMsg !== "") {
      removeOrAddValidationClasses(true, email, errMsg);
    } else {
      removeOrAddValidationClasses(false, email);
    }
  }
  if (errMsg === "") {
    const password = document.getElementById("password");
    errMsg = validatePassword(password.value);
    if(errMsg !== "") {
      removeOrAddValidationClasses(true, password, errMsg);
    } 
  }
  return errMsg;
}

function validateRequiredControls() {
  let errorMessage = "";
  const inputs = document.getElementsByClassName("required");
  for (let i = 0; i < inputs.length; i++) {
    const element = document.getElementById(inputs[i].id);
    if(inputs[i].type !== "checkbox") {
      if (inputs[i].value.trim() === "") {
        errorMessage = "Required field";
        removeOrAddValidationClasses(true, element, errorMessage);
      } else {
        removeOrAddValidationClasses(false, element);
      }
    }
  }
  return errorMessage;

}

function validateEmail(email) {
  let errorEmail = "";
  if(email.trim() === "") {
    errorEmail = "Please enter your email address";
} else {
    let regex = new RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);

    if(regex.test(email) === false) {
      errorEmail = "Please enter a valid email address";
    }
  }
  return errorEmail;
}

function validateEmailLogin(email) {
  let errorEmail = "";
  if(email.trim() === "") {
    errorEmail = "Please enter your email address";
  } else if (email.trim() && email.indexOf(' ') !== -1){
      errorEmail = "space is not allowed in username";
  }
  return errorEmail;
}

function validatePassword(password) {
  let errorPassword = "";
  if(password.trim() === "") {
    errorPassword = "Please enter your password";
} else {
    var regex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/);
    if(regex.test(password) === false) {
      errorPassword = "Must contains atleast one number and uppercase letter";
    }
  }
  return errorPassword;
}

function removeOrAddValidationClasses(isError, element, errMsg) {
  removeErrorClass(element);
  let parentElement = element.parentElement;
  if(isError) {
    parentElement.classList.add("error-validate");
    if(parentElement.getElementsByClassName('fa-times-circle')[0]){
      parentElement.getElementsByClassName('fa-times-circle')[0].classList.remove('d-none');
    }
    if(parentElement.getElementsByClassName('errMessage')[0]){
      parentElement.getElementsByClassName('errMessage')[0].classList.add('error-validate-msg');
      parentElement.getElementsByClassName('errMessage')[0].innerHTML = errMsg;
    }
  } else {
    parentElement.classList.add("success-validate");
    if(parentElement.getElementsByClassName('fa-check-circle')[0]){
      parentElement.getElementsByClassName('fa-check-circle')[0].classList.remove('d-none');
    }
  }
}

function removeErrorClass(element) {
  let parentElement = element.parentElement;
  parentElement.classList.remove("error-validate");
  parentElement.classList.remove("success-validate");
  if (parentElement.getElementsByClassName('fa-times-circle')[0]) {
    parentElement.getElementsByClassName('fa-times-circle')[0].classList.add('d-none');
  }
  if (parentElement.getElementsByClassName('fa-check-circle')[0]) {
    parentElement.getElementsByClassName('fa-check-circle')[0].classList.add('d-none');
  }
  if (parentElement.getElementsByClassName('errMessage')[0]) {
    parentElement.getElementsByClassName('errMessage')[0].classList.remove('error-validate-msg');
    parentElement.getElementsByClassName('errMessage')[0].innerHTML = "";
  }
}


exports.validateSignUp = validateSignUp;
exports.validateLogin = validateLogin;
exports.validateForm = validateForm;