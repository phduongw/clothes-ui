const messages = {
  home: {
    phones: 'Phones',
    smartsWatches: 'Smart Watches',
    cameras: 'Cameras',
    headPhone: 'Headphones',
    nav: {
      home: 'Home',
      about: 'About',
      contactUs: 'Contact Us',
      blog: 'Blog',
      search: "Search"
    },
    register: {
      title: 'Register',
      fullName: 'Full Name',
      email: 'Email',
      dob: 'Date of Birth',
      gender: 'Gender',
      genderMale: 'Male',
      genderFemale: 'Female',
      phoneNumber: 'Phone Number',
      password: 'Password',
      repeatPassword: 'Repeat Password',
      login: 'Login with existing account'
    },
    login: {
      title: 'Login',
      email: 'Email',
      password: 'Password',
      register: 'Is this your first time? Sign up for an account right here!'
    },
    product: {
      buyBtn: 'Buy now',
      newArrival: 'New Arrival',
      bestSeller: 'Best Seller',
      featured: 'Featured Products',
    },
    title: 'Welcome to Clothes World',
    content: 'Choose Everything you want',
    auth: {
      login: "Login",
      register: "Register"
    },
  },
  msg: {
    requiredInput: {
      auth: {
        fullName: "Please enter your full name",
        emailInvalid: "This is not a valid email address",
        emailIsEmpty: "Please enter your email address",
        passwordIsEmpty: "Please, enter your password",
        passwordShort: "Password must be at least 8 characters",
        repeatPassword: "Please, enter repeat password",
        repeatPasswordNotMatch: "Repeat Password is not match with password",
        gender: "Please select your gender",
        dob: "Please select your Date of Birth",
        phoneNumber: "Please enter your phone number",
      }
    },
    error: {
      'CW-01-001': 'Email already exists',
      'CW-10-001': 'Server error, please contact with administrator',
    }
  },
  about: {
    content: 'This is a simple introduce'
  }
}

export default messages;