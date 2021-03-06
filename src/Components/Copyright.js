import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

function Copyright() {
  return (
    <>
      <a href="https://twitter.com/q8fawazo" style={{ color: "#89CFF0" }}>
        <TwitterIcon />
      </a>
      <a href="https://github.com/smokeme/revshell" style={{ color: "#ffffff" }}>
        <GitHubIcon />
      </a>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://revshell.online/">
          RevShell
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

export default Copyright;
