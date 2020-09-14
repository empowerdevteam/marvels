import { computed, decorate, observable, action } from "mobx";
import "mobx-react-lite/batchingForReactDom";
export class CentralStore {
  //UserInfo Vars
  currentUser = null;
  isUserAuthenticated = true;
  setCurrentUser = (newValue) => {
    console.log("CurrentUser===>", newValue);
    this.currentUser = newValue;
  };
  get currentUserValue() {
    return this.currentUser;
  }

  get isUserCurrentlyAuthenticated() {
    return this.isUserAuthenticated;
  }
  setUserAuthenticated = (newValue) => {
    this.isUserAuthenticated = newValue;
  };
  //Flags for SideNavigation
  openNavigationDrawer = false;

  get currentOpenNavigationDrawerValue() {
    return this.openNavigationDrawer;
  }

  setNavigationDrawerOpen = (newValue) => {
    this.openNavigationDrawer = newValue;
  };

  //Flag for Reading Popup
  showReadingPopup = false;

  get currentShowReadingPopup() {
    return this.showReadingPopup;
  }

  setShowReadingPopup = (newValue) => {
    this.showReadingPopup = newValue;
  };
  //Flag for loaders

  loader = false;

  get currentloaderValue() {
    return this.loader;
  }
  showLoader = () => {
    this.loader = true;
  };
  hideLoader = () => {
    this.loader = false;
  };

  authLoader = false;

  get currentAuthloaderValue() {
    return this.authLoader;
  }
  showAuthLoader = () => {
    this.authLoader = true;
  };
  hideAuthLoader = () => {
    this.authLoader = false;
  };

  //Flag for errors
  errorOccured = false;
  errorMessage = undefined;
  errorHasOccured = (newValue) => {
    if (newValue) {
      this.errorOccured = true;
      this.errorMessage = newValue;
    } else {
      this.errorOccured = false;
    }
  };

  get hasErrorOccured() {
    return this.errorOccured;
  }

  get currentErrorMessage() {
    return this.errorMessage;
  }

  //Patient Data
  // patientTableData = [];

  // get currentPatientTableDataValue() {
  //   return this.patientTableData;
  // }
  // setPatientTableData = (newValue) => {
  //   this.patientTableData = newValue;
  // };

  //Flags for Add and Edit Dialog
  openDialog = false;

  get currentopenDialogValue() {
    return this.openDialog;
  }

  showAddEditDialog = () => {
    this.openDialog = true;
  };

  hideAddEditDialog = () => {
    this.openDialog = false;
  };

  // patientDataForEdit = undefined;

  // get currentPatientDataForEditValue() {
  //   return this.patientDataForEdit;
  // }

  // setPatientDataForEdit = (newValue) => {
  //   this.patientDataForEdit = newValue;
  // };
}

const DecoratedStore = decorate(CentralStore, {
  currentUser: observable,
  isUserAuthenticated: observable,
  openNavigationDrawer: observable,
  showReadingPopup: observable,
  loader: observable,
  authLoader:observable,
  errorMessage: observable,
  errorOccured: observable,
  patientTableData: observable,
  openDialog: observable,
  patientDataForEdit: observable,
  //computed
  currentUserValue: computed,
  isUserCurrentlyAuthenticated: computed,
  currentOpenNavigationDrawerValue: computed,
  currentShowReadingPopup: computed,
  currentloaderValue: computed,
  currentAuthloaderValue:computed,
  hasErrorOccured: computed,
  currentErrorMessage: computed,
  currentPatientTableDataValue: computed,
  currentopenDialogValue: computed,
  currentPatientDataForEditValue: computed,
  //actions
  setCurrentUser: action,
  setUserAuthenticated: action,
  setNavigationDrawerOpen: action,
  setShowReadingPopup: action,
  showLoader: action,
  hideLoader: action,
  showAuthLoader: action,
  hideAuthLoader: action,
  showAddEditDialog: action,
  hideAddEditDialog: action,
  errorHasOccured: action,
  setPatientTableData: action,
  setPatientDataForEdit: action,
});
export const StoreInstance = new DecoratedStore();
