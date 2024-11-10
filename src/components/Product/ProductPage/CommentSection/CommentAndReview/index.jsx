import React, { useState } from "react";
import styles from "../CommentSection.module.scss";
import TextField from "@mui/material/TextField";
import CustomButton from "../../../../common/Button";
import Rating from "@mui/material/Rating";

const CommentAndReview = (props) => {
  const { addComment, showCommentArea, setShowCommentArea, comments } = props;
  const userName = localStorage.getItem("username");
  const [userComment, setUserComment] = useState("");
  const [value, setValue] = React.useState(0);
  const handleComment = () => {
    addComment(userComment, value);
    setShowCommentArea(false);
    setUserComment("");
    setValue(0);
  };

  return (
    <div className={styles.commentArea}>
      {comments.length > 0 &&
        (comments.find((comment) => comment.reviewerName == userName)
          ? false
          : true) && (
          <CustomButton
            buttonType="neutral"
            buttonSize="md"
            onClick={() => setShowCommentArea(!showCommentArea)}
          >
            {showCommentArea ? "Close" : "Add a Review"}
          </CustomButton>
        )}
      {showCommentArea && (
        <div className={styles.userComment}>
          <div className={styles.Rating}>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <TextField
            id="outlined-multiline-flexible"
            label=""
            placeholder="Add a comment"
            multiline
            minRows={4}
            maxRows={4}
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            sx={{ width: "100%", borderRadius: "12px" }}
            data-testid="userComment"
          />
          <CustomButton
            buttonType="outline"
            className={styles.button}
            onClick={handleComment}
            disabled={!userComment || !value}
          >
            Send
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default CommentAndReview;
