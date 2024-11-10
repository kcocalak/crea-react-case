import React, { useState } from "react";
import styles from "./ImageSlider.module.scss";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const ImageSlider = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        {data.length > 1 && (
          <BsArrowLeftCircleFill
            onClick={prevSlide}
            className={styles.arrowLeft}
          />
        )}
        {data.map((item, index) => {
          return (
            <img
              src={item}
              key={index}
              data-testid="slider-image"
              className={
                slide === index ? styles.slideImage : styles.slideImageHidden
              }
            />
          );
        })}
        {data.length > 1 && (
          <BsArrowRightCircleFill
            onClick={nextSlide}
            className={styles.arrowRight}
          />
        )}
      </div>
      {data.length > 1 && (
        <div className={styles.images}>
          {data.map((item, index) => {
            return (
              <img
                src={item}
                key={index}
                className={
                  slide === index ? styles.selectedImage : styles.image
                }
                onMouseEnter={() => setSlide(index)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
