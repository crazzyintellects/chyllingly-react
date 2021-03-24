import React, { memo, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { OrderDetailContext } from "../context/OrderDetailContext";
import { Divider } from "@material-ui/core";

import inputContent from "./InputFormContent/InputContent";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  total: {
    marginTop: theme.spacing(2),
  },
  right: {
    textAlign: `right`,
  },
  form: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
  },
}));

const schema = yup.object().shape({
  customerName: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 letters"),
  emailId: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

function OrderSummary(props) {
  const classes = useStyles();

  const { orderDetail, setOrderDetail } = useContext(OrderDetailContext);

  const finalOrder =
    orderDetail.menuItems &&
    orderDetail.menuItems.filter((item) => item.quantity > 0);

  // eslint-disable-next-line
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [orderId, setOrderId] = useState("");

  // Send Order data to API
  const formSubmit = async (data, event) => {
    event.preventDefault();

    const requestObj = {
      customerName: data.customerName,
      customerEmail: data.emailId,
      totalPrice: orderDetail.totalPrice,
      menuItems: finalOrder,
    };

    await axios({
      method: "post",
      url: "http://localhost:8090/chyllingly/v1/order",
      data: requestObj,
    }).then(
      (response) => {
        setOrderId(response.data);
        //reset form
        event.target.reset();

        //reset total price
        let resetMenuItems = orderDetail.menuItems.map(
          (item) => (item.quantity = 0)
        );

        let resetOrderDeatil = {
          ...orderDetail,
          resetMenuItems,
          totalPrice: 0,
        };
        setOrderDetail(resetOrderDeatil);
        setOpen(true);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  //Success confirmation
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container spacing={2}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert onClose={handleClose} severity="success">
          Your Order {orderId} is confirmed !
        </Alert>
      </Snackbar>
      <div className={classes.root}>
        <List dense={false}>
          {finalOrder &&
            finalOrder.map((menuitem) => (
              <ListItem key={menuitem.menuItemId}>
                <ListItemAvatar>
                  <Avatar>
                    <Badge
                      badgeContent={menuitem.quantity}
                      color="secondary"
                      showZero={true}
                    ></Badge>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={menuitem.title} />
                <Typography variant="body1" className={classes.right}>
                  $ {(menuitem.quantity * menuitem.price) / 100}
                </Typography>
              </ListItem>
            ))}
        </List>
        <Divider />
        <Typography variant="h6" className={classes.total}>
          Total price : $ {orderDetail.totalPrice / 100}
        </Typography>
        <Divider className={classes.total} />
        {orderDetail.totalPrice !== 0 && (
          <>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(formSubmit)}
            >
              {inputContent.fields.map((field, key) => (
                <TextField
                  label={field.label}
                  key={key}
                  name={field.name}
                  inputRef={register}
                  error={Boolean(errors[field.name])}
                  helperText={
                    errors[field.name] ? errors[field.name].message : " "
                  }
                />
              ))}

              <Button
                variant="outlined"
                color="secondary"
                className={classes.total}
                type="submit"
              >
                Check Out
              </Button>
            </form>
          </>
        )}
      </div>
    </Grid>
  );
}

export default memo(OrderSummary);
