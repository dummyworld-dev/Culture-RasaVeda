import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./styles.css";

export default function RecipeEncyclopedia() {
  /*
  =========================================================
   FEATURE: Regional Recipe Encyclopedia
  =========================================================

   GOAL:
  Build a paginated recipe listing page with filters.

  ---------------------------------------------------------
   REQUIREMENTS:
  1. Fetch recipes from API (/recipes)
  2. Display recipes in a grid of cards
  3. Add filters:
      - Region
      - Dietary Tag
  4. Add pagination (6 items per page)
  5. Show:
      - Loading state
      - Empty state
  6. Reset page to 1 when filters change

  ---------------------------------------------------------
   API RESPONSE FORMAT:

  [
    {
      id: 1,
      name: "Rogan Josh",
      region: "Kashmir",
      community: "Kashmiri Pandit",
      dietaryTag: "Non-Veg",
      description: "A slow-cooked curry..."
    }
  ]

  ---------------------------------------------------------
   IMPLEMENTATION STEPS:

  STEP 1 — Create state:
    - recipes
    - loading
    - selectedRegion
    - selectedDiet
    - currentPage

  STEP 2 — Fetch data using useEffect

  STEP 3 — Filter recipes based on:
    region + dietaryTag

  STEP 4 — Apply pagination:
    - 6 recipes per page
    - slice array

  STEP 5 — Render:
    - Filter buttons
    - Recipe cards
    - Pagination buttons

  ---------------------------------------------------------
   EXPECTED OUTPUT:

  ✔ Filter buttons visible
  ✔ Clicking filters updates recipes instantly
  ✔ Recipe cards show name, region, tag, description
  ✔ Pagination works (1,2,3...)
  ✔ "Loading..." appears initially
  ✔ "No recipes found" if empty

  ---------------------------------------------------------
   DO NOT:
  - Modify API structure
  - Add new dependencies
  - Break layout structure

  =========================================================
  */

  //  STEP 1: Create state here

  //  STEP 2: Fetch API here

  //  STEP 3: Filtering logic here

  //  STEP 4: Pagination logic here

  return (
    <div className="recipe-page">
      <Link to="/" className="back">
        ← Back
      </Link>

      <h1 className="title">Regional Recipe Encyclopedia</h1>

      {/*  STEP 5A: Filter Bar */}
      <div className="placeholder">Implement Filter Buttons Here</div>

      {/*  STEP 5B: Recipe Grid */}
      <div className="placeholder">Render Recipe Cards Here</div>

      {/*  STEP 5C: Pagination */}
      <div className="placeholder">Add Pagination Controls Here</div>
    </div>
  );
}
