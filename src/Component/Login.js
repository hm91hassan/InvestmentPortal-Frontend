import React, { useEffect, useState, useRef } from "react";
import Footer from "../Sheard/Footer";
import LoginTopHeader from "../Sheard/LoginTopHeader";
import Menu from "../Sheard/Menu";
import { useNavigate } from "react-router-dom";
import { Base64 } from "js-base64";
import axios from "axios";
import { AppState } from "../context/Context";

// All Extranal images
import img1 from "../images/img1.svg";
import img2 from "../images/img2.svg";
import img3 from "../images/img3.svg";

// Styling Extranal css
import "./registration.css";
import classes from "./login.module.css";

const Login = () => {
  const registration = useNavigate();
  const twofactorauth = useNavigate();
  const alertmsgstyle = useRef();
  const homepage = useNavigate();
  const [loginpage, setLoginPage] = useState(true);
  const [userdata, setUserData] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [resetemail, setResetEmail] = useState();
  const [alertmsg, setAlertmsg] = useState();
  const [errormsg, setErrorMsg] = useState();



  const userAllData = () => {
    //Get Record - Detail View
    axios
      .get("/getrecord")
      .then(function (data) {
        console.log("Response Successfully.");

        setUserData(data.data.data);

      }).catch(function (error) {
        console.log(error);
        if (error.message === "Network Error") {
          setAlertmsg("Please check your internet connection.")
        }
      })
  };

  //console.log(email);

  const userLogin = () => {
    if (userdata) {
      if (!email || !password) {
        setAlertmsg("Please fill the all fields");
      }
      if (email && password) {

        for (let i = 0; i < userdata.length; i++) {
          const DecodePass = Base64.decode(userdata[i]?.Password);

          if (userdata[i]?.Email === email && DecodePass === password) {

            console.log("Email Pass");
            if (userdata[i].UserStatus === "Approved") {

              console.log("Successfully login!");


              twofactorauth("/emailotpverify", { state: userdata[i] });
            } else if (userdata[i].UserStatus === "Pending") {

              setAlertmsg("Your request is pending...");
            } else {

              setAlertmsg(
                "Please ask an admin to grant permission to this app."
              );
            }
          } else {
            setAlertmsg(
              "The username or password you have entered is incorrect, please try again or click on the Forgot Password link to reset your password"
            );
          }
        }
      }
    } else {

    }
  };

  const removeError = () => {
    setAlertmsg("");
  }

  const ForgotPassword = async () => {
    console.log(resetemail);
    if (userdata) {
      if (!resetemail) {

        setErrorMsg("Please enter your email !");
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(resetemail)) {
        setErrorMsg("Invalid Email !.");
      } else {

        const data = await axios.post("/checkuseremail", { resetemail });
        console.log(data);


        if (data?.data === "Email found") {

          axios
            .post(
              "/sendForgotPasswordMail",
              {
                resetemail,
              }
            )
            .then(function (data) {
              //console.log(data);
              console.log(data.data.message);
              if (data.data.message === "send email successfully") {

                setErrorMsg(
                  "A link has been sent to the email address you entered above, please check your email and follow the link."
                );
              } else {
                setErrorMsg("Something Wrong. Try again later!");
              }
            })

        } else if (data?.data === "Email not found") {
          setErrorMsg("We can not find an account with this email address, please check your email is correct or you can register for an account.");
        }

        // for (let i = 0; i < userdata.length; i++) {

        //   if (userdata[i]?.Email === resetemail) {

        //     const id = userdata[i].ID;
        //     const email = userdata[i].Email;
        //     axios
        //       .post(
        //         "/sendForgotPasswordMail",
        //         {
        //           id,
        //           email,
        //         }
        //       )
        //       .then(function (data) {
        //         //console.log(data);
        //         console.log(data.data.message);
        //         if (data.data.message === "send email successfully") {

        //           setErrorMsg(
        //             "A link has been sent to the email address you entered above, please check your email and follow the link."
        //           );
        //         } else {
        //           setErrorMsg("Something Wrong. Try again later!");
        //         }
        //       });

        //   } else if (userdata[i]?.Email !== resetemail) {
        //     setErrorMsg("We can not find an account with this email address, please check your email is correct or you can register for an account.");
        //   }
        // }
      }
    } else {

      setErrorMsg("The Username and Password does't match !");
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    if (userInfo) {
      homepage("/home");
    }
    userAllData();
  }, []);

  return (
    <div>
      <LoginTopHeader></LoginTopHeader>
      <div className="container">
        <div className=" row ">
          <h3 className="text-white text-start mt-5">
            {" "}
            Welcome to AMAL Trustees
          </h3>

          {/* Login section design  Start */}
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
            <section
              className="p-4 mt-4"
              style={{
                backgroundColor: "#00ADEE",
              }}
            >
              {loginpage === true && (
                <h3 className="text-white text-start mb-3">Please sign in</h3>
              )}
              {loginpage === false && (
                <h3 className="text-white text-start mb-3">Forgot Password</h3>
              )}


              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 ">

                  {alertmsg ? (
                    <div
                      class="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      {alertmsg}
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={removeError}
                      ></button>
                    </div>
                  ) : (
                    <> </>
                  )}


                  {errormsg ? (
                    <div
                      class="alert alert-error alert-dismissible fade show"
                      role="alert"
                    >
                      {errormsg}
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"

                      ></button>
                    </div>
                  ) : (
                    <> </>
                  )}

                  {/* Sign in start */}
                  {loginpage === true && (
                    <>
                      <div class="form-group mt-2">
                        <input
                          style={{ backgroundColor: "#00ADEE", color: "white" }}
                          type="text"
                          class="form-control"
                          id="username"
                          aria-describedby="username"
                          placeholder="User Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div class="form-group mt-3">
                        <input
                          style={{ backgroundColor: "#00ADEE", color: "white" }}
                          type="password"
                          class="form-control"
                          id="password"
                          aria-describedby="password"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div class="form-group mt-3">
                        <button
                          //  style={{ float: "left", color: "#00ADEE" }}
                          type="button"
                          className="btn btn-primary mt-2 border-0"
                          onClick={userLogin}
                          id="registetionbutton"
                        >
                          Sign In
                        </button>

                        <p style={{ marginTop: 7 }} onClick={() => setLoginPage(false)}>
                          <a
                            style={{ color: "white" }}
                            data-bs-toggle="collapse"
                            href="#collapseExample"
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapseExample"

                          >
                            Forgot Password?
                          </a>
                        </p>

                      </div>
                    </>
                  )}

                  {/* signin end */}

                  {/* test start  */}
                  {loginpage === false && (
                    <>

                      <div
                        style={{
                          marginLeft: 0,
                        }}
                      >
                        <div
                          className="card card-body"
                          style={{
                            backgroundColor: "#00ADEE",
                            border: 0,
                            color: "white",
                            marginTop: "-5px",
                          }}
                        >
                          In order to reset your password, please enter your email
                          address and we will send you a password reset link
                          shortly.
                          <div class="form-group mt-1">
                            <input
                              style={{
                                backgroundColor: "#00ADEE",
                                color: "white",
                              }}
                              type="text"
                              className="form-control"
                              id=""
                              aria-describedby="username"
                              placeholder="User Email"
                              required
                              onChange={(e) =>
                                setResetEmail(e.target.value.toLowerCase())
                              }
                            />
                          </div>
                          <div class="form-group mt-2">

                            <button
                              className={`${classes.ptimaryBtm}  btn btn-primary mt-2 border-0`}
                              onClick={ForgotPassword}
                            >
                              Submit
                            </button>

                          </div>
                          <p style={{ marginTop: 7 }} onClick={() => setLoginPage(true)}>
                            <a
                              style={{ color: "white" }}
                              data-bs-toggle="collapse"
                              href="#collapseExample"
                              role="button"
                              aria-expanded="false"
                              aria-controls="collapseExample"

                            >
                              Sign In?
                            </a>
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Test end  */}

                  <div></div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-white text-start">
                  <h4> Don't have an account? </h4>

                  <div>
                    If you do not already have a User ID and password, please{" "}
                    {/* <a
                      onClick={() => registration("/register")}
                      className="text-white"
                    >
                      register now
                    </a> */}
                    <button
                      style={{ marginTop: 5 }}
                      onClick={() =>
                        registration("/register", { state: userdata })
                      }
                      className="buttonreg"
                    >
                      Register your Details
                    </button>
                    <p
                      style={{
                        marginTop: 5,
                      }}
                    >
                      Once you have completed your registration, you may sign
                      into the website.
                    </p>
                  </div>

                  <div className="mt-3">
                    <h4> Contact Us</h4>
                    <span>
                      Email:{" "}
                      <a href=" " style={{ color: "white" }}>
                        {" "}
                        support@amalinvestorportal.com.au{" "}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {/* Login section design  End  */}
            {/* Latest News Start */}
            <section
              className="mt-3 text-white text-start"
              style={{
                backgroundColor: "#232323",
                padding: 20,
              }}
            >
              <h3
                style={{
                  color: "#00ADEE",
                }}
              >
                Trustee Services
              </h3>

              <div
                className="row"
                style={{
                  padding: 10,
                }}
              >
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <img src={img1} alt="example" style={{ height: 33 }} />

                  <h4 className="mt-3">Funds</h4>

                  <ul>
                    <li>Wholesale Trustee (including Custody).</li>
                    <li>Wholesale Trustee (including Custody).</li>
                  </ul>

                  <div>
                    Includes acting as trustee for credit, property, mortgage,
                    private equity and fixed interest funds.
                  </div>

                  <div class="form-group mt-3">
                    <a
                      href="https://www.amal.com.au/trustee-services#Discover"
                      target="_blank"
                    >
                      <button
                        style={{ backgroundColor: "white", color: "#00ADEE" }}
                        type="button"
                        className="btn btn-primary  mt-2 border-0"
                      >
                        Discover More
                      </button>
                    </a>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <img src={img3} alt="example" style={{ height: 40 }} />

                  <h4 className="mt-2">Agency Services</h4>

                  <ul>
                    <li>Escrow Agent.</li>
                    <li>Paying Agent.</li>
                    <li>
                      Facility Agent and Security Trustee - Syndicated Debt
                      Facilities.
                    </li>
                  </ul>

                  <div>
                    Includes holding assets on trust, holding security on behalf
                    of lenders, managing syndicated facilities, maintaining bank
                    accounts and distributing funds.
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <img src={img2} alt="example" style={{ height: 40 }} />

                  <h3 className="mt-2">Structured Finance</h3>
                  <ul>
                    <li>Trustee.</li>
                    <li>Security Trustee.</li>
                    <li>Trust Management.</li>
                    <li>Document Custodian.</li>
                    <li>Issuing and Paying Agent.</li>
                  </ul>

                  <div>
                    Includes securitisation programs for RMBS, CMBS, ABS,
                    corporate finance and trade receivables.
                  </div>
                </div>
              </div>
            </section>
            {/* Latest News End  */}
          </div>


        </div>
      </div>

      {/* Footer section Start */}
      <Footer></Footer>
      {/* Footer section End  */}
    </div>
  );
};

export default Login;
