import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import Copyright from "./Components/Copyright";
import Box from "@material-ui/core/Box";
import Payloads from "./Components/Payloads";
import Upgrade from "./Components/Upgrade";
import Bind from "./Components/Bind";
import Transfer from "./Components/Transfer";

import Stable from "./Components/Stable";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

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
  footer: {
    bottom: 2,
    height: "40px",
    marginTop: "120px",
    textAlign: "center",
    verticalAlign: "middle",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}
const App = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const copyToClipboard = (e, item) => {
    navigator.clipboard.writeText(item.value);
    handleClick();
  };
  return (
    <MuiThemeProvider theme={themeDark}>
      <CssBaseline />
      <Container maxWidth="lg">
        <h1>
          RevShell <AllInclusiveIcon />
        </h1>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Reverse Shell" />
          <Tab label="Bind Shell" />
          <Tab label="Shell Upgrade" />
          <Tab label="Stable Shell" />
          <Tab label="File Transfer" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Payloads classes={classes} copyToClipboard={copyToClipboard} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Bind classes={classes} copyToClipboard={copyToClipboard} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Upgrade classes={classes} copyToClipboard={copyToClipboard} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Stable classes={classes} copyToClipboard={copyToClipboard} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Transfer classes={classes} copyToClipboard={copyToClipboard} />
        </TabPanel>
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
        <Box className={classes.footer}>
          <Copyright />
        </Box>
      </Container>
    </MuiThemeProvider>
  );
};
export default App;
