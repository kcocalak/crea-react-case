import React, { useState, useEffect } from "react";
import ImageSlider from "./ImageSlider";
import CommentSection from "./CommentSection";
import { useLocation } from "react-router-dom";
import ProductDetail from "./ProducDetail/index";
import styles from "./Product.module.scss";
import Rating from "@mui/material/Rating";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TabPanel } from "../../common/TabPanel";
import CustomTypography from "../../common/Typography";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getProductDetail } from "../../../store/features/product/product.slice";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Product = () => {
  const [tab, setTab] = useState(0);
  const [comments, setComments] = useState([]);
  const user = localStorage.getItem("username");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((state) => state.product);
  const selectedProductId = localStorage.getItem("selectedProductId");

  const fetchProductDetail = (productId) => {
    dispatch(getProductDetail(productId));
  };
  useEffect(() => {
    fetchProductDetail(location.pathname.split("/").pop());
  }, []);

  useEffect(() => {
    if (product) {
      setComments(product?.reviews);
    }
  }, [product]);

  useEffect(() => {
    if (location.pathname.split("/").pop() != selectedProductId) {
      navigate(`/products`);
    }
  }, [selectedProductId]);

  const addComment = (text, rating) => {
    setComments((prev) => [
      { comment: text, rating, reviewerName: user, date: new Date() },
      ...prev,
    ]);
  };

  const avgRating =
    comments?.reduce((acc, curr) => acc + curr.rating, 0) / comments?.length ||
    product?.rating;
  
  

  return (
    <>
      {product ? (
        <div className={styles.container}>
          <div className={styles.productInfo}>
            <ImageSlider data={product?.images} />
            <div className={styles.details}>
              <CustomTypography variant="h1">{product?.title}</CustomTypography>
              <span className={styles.ratingSpan}>
              {Math.ceil(avgRating * 100) / 100 || 0}
                <Rating
                  name="read-only"
                  value={Math.ceil(avgRating * 100) / 100 || 0}
                  readOnly
                  precision={0.1}
                  data-testid="product-rating"
                  className={styles.rating}
                />
                {""}
                ({comments?.length } {comments?.length === 1 ? "review" : "reviews"})
              </span>
              <CustomTypography variant="h2" fontWeight="600">
                US ${product?.price}
              </CustomTypography>
            </div>
          </div>
          <Tabs
            sx={{
              width: "90%",
              margin: "0 auto",
              backgroundColor: "#f5f5f5",
              borderRadius: "12px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={tab}
            onChange={(e, val) => {
              setTab(val);
            }}
            TabIndicatorProps={{
              sx: {
                backgroundColor: "black",
                height: 3,
              },
            }}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab
              label="The Details"
              {...a11yProps(0)}
              sx={{
                textTransform: "none",
                fontFamily: "Alexandria",
                "&:hover": {
                  backgroundColor: "#EFEFEF",
                },
              }}
            />
            <Tab
              label="Rating & Reviews"
              {...a11yProps(1)}
              sx={{
                textTransform: "none",
                fontFamily: "Alexandria",
                "&:hover": {
                  backgroundColor: "#EFEFEF",
                },
              }}
            />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <ProductDetail product={product} />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <CommentSection comments={comments} addComment={addComment} />
          </TabPanel>
        </div>
      ) : (
        <div className={styles.loading} id="loading">
          {Array.from({ length: 16 }).map((_) => (
            <Skeleton
              height={385}
              variant="rectangular"
              animation="wave"
              style={{ borderRadius: 12, marginBottom: 5 }}
              width={260}
              data-testid="skeleton"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Product;
