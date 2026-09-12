import React from 'react'

function Login() {
  return (
    <div className='main-container'>
        <div className='content-wrapper'>
            <h1>Create Your Account</h1>
            <p>Note that phone verification may be required for signup. Your number will only be used to verify your identitfy for security puporses.</p>

            <form action="">
                <input type="text" name="" id="" /><br />
                <input type="email" name="" id="" /><br />
                <input type="password" name="" id="" /><br />
                <button>Continue</button>
            </form>

            <p>Already have an account? <a href="">Log in</a></p>
        </div>
    </div>
  )
}

export default Login