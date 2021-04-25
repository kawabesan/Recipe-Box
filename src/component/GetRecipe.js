import React from "react";
import RecipeItem from "./recipes/RecipeItem";

function GetRecipe(props) {
  return (
    <div className="get-box">
      <h2 className="get-title">Recipes</h2>
      <RecipeItem myfdata={props.myfdata} titleChange={props.titleChange} recipeChange={props.recipeChange}/>
    </div>
  );
}

export default GetRecipe;
