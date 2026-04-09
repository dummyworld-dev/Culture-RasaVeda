/*
=========================================================
 FEATURE: Dietary Filter Explorer
=========================================================

 GOAL:
Filter recipes by dietary preference.

---------------------------------------------------------
 REQUIREMENTS:
1. Static dataset of recipes with dietaryTag field
2. Filter buttons: All, Jain, Vegan, Sattvic, Gluten-Free
3. Clicking a filter shows only matching recipes

---------------------------------------------------------
 IMPLEMENTATION STEPS:

STEP 1 — Create recipes array with dietaryTag field
STEP 2 — Add useState for selected filter
STEP 3 — Filter recipes based on selected tag
STEP 4 — Render filter buttons and recipe cards

---------------------------------------------------------
 EXPECTED OUTPUT:

✔ Filter buttons visible
✔ Clicking a filter updates the recipe list
✔ "No results" message when no match

---------------------------------------------------------
 DO NOT:
- Make API calls
=========================================================
*/
// D:\Competition\Culture-RasaVeda\src\features\DietaryFilter\index.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
export default function DietaryFilter() {
  // Static dataset of recipes with dietaryTag field
  const allRecipes = [
    {
      id: 1,
      name: "Vegetable Biryani",
      dietaryTag: "jain",
      ingredients: "Rice, vegetables, spices",
      region: "North India",
    },
    {
      id: 2,
      name: "Chana Masala",
      dietaryTag: "vegan",
      ingredients: "Chickpeas, tomatoes, onions",
      region: "Punjab",
    },
    {
      id: 3,
      name: "Aloo Gobi",
      dietaryTag: "jain",
      ingredients: "Potatoes, cauliflower, turmeric",
      region: "Rajasthan",
    },
    {
      id: 4,
      name: "Quinoa Salad",
      dietaryTag: "gluten-free",
      ingredients: "Quinoa, cucumber, mint",
      region: "Modern",
    },
    {
      id: 5,
      name: "Kitchari",
      dietaryTag: "sattvic",
      ingredients: "Rice, mung dal, ghee",
      region: "Ayurvedic",
    },
    {
      id: 6,
      name: "Tofu Curry",
      dietaryTag: "vegan",
      ingredients: "Tofu, coconut milk, curry leaves",
      region: "South India",
    },
    {
      id: 7,
      name: "Gluten-Free Pizza",
      dietaryTag: "gluten-free",
      ingredients: "GF crust, tomato sauce, veggies",
      region: "Fusion",
    },
    {
      id: 8,
      name: "Sattvic Bowl",
      dietaryTag: "sattvic",
      ingredients: "Brown rice, steamed veggies, sesame",
      region: "Wellness",
    },
    {
      id: 9,
      name: "Jain Dal Baati",
      dietaryTag: "jain",
      ingredients: "Dal, wheat balls, ghee",
      region: "Rajasthan",
    },
    {
      id: 10,
      name: "Vegan Burger",
      dietaryTag: "vegan",
      ingredients: "Plant patty, lettuce, tomato",
      region: "Fusion",
    },
    {
      id: 11,
      name: "Sattvic Khichdi",
      dietaryTag: "sattvic",
      ingredients: "Rice, moong dal, cumin",
      region: "Ayurvedic",
    },
    {
      id: 12,
      name: "Gluten-Free Pasta",
      dietaryTag: "gluten-free",
      ingredients: "Brown rice pasta, pesto",
      region: "Italian",
    },
  ];

  // Filter options
  const filterOptions = [
    { id: "jain", label: "Jain", icon: "🕉️" },
    { id: "vegan", label: "Vegan", icon: "🌱" },
    { id: "sattvic", label: "Sattvic", icon: "🧘" },
    { id: "gluten-free", label: "Gluten-Free", icon: "🌾" },
  ];

  // Load saved filters from localStorage
  const loadSavedFilters = () => {
    const saved = localStorage.getItem("dietaryFilters");
    return saved ? JSON.parse(saved) : [];
  };

  const [selectedFilters, setSelectedFilters] = useState(loadSavedFilters());

  // Save to localStorage when filters change
  useEffect(() => {
    localStorage.setItem("dietaryFilters", JSON.stringify(selectedFilters));
  }, [selectedFilters]);

  // Filter recipes
  const filteredRecipes =
    selectedFilters.length === 0
      ? allRecipes
      : allRecipes.filter((recipe) =>
          selectedFilters.includes(recipe.dietaryTag)
        );

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  const getRecipeCount = (tag) => {
    return allRecipes.filter((recipe) => recipe.dietaryTag === tag).length;
  };

  // Get icon for dietary tag
  const getTagIcon = (tag) => {
    const option = filterOptions.find((opt) => opt.id === tag);
    return option ? option.icon : "🍽️";
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="page-back">
          ← Back to Home
        </Link>
        <h1 className="page-title">Dietary Filter Explorer</h1>
        <p className="page-sub">
          Filter recipes by Jain, Vegan, Sattvic, or Gluten-Free preferences
        </p>
      </div>

      <div className="todo-banner">
        <strong>✨ Multi-Select Filter Bar</strong>
        <p>
          Click on dietary tags to filter recipes. Multiple selections are
          supported. Your preferences are automatically saved.
        </p>
      </div>

      {/* Filter Bar */}
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div className="filter-bar">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              className={`filter-btn ${
                selectedFilters.includes(option.id) ? "active" : ""
              }`}
              onClick={() => toggleFilter(option.id)}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
              <span style={{ opacity: 0.7 }}>
                ({getRecipeCount(option.id)})
              </span>
            </button>
          ))}
        </div>

        {selectedFilters.length > 0 && (
          <button
            onClick={clearAllFilters}
            style={{
              fontSize: "0.7rem",
              padding: "4px 12px",
              background: "rgba(255,153,51,0.15)",
              border: "1px solid rgba(255,153,51,0.3)",
              borderRadius: "999px",
              color: "#FF9933",
              cursor: "pointer",
            }}
          >
            Clear all ({selectedFilters.length})
          </button>
        )}
      </div>

      {/* Live Recipe Count */}
      <div
        style={{
          marginBottom: "1.5rem",
          padding: "0.75rem 1rem",
          background: "rgba(255,153,51,0.05)",
          borderRadius: "10px",
          border: "1px solid rgba(255,153,51,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span style={{ color: "#f5e6cc", fontSize: "0.85rem" }}>
          📊 Showing{" "}
          <strong style={{ color: "#FF9933" }}>{filteredRecipes.length}</strong>{" "}
          of {allRecipes.length} recipes
        </span>
        {selectedFilters.length > 0 && (
          <span style={{ color: "rgba(240,230,211,0.5)", fontSize: "0.75rem" }}>
            Active:{" "}
            {selectedFilters
              .map((f) => filterOptions.find((opt) => opt.id === f)?.label)
              .join(", ")}
          </span>
        )}
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="card">
              <div className="card-img">{getTagIcon(recipe.dietaryTag)}</div>
              <div className="card-body">
                <div className="card-title">{recipe.name}</div>
                <div className="card-sub">{recipe.ingredients}</div>
                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="tag">{recipe.dietaryTag}</span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "rgba(240,230,211,0.3)",
                    }}
                  >
                    {recipe.region}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "16px",
            border: "1px solid rgba(255,153,51,0.1)",
          }}
        >
          <span
            style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}
          >
            😢
          </span>
          <h3 style={{ color: "#f5e6cc", marginBottom: "0.5rem" }}>
            No recipes found
          </h3>
          <p style={{ color: "rgba(240,230,211,0.5)", marginBottom: "1rem" }}>
            Try selecting different dietary preferences
          </p>
          <button
            onClick={clearAllFilters}
            style={{
              padding: "8px 20px",
              background: "rgba(255,153,51,0.15)",
              border: "1px solid rgba(255,153,51,0.3)",
              borderRadius: "999px",
              color: "#FF9933",
              cursor: "pointer",
            }}
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Save Indicator */}
      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          fontSize: "0.7rem",
          color: "rgba(240,230,211,0.3)",
          borderTop: "1px solid rgba(255,153,51,0.1)",
          paddingTop: "1.5rem",
        }}
      >
        💾 Filter preferences automatically saved
      </div>
    </div>
  );
}
