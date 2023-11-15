import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./style.scss";
import setting from "../../setting.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  const [role, setRole] = useState("");
  useEffect(() => {
    // localStorage.setItem("role", "admin");
    // localStorage.setItem("role", "employee");
    // localStorage.setItem("role", "user");
    localStorage.setItem("role", "");
    setRole(setting.roleLocal);
    // console.log(role);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg wrap-header bg-primary">
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
            {role === "admin" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/product">
                    Sản phẩm
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/cart">
                    Giỏ hàng
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/user">
                    Người dùng
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hóa đơn
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/invoice">
                        Quản lý hóa đơn
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/detail-invoice">
                        Quản lý chi tiết hóa đơn
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : role === "user" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/invoice">
                    Giỏ hàng
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/detail-invoice"
                  >
                    Hóa đơn
                  </Link>
                </li>
              </>
            ) : role === "employee" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/product">
                    Sản phẩm
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/cart">
                    Giỏ hàng
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hóa đơn
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/invoice">
                        Quản lý hóa đơn
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/detail-invoice">
                        Quản lý chi tiết hóa đơn
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/login">
                    Đăng nhập
                  </Link>
                </li>
              </>
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
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Cá nhân
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/personal">
                        Thông tin cá nhân
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/logout">
                        Đăng xuất
                      </Link>
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
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <Outlet></Outlet>
    </nav>
  );
}
