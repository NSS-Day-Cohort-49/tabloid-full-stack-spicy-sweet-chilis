import React, { useEffect, useState,} from "react";
import { useParams } from "react-router-dom";
import { getAllComments, getAllCommentsOnPost } from "../../modules/CommentManager.js";
import Comment from './Comment.js'


const CommentList = () => {
  const [comments, setComments] = useState([]);

  const {id} = useParams();
    // console.log(id);
  const getComments = (id) => {
    getAllCommentsOnPost(id).then(comments => setComments(comments));
  };

  useEffect(() => {
    getComments(id)
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
