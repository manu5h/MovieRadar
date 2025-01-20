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
        <iframe
          src="/MovieRadar/Disclaimer.txt"
          style={{
            width: "100%",
            height: "400px",
            border: "1px solid #ccc",
            marginTop: "10px",
          }}
          title="Disclaimer"
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Movie Radar Logo"
          style={{ maxWidth: "200px"}}
        />
        <h5>
          2025 | All Rights Reserved{" "}
          <a
            href="https://www.linkedin.com/in/manusha-upekshana/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span style={{ textDecoration: "underline" }}>Manush</span>.
          </a>
          <h6>Version 1.0.0</h6>
        </h5>
      </div>
    </div>
  );
}

export default Footer;
