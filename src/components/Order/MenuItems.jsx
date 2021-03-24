import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import MenuItem from "./MenuItem";

const useStyles = makeStyles((theme) => ({
  pos: {
    marginBottom: theme.spacing(1),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: `15rem`,
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cardContent: {},
  cardAction: {
    justifyContent: "center",
  },
}));

function MenuItems(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.cardGrid}>
      {props.menuitems.map((menuitem) => (
        <MenuItem key={menuitem.menuItemId} menuitem={menuitem} />
      ))}
    </Grid>
  );
}

export default memo(MenuItems);
