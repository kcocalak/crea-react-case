import { Rating } from "@mui/material";
import React, { useState } from "react";
import CustomTypography from "../../../common/Typography";
import styles from "./CommentSection.module.scss";
import CommentAndReview from "./CommentAndReview";

const CommentSection = ({ comments, addComment }) => {
  const [showCommentArea, setShowCommentArea] = useState(false);

  const dateOptions = { year: "numeric", month: "short", day: "numeric" };

  return (
    <div className={styles.container}>
      <CommentAndReview
        addComment={addComment}
        showCommentArea={showCommentArea}
        setShowCommentArea={setShowCommentArea}
        comments={comments}
      />
      <div className={styles.comments}>
        {comments.map((comment) => (
          <div key={comment.text} className={styles.comment}>
            <Rating
              name="read-only"
              value={comment.rating}
              readOnly
              precision={0.1}
            />
            <div className={styles.user}>
              <div className={styles.userItem}>
                <CustomTypography variant="h5" color="#6F767E" fontWeight="500">
                  {comment.reviewerName}
                </CustomTypography>
              </div>
              <div className={styles.userItem}>
                <CustomTypography variant="h5" color="#6F767E" fontWeight="300">
                  {new Date(comment.date).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                </CustomTypography>
              </div>
            </div>
            <CustomTypography variant="h5" fontWeight="400">
              {comment.comment}
            </CustomTypography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
