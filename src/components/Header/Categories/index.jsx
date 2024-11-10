import React, { useState, useEffect } from "react";
import { Menu, MenuItem } from "@mui/material";
import styles from "./Categories.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getProductList,
  getCategories,
} from "../../../store/features/product/product.slice";

const Categories = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.product);
  const selectedCategories = categories?.filter(
    (category) =>
      category?.slug == "groceries" ||
      category?.slug == "smartphones" ||
      category?.slug == "kitchen-accessories" ||
      category?.slug == "mobile-accessories"
  );
  categories.find((category) => category.slug === "groceries");

  const fetchProductCategories = () => {
    dispatch(getCategories());
  };

  useEffect(() => {
    if (categories.length === 0) {
      fetchProductCategories();
    }
  }, []);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (category) => {
    if (category) {
      dispatch(getProductList({ page: 0, pageSize: 30, category: category }));
    }
    setAnchorEl(null);
  };
  return (
    <div className={styles.container} onMouseLeave={handleMouseLeave}>
      <span
        className={styles.more}
        onMouseEnter={handleMouseEnter}
        aria-controls={Boolean(anchorEl) ? "categories-menu" : undefined}
        aria-haspopup="true"
      >
        All Categories
      </span>
      <Menu
        id="categories-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMouseLeave}
        MenuListProps={{
          onMouseLeave: handleMouseLeave,
        }}
      >
        {categories.map((category, index) => (
          <MenuItem key={index} onClick={() => handleNavigate(category.slug)}>
            {category.name}
          </MenuItem>
        ))}
      </Menu>
      {window.innerWidth > 600 &&
        selectedCategories.map((category, index) => (
          <span
            className={styles.category}
            key={index}
            onClick={() => handleNavigate(category.slug)}
          >
            {category.name}
          </span>
        ))}
    </div>
  );
};

export default Categories;
