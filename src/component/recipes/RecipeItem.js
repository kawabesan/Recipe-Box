import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import DialogBox from "./DialogBox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import firebase from "firebase";
import "../../fire";

const dbRef = firebase.firestore().collection('recipes');

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "600px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    color: "#666",
  },
}));


function RecipeItem(props) {
  const classes = useStyles();

  

  return (

    <div className={classes.root}>
      {(props.myfdata === null) 
      ? 
      <div>...wait</div>
      :
      props.myfdata && props.myfdata.map((val) => (
        <List>
          <ListItem button className={classes.heading} key={val.id}>
            <DialogBox id={val.id} title={val.title} recipe={val.recipe} titleChange={props.titleChange} recipeChange={props.recipeChange}/>
            <IconButton aria-label="delete" onClick={() => {
              dbRef.doc(val.id).delete();
            }} >
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <Divider />
        </List>
      ))
      }
    </div>
  );
}

export default RecipeItem;
