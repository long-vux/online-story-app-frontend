import React from "react";
import { Logo } from "./Logo";
import google from "./google.png";
import group394 from "./group-394.png";
import image from "./image.svg";
import lock1 from "./lock-1.svg";
import profile from "./profile.svg";
import rectangle80 from "./rectangle-80.png";
import "./style.css";

export const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage-signin">
        <div className="overlap">
          <div className="group">
            <div className="overlap-2">
              <div className="rectangle" />

              <img className="img" alt="Group" src={group394} />

              <p className="welcome-back">
                <span className="text-wrapper-2">Welcome </span>

                <span className="text-wrapper-3">back</span>

                <span className="text-wrapper-2">!</span>
              </p>

              <p className="p">
                Discover manga, manhua and manhwa, track your progress, have
                fun, read manga.
              </p>

              <div className="overlap-group-wrapper">
                <div className="overlap-group-2">
                  <div className="rectangle-2" />

                  <div className="text-wrapper-4">Name</div>

                  <img
                    className="img-2"
                    alt="Iconsax bulk profile"
                    src={profile}
                  />

                  <div className="text-wrapper-5">Krowl Bell</div>
                </div>
              </div>

              <div className="overlap-wrapper">
                <div className="overlap-group-2">
                  <div className="rectangle-2" />

                  <div className="text-wrapper-4">Password</div>

                  <img className="img-2" alt="Iconsax bulk" src={lock1} />

                  <div className="text-wrapper-6">....................</div>
                </div>
              </div>

              <div className="div-wrapper">
                <div className="overlap-group-2">
                  <div className="rectangle-2" />

                  <div className="text-wrapper-4">Email</div>

                  <div className="text-wrapper-7">@</div>

                  <div className="text-wrapper-8">DragonballZ@Krowl.com</div>
                </div>
              </div>

              <div className="group-2">
                <div className="overlap-group-2">
                  <div className="rectangle-2" />

                  <div className="text-wrapper-4">Confirm password</div>

                  <img className="img-2" alt="Iconsax bulk" src={image} />

                  <div className="text-wrapper-6">....................</div>
                </div>
              </div>

              <div className="group-3">
                <p className="text-wrapper-9">Send notification to my email</p>

                <div className="rectangle-3" />
              </div>

              <div className="group-4">
                <div className="overlap-3">
                  <div className="rectangle-4" />

                  <div className="group-wrapper">
                    <div className="group-5">
                      <div className="group-6">
                        <div className="text-wrapper-10">
                          Sign in with Google
                        </div>

                        <img className="google" alt="Google" src={google} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="already-have-an">
              <span className="text-wrapper-11">Already have an account? </span>

              <span className="text-wrapper-12">Log in</span>
            </p>

            <p className="go-back-to-home-page">
              <span className="text-wrapper-11">Go back to </span>

              <span className="text-wrapper-12">home page</span>
            </p>
          </div>

          <Logo
            className="logo-instance"
            spanClassName="design-component-instance-node"
          />
        </div>

        <img className="rectangle-5" alt="Rectangle" src={rectangle80} />
      </div>
    </div>
  );
};
