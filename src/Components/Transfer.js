import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { transfer } from "./list.js";
const Transfer = ({ classes, copyToClipboard }) => {
  const [port, setPort] = React.useState(1337);
  const [transfers, setTransfers] = React.useState([]);

  React.useEffect(() => {
    const generateList = () => {
      setTransfers(
        transfer.map((item) => {
          return {
            name: item.name,
            steps: item.steps.map((step) => {
              return {
                name: step.name,
                value: step.value.replace("MYPORT", port),
              };
            }),
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
          <h3>{item.name}</h3>
          {item.steps.map((step) => (
            <div>
              {step.name}
              <Paper
                elevation={3}
                className={classes.paper}
                onClick={(e) => copyToClipboard(e, step)}
              >
                {step.value}
              </Paper>
            </div>
          ))}
        </Grid>
      </React.Fragment>
    );
  };
  return (
    <div>
      <h2>File Transfer</h2>
      <form className={classes.root}>
        <TextField
          color="secondary"
          id="outlined-multiline-flexible"
          multiline
          label="Port"
          onFocus={(e) => e.target.select()}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
      </form>
      <Grid container spacing={1}>
        <Grid container item spacing={8}>
          {transfers.map((item) => (
            <FormRow item={item} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Transfer;
