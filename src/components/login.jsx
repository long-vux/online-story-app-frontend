import React from "react";
// import { Logo } from "./Logo";
// import google from "./google.png";
// import lock1 from "./lock-1.svg";
// Either uncomment the imports
import rectangle80 from "../assets/Rectangle 80.png";

// Or remove/comment out the image elements
{/* <img className="img" alt="Rectangle" src={rectangle80} /> */}
import "./login_style.css";

export const HomepageLogin = () => {
  return (
    <div className="homepage-login">
      <div className="div-2">
        <div className="overlap">
          <div className="group">
            <div className="overlap-2">
              <div className="overlap-group-wrapper">
                <div className="div-wrapper">
                  <div className="text-wrapper-2">Log in</div>
                </div>
              </div>

              <p className="welcome-back">
                <span className="text-wrapper-3">Welcome </span>

                <span className="text-wrapper-4">back</span>

                <span className="text-wrapper-3">!</span>
              </p>

              <p className="p">
                Discover manga, manhua and manhwa, track your progress, have
                fun, read manga.
              </p>

              <div className="overlap-wrapper">
                <div className="overlap-3">
                  <div className="text-wrapper-5">Email</div>

                  <div className="text-wrapper-6">@</div>
                </div>
              </div>

              <div className="group-2">
                <div className="overlap-4">
                  <div className="text-wrapper-5">Password</div>

                  <img
                    className="iconsax-bulk"
                    alt="Iconsax bulk"
                    // src={lock1}
                  />
                </div>
              </div>

              <p className="don-t-have-an">
                <span className="text-wrapper-7">Don’t have an account? </span>

                <span className="text-wrapper-8">Sign up</span>
              </p>

              <p className="go-back-to-home-page">
                <span className="text-wrapper-7">Go back to </span>

                <span className="text-wrapper-8">home page</span>
              </p>

              <div className="group-3">
                <div className="text-wrapper-9">Remember me</div>

                <div className="rectangle" />
              </div>

              <div className="text-wrapper-10">Recovery password</div>

              <div className="group-4">
                <div className="overlap-5">
                  <div className="rectangle-2" />

                  <div className="group-wrapper">
                    <div className="group-5">
                      <div className="group-6">
                        <div className="text-wrapper-11">
                          Log in with Google
                        </div>

                        {/* <img className="google" alt="Google" src={google} /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Logo
            className="logo-instance"
            spanClassName="design-component-instance-node"
          /> */}
        </div>

        <img className="img" alt="Rectangle" src={rectangle80} />
      </div>
    </div>
  );
};
