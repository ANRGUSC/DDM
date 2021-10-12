/*
   Copyright (c) 2018, Autonomous Networks Research Group. All rights reserved.
   Read license file in main directory for more details
*/

import React, { Component } from "react";
import ddm from "../assets/images/ddm.svg";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home-description"></div>

        <img src={ddm} className="ddm" alt="ddm" />
      </div>
    );
  }
}

export default Home;
