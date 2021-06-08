// Replace with provided config from Firebase
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const form1 = document.getElementById('form-1')
const form2 = document.getElementById('form-2')
const signIn = document.getElementById('sign-in-form')
const submitBtn = document.getElementById('submit-btn')
const loginBtn = document.getElementById('login-btn')
const logoutBtn = document.getElementById('logout-btn')

submitBtn.addEventListener('click', createAccount)
loginBtn.addEventListener('click', signInToAccount)
logoutBtn.addEventListener('click', logoutOfAccount)

// Get current state
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.clear()
    console.log('State changed')
  } else {
    console.log('No one is logged in')
  }
})

//
//  Functions
//

function logoutOfAccount(e) {
  e.preventDefault()

  firebase.auth().signOut()
  document.querySelector('.login-message').textContent = ''
  logoutBtn.style.display = 'none'
  form1.style.display = 'block'
  form2.style.display = 'block'
}

function createAccount(e) {
  e.preventDefault()

  const form = document.getElementById('account-creation-form')
  const email = document.getElementById('email')
  const password = document.getElementById('pwd')

  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(() => {
      alert('Account created successfully')
      form.reset()      
    })
    .catch(err => {
      switch (err.code) {
        case 'auth/email-already-in-use':
          alert(err.message)
          break;
        case 'auth/invalid-email':
          alert(err.message)
          break;
        case 'auth/weak-password':
          alert(err.message)
          break;
        default:
          console.log(err.message)
          break;
      }
    })
}

function signInToAccount(e) {
  e.preventDefault()

  const loginEmail = document.getElementById('email-in')
  const loginPassword = document.getElementById('pwd-in')

  firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
    .then(() => {
      logoutBtn.style.display = 'block'
      form1.style.display = 'none'
      form2.style.display = 'none'

      if (document.querySelector('.login-message') === null) {
        generateLoginMessage()
      } else {
        // Appends to login-message div element when user logs in again
        // Do not use generateLoginMessage() because more div elements will be created instead of reusing the initial one
        document.querySelector('.login-message').innerHTML = `<h3 class="text-xl text-purple-600 font-semibold">Signed in successfully</h3>`
      }
      signIn.reset()
    })
    .catch(err => {
      switch (err.code) {
        case 'auth/invalid-email':
          alert(err.message)
          break;
        case 'auth/user-disabled':
          alert(err.message)
          break;
        case 'auth/user-not-found':
          alert(err.message)
          break;
        case 'auth/wrong-password':
          alert(err.message)
          break;
        default:
          alert(err.message)
          break;
      }
    })
}

function generateLoginMessage() {
  const newElement = document.createElement('div')
  newElement.className = 'login-message'
  newElement.innerHTML = `
    <h3 class="text-xl text-purple-600 font-semibold">You have signed in successfully</h3>
  `
  document.querySelector('.info').insertAdjacentElement('beforebegin', newElement)
}