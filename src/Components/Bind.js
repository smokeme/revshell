import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { bind } from "./list";

const Bind = ({ copyToClipboard, classes }) => {
  const [port, setPort] = useState(1337);
  const [payloads, setPayloads] = useState([]);

  useEffect(() => {
    const generateList = () => {
      setPayloads(
        bind.map((item) => {
          return {
            name: item.name,
            value: item.value.replace("MYPORT", port),
          };
        })
      );
    };
    generateList();
  }, [port]); // eslint-disable-line react-hooks/exhaustive-deps
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
      <h2>Bind Shell</h2>

      <form className={classes.root}>
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
          {payloads.map((item) => (
            <FormRow item={item} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
export default Bind;
