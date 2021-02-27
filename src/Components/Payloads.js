import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { reverse } from "./list";

const Payloads = ({ copyToClipboard, classes }) => {
  const [ip, setIp] = useState("10.10.10.10");
  const [port, setPort] = useState(1337);
  const [payloads, setPayloads] = useState([]);

  useEffect(() => {
    const generateList = () => {
      setPayloads(
        reverse.map((item) => {
          return {
            name: item.name,
            value: item.value.replace("MYIP", ip).replace("MYPORT", port),
          };
        })
      );
    };
    generateList();
  }, [ip, port]); // eslint-disable-line react-hooks/exhaustive-deps
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
    <div>
      <h2>Reverse Shell</h2>

      <form className={classes.root}>
        <TextField
          color="secondary"
          id="outlined-multiline-flexible"
          multiline
          label="IP Address"
          variant="outlined"
          onFocus={(e) => e.target.select()}
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
          onFocus={(e) => e.target.select()}
          InputLabelProps={{
            shrink: true,
          }}
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
      </form>
      <Grid container spacing={1}>
        <Grid container item spacing={1}>
          {payloads.map((item) => (
            <FormRow item={item} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
export default Payloads;
