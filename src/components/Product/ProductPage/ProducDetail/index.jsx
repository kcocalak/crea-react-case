import React from "react";
import styles from "./ProductDetail.module.scss";
import CustomTypography from "../../../common/Typography";

const ProductDetail = ({ product }) => {
  const featureList = [
    { key: "brand", value: "Brand" },
    { key: "category", value: "Category" },
    { key: "stock", value: "Stock" },
    { key: "warrantyInformation", value: "Warranty Information" },
    { key: "shippingInformation", value: "Shipping Information" },
    { key: "sku", value: "Sku" },
    { key: "minimumOrderQuantity", value: "Minimum Order Quantity" },
    { key: "returnPolicy", value: "Returns" },
  ];
  return (
    <div className={styles.container}>
      <CustomTypography variant="h5" color="#6F767E" fontWeight="300">
        {product?.description}
      </CustomTypography>
      <CustomTypography variant="h4" fontWeight="400"></CustomTypography>
      {featureList.map((feature) => (
        <div key={feature} className={styles.feature}>
          <CustomTypography variant="h5" fontWeight="300">
            {feature.value}:
          </CustomTypography>
          <CustomTypography variant="h4" color="#6F767E" fontWeight="300">
            {product[feature.key]}
          </CustomTypography>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
