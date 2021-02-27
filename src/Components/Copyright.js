import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";
import { Avatar } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

function Copyright() {
  return (
    <>
      <a
        target="_blank"
        href="https://twitter.com/q8fawazo"
        style={{ color: "#89CFF0" }}
      >
        <TwitterIcon />
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
