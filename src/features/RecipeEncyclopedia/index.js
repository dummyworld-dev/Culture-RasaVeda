// D:\Competition\Culture-RasaVeda\src\features\RecipeEncyclopedia\index.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./styles.css";

export default function RecipeEncyclopedia() {
  /*
  =========================================================
   FEATURE: Regional Recipe Encyclopedia + Dietary Filter Explorer
  =========================================================

   GOAL:
  Build a paginated recipe listing page with filters (Region + Multi-select Dietary).

  ---------------------------------------------------------
   REQUIREMENTS:
  1. Fetch recipes from API (/recipes)
  2. Display recipes in a grid of cards
  3. Add filters:
      - Region (dropdown)
      - Dietary Tag (multi-select: Jain, Vegan, Sattvic, Gluten-Free)
  4. Add pagination (6 items per page)
  5. Show:
      - Loading state
      - Empty state
  6. Reset page to 1 when filters change
  7. Save dietary filter preferences to localStorage

  ---------------------------------------------------------
   IMPLEMENTATION STEPS:

  STEP 1 — Create state
  STEP 2 — Fetch data using useEffect
  STEP 3 — Filter recipes based on region + dietary tags
  STEP 4 — Apply pagination (6 per page)
  STEP 5 — Render filters, recipe cards, pagination
  =========================================================
  */

  // STEP 1: Create state
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDietaryTags, setSelectedDietaryTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Dietary filter options
  const dietaryOptions = [
    { id: "jain", label: "Jain", icon: "🕉️" },
    { id: "vegan", label: "Vegan", icon: "🌱" },
    { id: "sattvic", label: "Sattvic", icon: "🧘" },
    { id: "gluten-free", label: "Gluten-Free", icon: "🌾" },
  ];

  // Load saved dietary filters from localStorage
  useEffect(() => {
    const savedFilters = localStorage.getItem("dietaryFilters");
    if (savedFilters) {
      setSelectedDietaryTags(JSON.parse(savedFilters));
    }
  }, []);

  // Save dietary filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("dietaryFilters", JSON.stringify(selectedDietaryTags));
  }, [selectedDietaryTags]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRegion, selectedDietaryTags]);

  // STEP 2: Fetch API
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await api.get("/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        // Fallback sample data if API fails
        setRecipes([
          {
            id: 1,
            name: "Rogan Josh",
            region: "Kashmir",
            community: "Kashmiri Pandit",
            dietaryTag: "non-veg",
            description:
              "A slow-cooked aromatic lamb curry with Kashmiri red chilies.",
          },
          {
            id: 2,
            name: "Vegetable Biryani",
            region: "Hyderabad",
            community: "Muslim",
            dietaryTag: "jain",
            description: "Fragrant rice layered with vegetables and spices.",
          },
          {
            id: 3,
            name: "Chana Masala",
            region: "Punjab",
            community: "Sikh",
            dietaryTag: "vegan",
            description: "Spicy chickpea curry popular across North India.",
          },
          {
            id: 4,
            name: "Aloo Gobi",
            region: "Rajasthan",
            community: "Hindu",
            dietaryTag: "jain",
            description: "Dry curry with potatoes and cauliflower.",
          },
          {
            id: 5,
            name: "Kitchari",
            region: "Uttar Pradesh",
            community: "Ayurvedic",
            dietaryTag: "sattvic",
            description: "Comforting rice and lentil porridge.",
          },
          {
            id: 6,
            name: "Quinoa Salad",
            region: "Modern",
            community: "Contemporary",
            dietaryTag: "gluten-free",
            description: "Healthy quinoa with fresh vegetables.",
          },
          {
            id: 7,
            name: "Masala Dosa",
            region: "Karnataka",
            community: "Brahmin",
            dietaryTag: "vegan",
            description: "Crispy rice crepe with potato filling.",
          },
          {
            id: 8,
            name: "Sattvic Khichdi",
            region: "Gujarat",
            community: "Jain",
            dietaryTag: "sattvic",
            description: "Simple, balanced one-pot meal.",
          },
          {
            id: 9,
            name: "Gluten-Free Pasta",
            region: "Fusion",
            community: "Contemporary",
            dietaryTag: "gluten-free",
            description: "Italian-Indian fusion pasta.",
          },
          {
            id: 10,
            name: "Paneer Butter Masala",
            region: "Delhi",
            community: "Mughlai",
            dietaryTag: "jain",
            description: "Creamy tomato-based paneer curry.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // Get unique regions for filter dropdown
  const regions = [
    "",
    ...new Set(recipes.map((recipe) => recipe.region).filter(Boolean)),
  ];

  // STEP 3: Filtering logic
  const filteredRecipes = recipes.filter((recipe) => {
    // Region filter
    if (selectedRegion && recipe.region !== selectedRegion) return false;

    // Dietary tags filter (multi-select)
    if (selectedDietaryTags.length > 0) {
      const recipeDietaryTag = recipe.dietaryTag?.toLowerCase();
      if (!selectedDietaryTags.includes(recipeDietaryTag)) return false;
    }

    return true;
  });

  // STEP 4: Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Toggle dietary filter (multi-select)
  const toggleDietaryFilter = (tagId) => {
    setSelectedDietaryTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  // Clear all dietary filters
  const clearDietaryFilters = () => {
    setSelectedDietaryTags([]);
  };

  // Get icon for dietary tag
  const getDietaryIcon = (tag) => {
    const option = dietaryOptions.find((opt) => opt.id === tag?.toLowerCase());
    return option ? option.icon : "🍽️";
  };

  // Get recipe count for each dietary tag
  const getDietaryCount = (tagId) => {
    return recipes.filter((r) => r.dietaryTag?.toLowerCase() === tagId).length;
  };

  return (
    <div className="recipe-page">
      <Link to="/" className="back">
        ← Back
      </Link>
      <h1 className="title">Regional Recipe Encyclopedia</h1>

      {/* STEP 5A: Filter Bar */}
      <div className="filters">
        {/* Region Filter */}
        <div>
          <label>Region:</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map(
              (region) =>
                region && (
                  <option key={region} value={region}>
                    {region}
                  </option>
                )
            )}
          </select>
        </div>

        {/* Multi-select Dietary Filter */}
        <div className="dietary-filters">
          <label>Dietary Preference:</label>
          <div className="dietary-buttons">
            {dietaryOptions.map((option) => (
              <button
                key={option.id}
                className={`dietary-btn ${
                  selectedDietaryTags.includes(option.id) ? "active" : ""
                }`}
                onClick={() => toggleDietaryFilter(option.id)}
                title={`${option.label} (${getDietaryCount(
                  option.id
                )} recipes)`}
              >
                <span className="dietary-icon">{option.icon}</span>
                <span className="dietary-label">{option.label}</span>
                <span className="dietary-count">
                  ({getDietaryCount(option.id)})
                </span>
              </button>
            ))}
            {selectedDietaryTags.length > 0 && (
              <button className="clear-filters" onClick={clearDietaryFilters}>
                ✕ Clear ({selectedDietaryTags.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Live Recipe Count */}
      <div className="recipe-count-info">
        <span>
          📊 Showing <strong>{filteredRecipes.length}</strong> recipes
        </span>
        {selectedDietaryTags.length > 0 && (
          <span className="active-tags">
            Active:{" "}
            {selectedDietaryTags
              .map((tag) => dietaryOptions.find((opt) => opt.id === tag)?.label)
              .join(", ")}
          </span>
        )}
      </div>

      {/* STEP 5B: Recipe Grid */}
      {loading ? (
        <div className="loading-state">Loading recipes...</div>
      ) : filteredRecipes.length === 0 ? (
        <div className="empty-state">
          <p>😢 No recipes found matching your filters.</p>
          <button
            onClick={() => {
              setSelectedRegion("");
              clearDietaryFilters();
            }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid">
            {paginatedRecipes.map((recipe) => (
              <div key={recipe.id} className="card">
                <div className="card-img">
                  {getDietaryIcon(recipe.dietaryTag)}
                </div>
                <div className="card-body">
                  <div className="card-title">{recipe.name}</div>
                  <div className="card-sub">
                    <span className="region">{recipe.region}</span>
                    {recipe.community && <span> • {recipe.community}</span>}
                  </div>
                  <div className="card-description">{recipe.description}</div>
                  <div className="card-footer">
                    <span
                      className={`dietary-tag ${recipe.dietaryTag?.toLowerCase()}`}
                    >
                      {recipe.dietaryTag || "Vegetarian"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* STEP 5C: Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                ← Previous
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={currentPage === idx + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {/* Save indicator */}
      <div className="save-indicator">
        💾 Dietary preferences automatically saved
      </div>
    </div>
  );
}
