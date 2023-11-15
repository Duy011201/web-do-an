import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.scss";
import setting from "../../setting.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const [role, setRole] = useState("");
  console.log(setting);
  useEffect(() => {
    localStorage.setItem("role", "employee");
    // localStorage.setItem("role", "user");
    // localStorage.setItem("role", "");
    setRole(setting.roleLocal);
    console.log(role);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary wrap-header">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Thế giới di động
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {role === "" ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Trang chủ
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Đăng nhập
                  </a>
                </li>
              </>
            ) : role === "user" ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Giỏ hàng
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Hóa đơn
                  </a>
                </li>
              </>
            ) : role === "employee" ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Sản phẩm
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Người dùng
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    Giỏ hàng
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hóa đơn
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Quản lý hóa đơn
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Quản lý chi tiết hóa đơn
                      </a>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
          {role === "user" || role === "employee" || role === "admin" ? (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Cá nhân
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Thông tin cá nhân
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <Outlet></Outlet>
    </nav>
  );
}
