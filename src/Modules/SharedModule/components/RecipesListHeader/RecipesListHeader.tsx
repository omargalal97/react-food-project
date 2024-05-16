import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Button from "@mui/material/Button";

export default function RecipesListHeader({ title }: any) {
  const navigate = useNavigate();

  const goToRecipeList = () => {
    navigate("/dashboard/recipes");
  };

  return (
    <div className="recipeheader-container container-fluid m-4 p-5">
      <div className="row">
        <div className="col-md-6">
          <h4>
            Fill the <span>Recipes</span>&nbsp;!
          </h4>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <div className="col-md-6">
          <Button
            onClick={goToRecipeList}
            variant="contained"
            color="success"
            endIcon={<ArrowForwardIcon />}
          >
            {title} Our Recipes &nbsp;
          </Button>
        </div>
      </div>
    </div>
  );
}
