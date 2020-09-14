import { withStyles } from "@material-ui/core/styles";
import React from "react";
import SideNavigation from "../components/SideNavigation";
import { CssBaseline, Snackbar } from "@material-ui/core";
import Footer from "../components/Footer";
import clsx from "clsx";
import ReadingPopup from "../components/pages/ReadingPopup";
import { observer, inject } from "mobx-react";
import MuiAlert from "@material-ui/lab/Alert";
import { CircularProgress, Backdrop } from "@material-ui/core";
import {styles} from "./util"
const withSideBar = (WrappedComponent) => {
  // ...and returns another component...
  class ToWrap extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      const {  centralStore } = this.props;
      centralStore.hideAuthLoader();
      // ... that takes care of the subscription...
    }

    Alert = (props) => {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    };

    render() {
      const { classes, centralStore } = this.props;
      return (
        <div className={classes.root}>
           <Backdrop
            className={classes.backdrop}
            open={centralStore.currentloaderValue}
            onClick={() => {}}
          >
            <CircularProgress className={classes.backdrop} color="inherit" />
          </Backdrop>
          <CssBaseline />
          <SideNavigation />
          <main
            className={
              clsx(classes.content, {
                [classes.contentShift]:
                  centralStore.currentOpenNavigationDrawerValue,
              }) + " main-wrapper"
            }
          >
            <div className="main-content">
              {centralStore.currentShowReadingPopup === true ? (
                <ReadingPopup centralStore={centralStore} />
              ) : null}

              <Snackbar
                open={centralStore.hasErrorOccured}
                autoHideDuration={3000}
                onClose={() => {
                  centralStore.errorHasOccured();
                }}
              >
                <this.Alert
                  onClose={() => {
                    centralStore.errorHasOccured();
                  }}
                  severity="error"
                >
                  {centralStore.currentErrorMessage}
                </this.Alert>
              </Snackbar>

              <div className={classes.drawerHeader} />
                <WrappedComponent {...this.props} {...this.state} />
            </div>
            <Footer />
          </main>
        </div>
      );
    }
  }
  return withStyles(styles)(inject("centralStore")(observer(ToWrap)));
};

export default withSideBar;
