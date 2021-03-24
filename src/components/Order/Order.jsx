import React, { useState, useEffect, memo, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MenuItems from "./MenuItems";
import { Divider } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import { OrderDetailContext } from "../context/OrderDetailContext";
import OrderSummary from "./OrderSummary";

const useStyles = makeStyles((theme) => ({
  orderContent: {
    padding: theme.spacing(8, 0, 6),
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.primary.dark,
    borderRadius: `1.2rem`,
  },
  title: {
    fontWeight: `700`,
  },
}));

function Order() {
  const classes = useStyles();

  //initial state
  //just supporting one menu per location
  // eslint-disable-next-line
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [menuItemDetails, setmenuItemDetails] = useState({});
  const [loading, setLoadingState] = useState(true);

  //Load the initial data in the OrderDetail context
  const { orderDetail, setOrderDetail } = useContext(OrderDetailContext);

  //For loading wave skeleton
  const staticConstants = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
  ];

  //fetch the Menut items
  useEffect(() => {
    async function getMenuItems() {
      try {
        const response = await axios.get(
          `http://localhost:8090/chyllingly/v1/menus/${selectedMenu}/items`
        );
        setmenuItemDetails(response.data);

        let menuItems = [];
        // eslint-disable-next-line
        response.data.menuSections.map((menuSection) => {
          // eslint-disable-next-line
          menuSection.menuItems.map((item) => {
            let menuItem = { ...item, quantity: 0 };
            menuItems.push(menuItem);
          });
        });
        setOrderDetail({ ...orderDetail, menuItems });

        if (menuItemDetails === null || menuItemDetails.length === 0) {
          setLoadingState(true);
        } else {
          setLoadingState(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getMenuItems();
    // eslint-disable-next-line
  }, [selectedMenu]);

  return (
    <Container maxWidth="xl">
      <section className={classes.orderContent}>
        <Grid
          container
          spacing={4}
          alignContent="center"
          justify="space-between"
        >
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper} elevation={5}>
              <Typography
                className={classes.title}
                gutterBottom
                variant="h5"
                noWrap
              >
                Menu
              </Typography>
              {loading
                ? staticConstants.map((val) => (
                    <div key={val}>
                      <Skeleton animation="wave" />
                    </div>
                  ))
                : menuItemDetails.menuSections.map((menuSection) => (
                    <div key={menuSection.menuSectionId}>
                      <Typography variant="h6" color="secondary">
                        {menuSection.title}
                      </Typography>

                      <Divider />
                      <MenuItems menuitems={menuSection.menuItems} />
                    </div>
                  ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper} elevation={5}>
              <Typography
                className={classes.title}
                gutterBottom
                variant="h5"
                noWrap
              >
                Order Summary
              </Typography>
              <Typography gutterBottom variant="body2" noWrap>
                *We only support Order Pick up with Cash payment. Our Driver is
                on leave !
              </Typography>
              <OrderSummary />
            </Paper>
          </Grid>
        </Grid>
      </section>
    </Container>
  );
}

export default memo(Order);
