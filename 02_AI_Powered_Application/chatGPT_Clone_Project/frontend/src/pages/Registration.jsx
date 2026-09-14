import React from "react";
import style from './login.module.css'
function Registration() {
  return (
    <div className={style.mainContainer}>
      <div className={style.contentWrapper}>
        <h1 className={style.h1}>Create Your Account</h1>
        <p className={style.p1}>
          Note that phone verification may be required for signup. Your number
          will only be used to verify your identitfy for security puporses.
        </p>

        <form>
          <input type="text" name="" id="" placeholder="Your Name" />
          <br />
          <input type="email" name="" id="" placeholder="Email Address" />
          <br />
          <input type="password" name="" id="" placeholder="password" />
          <br />
          <button>Continue</button>
        </form>

        <p className={style.p2}>
          Already have an account? <a href="">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Registration;
