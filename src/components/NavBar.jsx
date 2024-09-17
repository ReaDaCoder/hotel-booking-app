import React from "react";
import "../navbar.css";

export default function NavBar(){
  return(
    <div className="nav-con">
        <nav class="navbar">
            <ul>
                <li class="nav"><a href="/">Features</a></li>
                <li class="nav"><a href="/">Customers Stories</a></li>
                <li class="nav"><a href="/">Prices</a></li>
                <li class="nav"><a href="/">Blog</a></li>
                <li class="nav"><a href="/">Sign Up</a></li>
            </ul>
        </nav>
    </div>
  )
}