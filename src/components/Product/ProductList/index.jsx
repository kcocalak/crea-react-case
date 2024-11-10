import React, { useEffect } from "react";
import styles from "./ProductList.module.scss";
import CustomButton from "../../common/Button";
import Rating from "@mui/material/Rating";
import Skeleton from "@mui/material/Skeleton";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getProductList } from "../../../store/features/product/product.slice";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);

  const fetchProducts = (page, pageSize, category) => {
    dispatch(getProductList({ page, pageSize, category }));
  };

  useEffect(() => {
    fetchProducts(0, 30);
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
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
      ) : (
        <div className={styles.container}>
          <div className={styles.productCards}>
            {products ? (
              products.map((product) => {
                const link = `/product/${product.id}`;
                return (
                  <div className={styles.card} key={product.id}>
                    <a
                      href={link}
                      target="_blank"
                      onClick={() => {
                        console.log("+++++++");
                        localStorage.setItem("selectedProductId", product.id);
                      }}
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      <img
                        src={product.images[0]}
                        alt="product"
                        loading="lazy"
                        className={styles.cardImage}
                      />
                      <div className={styles.cardBody}>
                        <h2>{product.title}</h2>
                        <Rating
                          name="read-only"
                          value={product.rating}
                          readOnly
                        />
                        <p>${product.price}</p>
                        <div className={styles.cardFooter}>
                          {window.innerWidth > 600 && (
                            <CustomButton
                              buttonType="outline"
                              buttonSize="sm"
                              onClick={(e) => e.preventDefault()}
                            >
                              Add to Cart
                            </CustomButton>
                          )}
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })
            ) : (
              <p>No Data Found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
