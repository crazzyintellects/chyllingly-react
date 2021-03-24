import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import HomePage from "./components/HomePage/Homepage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Order from "./components/Order/Order";
import { Switch, Route } from "react-router-dom";
import { OrderDetailProvider } from "./components/context/OrderDetailContext";

const font = "Nunito";
const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    color: `#274e67`,
  },
  palette: {
    primary: {
      light: "#84a9c6",
      main: "#557a95",
      dark: "#274e67",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fa7697",
      main: "#c44569",
      dark: "#8f073f",
      contrastText: "#000",
    },
  },
});

/*const useStyles = makeStyles((theme) => ({
   appContainer: {
     maxWidth: `92vw`,
     margin: `3.5rem auto`,
     backgroundColor: `#f3f5f9`,
     boxShadow: `0 2rem 4rem rgba(0,0,0,.3)`,
     borderRadius: `1rem`,
 
     //minHeight: `50rem`,
   },
  
 }));*/

function App() {
  return (
    <>
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <Header />

          <Switch>
            <Route exact path="/" component={HomePage} />
            <OrderDetailProvider>
              <Route exact path="/order" component={Order} />
            </OrderDetailProvider>
          </Switch>
          <Footer />
        </MuiThemeProvider>
      </CssBaseline>
    </>
  );
}

export default App;
