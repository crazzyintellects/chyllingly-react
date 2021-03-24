import React, { memo, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import IndeterminateCheckBoxOutlinedIcon from "@material-ui/icons/IndeterminateCheckBoxOutlined";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { OrderDetailContext } from "../context/OrderDetailContext";

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

function MenuItem({ menuitem }) {
  const classes = useStyles();
  const { orderDetail, handleItem } = useContext(OrderDetailContext);

  const manageItem = (id, val) => {
    handleItem(id, val);
  };

  return (
    <Grid item key={menuitem.menuItemId} xs={12} sm={4} md={3}>
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">{menuitem.title}</Typography>

          <Typography className={classes.pos} color="textSecondary">
            {menuitem.description}
          </Typography>

          <Typography variant="body1" component="p">
            ${menuitem.price / 100}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          {orderDetail.menuItems[menuitem.menuItemId - 1].quantity === 0 ? (
            <IconButton
              color="secondary"
              aria-label="add item"
              component="span"
              disabled
            >
              <IndeterminateCheckBoxOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              color="secondary"
              aria-label="add item"
              component="span"
              onClick={() => manageItem(menuitem.menuItemId, -1)}
            >
              <IndeterminateCheckBoxOutlinedIcon />
            </IconButton>
          )}

          <Typography variant="h5" component="p">
            {/*orderDetail[menuitem.menuItemId-1].quantity === undefined ? 0 : orderDetail[menuitem.menuItemId-1]*/}
            {orderDetail.menuItems[menuitem.menuItemId - 1].quantity}
          </Typography>
          <IconButton
            color="secondary"
            aria-label="add item"
            component="span"
            onClick={() => manageItem(menuitem.menuItemId, +1)}
          >
            <AddBoxOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default memo(MenuItem);
