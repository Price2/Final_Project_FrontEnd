import React from 'react';
import '../index.css'; // Import your CSS file

function Certificate({ data }) {
  return (
    <div className="container pm-certificate-container">
      <div className="outer-border"></div>
      <div className="inner-border"></div>

      <div className="pm-certificate-border col-xs-12">
        <div className="row pm-certificate-header">
          <div className="pm-certificate-title cursive col-xs-12 text-center">
            <h2>Certificate of Appreciation</h2>
          </div>
        </div>

        <div className="row pm-certificate-body">
          <div className="pm-certificate-block">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"></div>
                <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                  <span className="pm-earned-text padding-0 block cursive">Name</span>
                  <span className="pm-name-text bold" style={{textTransform: 'capitalize'}}>{data.first_name + " " + data.last_name}</span>
                </div>
                <div className="col-xs-2"></div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="pm-earned underline col-xs-8 text-center">
                  <span className="pm-earned-text padding-0 block cursive">Job Title</span>
                  <span className="pm-credits-text block bold sans" style={{textTransform: 'capitalize'}}>{data.job_title}</span>
                </div>
                <div className="col-xs-2"></div>
                <div className="col-xs-12"></div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"></div>
                <div className="pm-course-title col-xs-8 text-center">
                  <span className="pm-earned-text block cursive">Was awarded</span>
                </div>
                <div className="col-xs-2"></div>
              </div>
            </div>

            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-2"></div>
                <div className="pm-course-title underline col-xs-8 text-center">
                  <span className="pm-credits-text block bold sans">Employee of the Month </span>
                </div>
                <div className="col-xs-2"></div>
              </div>
            </div>
          </div>

          <div className="col-xs-12">
            <div className="row">
              <div className="pm-certificate-footer">
                <div className="col-xs-4 pm-certified col-xs-4 text-center">
                  {/* <span className="pm-credits-text block sans">Crystal Benton Administration</span> */}
                  {/* <span className="pm-empty-space block underline"></span> */}
                  <span className="bold block mt-3">Crystal Benton Instructional Specialist II, Staff Development</span>
                </div>
                <div className="col-xs-4">
                </div>
                <div className="col-xs-4 pm-certified col-xs-4 text-center">
                  <span className="pm-credits-text block sans">Date Awarded</span>
                  <span className="pm-empty-space block underline">10/04/2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
