import { StoreInstance } from "./centralstore";


export const checkAllFieldsValid = (obj) => {
  let allvalid = true;
  for (var key in obj) {
    console.log("key==>", key);
    if (obj[key] === null || obj[key] === "" || obj[key] === undefined) {
      allvalid = false;
    }
  }
  console.log("End key==>", allvalid);

  return allvalid;
};

export const getFormattedDate = (date, withhyphen) => {
  if(!date){
    return "01/01/2000"
  }
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  if (withhyphen === true) {
    return month + "-" + day + "-" + year;
  } else {
    return month + "/" + day + "/" + year;
  }
};
const drawerWidth = 240;

export const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 99,
    color: "#25a4e4;",
  },

  root: {
    display: "flex",
    height: "100%",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "center",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});
