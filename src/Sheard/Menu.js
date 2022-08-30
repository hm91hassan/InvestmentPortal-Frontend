import React from "react";
import { Link } from "react-router-dom";
import amal from '../images/amallogo.svg';

import "./Menu.css";
const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          {/* <span className="schol-name-color"> Investment Report</span> */}
          <img src={amal} alt="example" style={{ height: 33 }} />
        </a>

        <button
          style={{
            backgroundColor: "white",
            color: "black",
          }}
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
        <div
          className="collapse navbar-collapse fw-bold"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li class="nav-item active">
              <a class="nav-link">
                <Link className="link" to="/home">
                  Home
                </Link>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">
                <Link className="link" to="/general">General</Link>
                
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <Link className="link" to="/help">
                  Help{" "}
                </Link>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
