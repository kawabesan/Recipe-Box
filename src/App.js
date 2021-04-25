import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "./fire";
import { makeStyles } from "@material-ui/core/styles";
import GetRecipe from "./component/GetRecipe";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import "./App.scss";

const dbRef = firebase.firestore().collection("recipes");
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const useStyles = makeStyles((theme) => ({
  root: {},
  dialogBox: {
    backgroundColor: "#f7f2eb",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    padding: "0 10px",
  },
  appBar: {
    position: "relative",
    backgroundColor: "#a87a50",
    boxShadow: "2px 2px 8px #d1c0b3",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    fontSize: "20px",
    textAlign: "center",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  formBtn: {
    height: "50px",
    color: "#fff",
    borderColor: "#fff",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  formBox: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "600px",
    margin: "80px auto 0",
  },
  formTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    marginLeft: "5px",
    borderLeft: "10px solid #a87a50",
    paddingLeft: "15px",
    color: "#666",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  rtForm: {
    fontSize: "16px",
    padding: "10px",
    marginBottom: "30px",
    color: "#666",
    border: "none",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  rLabel: {
    fontSize: "20px",
    marginBottom: "10px",
    borderLeft: "10px solid #a87a50",
    paddingLeft: "15px",
    color: "#666",
    marginLeft: "5px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  rForm: {
    padding: "10px",
    fontSize: "16px",
    color: "#666",
    height: "800px",
    whiteSpace: "pre-line",
    border: "none",
    boxShadow: "1px 1px 5px #d1c0b3",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  rAddBtn: {
    width: "200px",
    margin: "20px auto 50px",
    padding: "10px 0",
    color: "#a87a50",
    fontWeight: "bold",
    borderColor: "#a87a50",
    backgroundColor: "#fff",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  logoutBox: {
    textAlign: "right",
    marginTop: "20px",
    marginRight: "50px",
  },
  loginBox: {
    textAlign: "right",
    marginTop: "20px",
    marginRight: "50px",
  },
  logBtn: {
    borderColor: "#a87a50",
    color: "#a87a50",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const classes = useStyles();
  const [myfdata, setMyfData] = useState(null);
  const [title, setTitle] = useState("");
  const [recipe, setRecipe] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("wait...");
  const [log, setLog] = useState(false);

  useEffect(() => {
    if (auth.currentUser != null) {
      dbRef.orderBy("created").onSnapshot((querySnapshot) => {
        const res = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setMyfData(res);
      });
    } else {
      return;
    }
  }, [message]);

  const handleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setMessage("logined: " + result.user.displayName);
        setLog(true);
      })
      .catch((error) => {
        setMessage("not logined.");
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const recipeChange = (e) => {
    setRecipe(e.target.value);
  };

  const doAction = (e) => {
    const ob = {
      title: title,
      recipe: recipe,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (ob.title === "" || ob.recipe === "") {
      return;
    } else {
      dbRef.add(ob).then((doc) => {
        dbRef.doc(doc.id).update({
          id: doc.id,
        });
        setTitle("");
        setRecipe("");
      });
    }
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="add-box">
        <h1 className="hTitle">Recipe Box</h1>
        {log ? (
        <Button
          className={classes.formBtn}
          variant="outlined"
          onClick={handleClickOpen}
        >
          New Recipe
        </Button>
        )
        :
        (
          <div></div>
        )}
      </div>
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
              Add Recipe
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.dialogBox}>
          <form className={classes.formBox} onSubmit={doAction}>
            <label for="recipe-title" className={classes.formTitle}>
              Recipe Title
            </label>
            <input
              wrap="soft"
              id="recipe-title"
              type="text"
              placeholder="レシピ名を入力"
              value={title}
              onChange={titleChange}
              className={classes.rtForm}
            />
            <label for="recipes" className={classes.rLabel}>
              Resipe
            </label>
            <textarea
              wrap="soft"
              id="recipes"
              placeholder="レシピを入力"
              value={recipe}
              onChange={recipeChange}
              className={classes.rForm}
            />
            <Button
              type="submit"
              variant="outlined"
              onClick={handleClose}
              className={classes.rAddBtn}
            >
              Add Recipe
            </Button>
          </form>
        </div>
      </Dialog>
      {log ? (
        <div>
          <div className={classes.logoutBox}>
            <Button
              variant="outlined"
              className={classes.logBtn}
              onClick={() => {
                setMessage("...wait");
                auth.signOut();
                setLog(false);
              }}
            >
              logout
            </Button>
          </div>
          <GetRecipe
            myfdata={myfdata}
            titleChange={titleChange}
            recipeChange={recipeChange}
          />
        </div>
      ) : (
        <div className={classes.loginBox}>
          <Button
            variant="outlined"
            onClick={handleLogin}
            className={classes.logBtn}
          >
            login
          </Button>
          <p>ログインしてください</p>
        </div>
      )}
    </div>
  );
}

export default App;
