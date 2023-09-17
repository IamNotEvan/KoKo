import React from "react";
import { Link } from "react-router-dom";

import abc from "../../images/abc.jpg";
import done from "../../images/done.png";
import lock from "../../images/lock.png";

import data from "../../firebase/db.json";

import BasicCard from "../../components/card/card.component";

import "./progresspage.component.css"; // Import your custom CSS file for styling

function ProgressPage() {
    return (
      <div className="container">
        <h1>Progress</h1>
        <div className="card-grid">
          <BasicCard lessonNumber={1} imageSource={data[`lesson${1}`].complete ?
                                                    done
                                                    : abc}></BasicCard>
          <BasicCard lessonNumber={2} imageSource={data[`lesson${2}`].complete ?
                                                    done
                                                    : abc}></BasicCard>
          <BasicCard lessonNumber={3} imageSource={data[`lesson${3}`].complete ?
                                                    done
                                                    : data[`lesson${3}`].locked ?
                                                        lock
                                                        : abc}></BasicCard>
        </div>
      </div>
    );
  }

export default ProgressPage;