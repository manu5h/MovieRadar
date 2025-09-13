import { useState } from "react";
import "../Style/Footer.css";
import logo from "../assets/Movie_radar_logo.png";

function Footer() {
  const [showIframe, setShowIframe] = useState(false);

  return (
    <div className="footer-main-div">
      <h6>
        See{" "}
        <a
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            setShowIframe(!showIframe);
          }}
        >
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            Disclaimer
          </span>
        </a>
      </h6>

      {showIframe && (
        <p style={{ color: "#fff", padding: "15px" , fontSize: "13px"}}>
          
          <br />
          • Purpose: Movie Radar is a non-commercial project created for
          educational and personal use. It is designed to demonstrate web
          development skills and API integration, not for business or profit.
          <br />
          <br />
          • Data Sources: Movie data, posters, and ratings are sourced from The
          Movie Database (TMDb) and OMDb API. While we strive for accuracy, we
          cannot guarantee that all information is correct, complete, or
          up-to-date.
          <br />
          <br />
          • Content Advisory: Some movies may contain adult themes or material
          not suitable for children. This information comes directly from the
          APIs, and the developer has no control over such content.
          <br />
          <br />
          • No Affiliation: This project is not officially affiliated with or
          endorsed by TMDb, OMDb, or any production company.
          <br />
          <br />
          • No Liability: The developer takes no responsibility for errors,
          inaccuracies, or any issues arising from the use of this application.
          Users should verify information independently.
          <br />
          <br />
          • Fair Use: All content is used under fair use for educational and
          personal purposes only.
          <br />
          <br />
          Thank you for using Movie Radar! This is a passion project created to
          share love for movies and coding.
          <br />
          <br />
          <br />
          <strong>Last Updated: September 2025</strong>
          <br />
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="Movie Radar Logo" style={{ maxWidth: "200px" }} />
        <h5>
          2025 | All Rights Reserved by{" "}
          <a
            href="https://manushdev.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span style={{ textDecoration: "underline" }}>Manush</span>.
          </a>
          <h6>{" "}Version 1.2.0</h6>
        </h5>
      </div>
    </div>
  );
}

export default Footer;
