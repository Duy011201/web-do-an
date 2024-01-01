import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { error, success } from "/src/common/sweetalert2.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../../components/loading/Loading";

import {
  CHECK_EMAIL,
  CREATE_USER,
  GET_ALL_USER,
  LOGIN,
  UPDATE_USER_BY_ID,
} from "../../service";
import setting from "../../../setting";

export default function Forgot() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [verifyCode, setVerifyCode] = useState({
    isCode: false,
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVerifyEmail = async () => {
    await CHECK_EMAIL(formData).then(res => {
    if (res.data.data.length > 0) {
      setVerifyCode(prevVerifyCode => ({
        ...prevVerifyCode,
        isCode: true,
      }));
    } else {
      error("Không tồn tại email");
      return
    }
    });
  };

  const handleChangePassword = async() => {
    console.log('fomrData',formData);
    const res = await UPDATE_USER_BY_ID(formData);
    if (res.status === 200) {
      setLoading(true);
      success("Update success");
      window.location = "/login";
    } else {
      error("Update fail");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 wrap-forgot bg-lazy">
      {loading ? (
        <Loading />
      ) : (
        <div className="wrap-content p-5 rounded">
          <h2 className="text-center">Forgot Password</h2>
          <div className="mt-10">
            {!verifyCode.isCode && (
              <div className="form-group mt-10 position-relative">
                <label htmlFor="inputEmail">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name="email"
                  value={formData.email}
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={handleInputChange}
                  required
                />
                <small id="emailHelp" className="form-text text-muted">
                  Enter verification email to change password.
                </small>
                <FontAwesomeIcon
                  className="icon-email position-absolute"
                  icon="fas fa-envelope"
                />
              </div>
            )}
            {verifyCode.isCode && (
              <div className="form-group mt-10 position-relative">
                <label htmlFor="inputPassword">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  required
                />
                <FontAwesomeIcon
                  className="icon-password position-absolute"
                  icon="fas fa-lock"
                />
              </div>
<<<<<<< HEAD
            )}
            {verifyCode.isCode ? (
              <button
                onClick={handleChangePassword}
                className="btn btn-primary mt-10 w-100"
              >
                Change Password
              </button>
            ) : (
              <button
                onClick={handleVerifyEmail}
                className="btn btn-primary mt-10 w-100"
              >
                Forgot
              </button>
            )}
=======
            ) : null}
            <button type="submit" className="btn btn-primary mt-10 w-100">
              {verifyCode.isCode ? "Forgot" : "Verify email"}
            </button>
>>>>>>> ea7f84ae9535efdb0caccfd719a034e7b8a93ae2
            <p className="mt-10 text-center">
              Already have an account?{" "}
              <Link className="text-decoration-underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
