import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    marginTop: theme.spacing(4),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardAction: {
    justifyContent: "center",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  anchor: {
    textDecoration: `none`,
  },
}));

export default function HomePage() {
  const classes = useStyles();

  const [restaurant, setRestaurant] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoadingState] = useState(true);
  // eslint-disable-next-line
  const [selectedLocation, setSelectedLocation] = useState(1);

  //fetch the Menut items
  useEffect(() => {
    async function getRestaurantlocations() {
      try {
        const response = await axios.get(
          `http://localhost:8090/chyllingly/v1/locations`
        );
        setRestaurant(response.data);

        if (restaurant === null || restaurant.length === 0) {
          setLoadingState(true);
        } else {
          setLoadingState(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getRestaurantlocations();
    // eslint-disable-next-line
  }, [selectedLocation]);

  return (
    <main>
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Now Serving Online
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Indulge yourself with some refreshing items.Beverages like you have
            never tasted before.If it’s not perfect the way you ordered it, we
            won’t send it out.
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {restaurant.map((location) => (
            <Grid item key={location.restaurantId} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`https://source.unsplash.com/800x200?restaurant${location.restaurantId}`}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {location.location}
                  </Typography>
                  <Typography>
                    Enjoy the new location with some free drinks
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardAction}>
                  <Link to="/order" className={classes.anchor}>
                    <Button variant="outlined" color="secondary">
                      Order Now
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
