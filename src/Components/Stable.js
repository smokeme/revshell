import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { stable } from "./list.js";
const Stable = ({ classes, copyToClipboard }) => {
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
      <h2>Stable Shell</h2>
      <Grid container spacing={1}>
        <Grid container item spacing={1}>
          {stable.map((item) => (
            <FormRow item={item} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Stable;
