import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ListItemText from "@material-ui/core/ListItemText";
import firebase from "firebase";
import "../../fire";

const dbRef = firebase.firestore().collection("recipes");

const useStyles = makeStyles((theme) => ({
  dialogBox: {
    backgroundColor: "#f7f2eb",
    padding: "50px 0",
    height: "100%",
  },
  recipeBox: {
    maxWidth: "600px",
    margin: "0 auto",
    height: "auto"
  },
  marginBox: {
    margin: "0 10px"
  },
  appBar: {
    position: "relative",
    backgroundColor: "#a87a50",
    boxShadow: "2px 2px 8px #d1c0b3",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  rh1: {
    backgroundColor: "#a87a50",
    color: "#fff",
    fontSize: "18px",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "2px 2px 8px #d1c0b3",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    justifyContent: "space-between",
    verticalAlign: "center"
  },
  rh1Box: {
    margin: "0",
    padding: "10px"
  },
  rh1Button: {
    borderColor: "#fff",
    color: "#fff",
    textAlign: "right"
  },
  rButtonBox: {
    textAlign: "right",
    marginTop: "10px",
  },

  contentsInput: {
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    fontSize: "16px",
    padding: "20px",
    marginTop: "10px",
    boxShadow: "1px 1px 3px #d1c0b3",
    width: "100%",
    height: "600px",
    boxSizing: "border-box",
    borderColor: "#a87a50",
  },
  contents: {
    whiteSpace: "pre-line",
    Width: "100%",
    height: "100%",
    marginTop: "10px",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "1px 1px 3px #d1c0b3",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    display: "block",
    fontSize: "16px",
    color: "#666",
  },
  upDataBtn: {
    color: "#a87a50",
    borderColor: "#a87a50",
  }

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DialogBox(props) {
  const classes = useStyles();
  const [title, setTitle] = useState(props.title);
  const [recipe, setRecipe] = useState(props.recipe);
  const [open, setOpen] = React.useState(false);
  const [titleEditing, setTitleEditing] = useState(false);
  const [recipeEditing, setRecipeEditing] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitleEditing(false);
    setRecipeEditing(false);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const recipeChange = (e) => {
    setRecipe(e.target.value);
  };

  const handleTitleEditing = (e) => {
    e.preventDefault();
    setTitleEditing(!titleEditing);
  };

  const handleTitleInput = (e) => {
    e.preventDefault();
    dbRef.doc(props.id).update({
      title: title,
    });
    setTitleEditing(!titleEditing);
  };

  const handleRecipeEditing = (e) => {
    e.preventDefault();
    setRecipeEditing(!recipeEditing);
  };

  const handleRecipeInput = (e) => {
    e.preventDefault();
    dbRef.doc(props.id).update({
      recipe: recipe,
    });
    setRecipeEditing(!recipeEditing);
  };

  return (
    <div>
      <ListItemText primary={title} onClick={handleClickOpen} />
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Recipes
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.dialogBox}>
          <div className={classes.recipeBox}>
            <div className={classes.marginBox}>
          <form onSubmit={handleTitleInput}>
            {titleEditing ? (
              <div className={classes.rh1}>
                <input
                  className="rh1-s"
                  type="text"
                  value={title}
                  onChange={titleChange}
                />
                <Button
                  className={classes.rh1Button}
                  variant="outlined"
                  type="submit"
                  onClick={handleTitleInput}
                >
                  保存
                </Button>
              </div>
            ) : (
              <div className={classes.rh1}>
                <p className={classes.rh1Box}>{title} の作り方</p>
                <Button variant="outlined" onClick={handleTitleEditing} className={classes.rh1Button}>
                  編集
                </Button>
              </div>
            )}
          </form>
          <form>
            {recipeEditing ? (
              <div className={classes.contentsBox}>
                <div className={classes.rButtonBox}>
                <Button
                  variant="outlined"
                  type="submit"
                  onClick={handleRecipeInput}
                  className={classes.upDataBtn}
                >
                  保存
                </Button>
                </div>
                <textarea className={classes.contentsInput} id="recipes" value={recipe} onChange={recipeChange} />
              </div>
            ) : (
              <div className={classes.contentsBox}>
                <div className={classes.rButtonBox}>
                <Button variant="outlined" onClick={handleRecipeEditing} className={classes.upDataBtn}>
                  編集
                </Button>
                </div>
                <div className={classes.contents}>{recipe}</div>
              </div>
            )}
          </form>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DialogBox;
