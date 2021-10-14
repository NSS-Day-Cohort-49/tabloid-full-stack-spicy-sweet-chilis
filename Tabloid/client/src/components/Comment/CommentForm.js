import React, {useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addComment, getCommentById } from "../../modules/CommentManager.js";

const CommentForm = () => {
    const [comment, setComment] = useState({})
    const history = useHistory();
    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const handleControlledInputChange = (event) => {
        const newComment = { ...comment }
        newComment[event.target.id] = event.target.value
        setComment(newComment)
        }

        const handleClickSaveComment = () => {
            if (comment.subject === undefined || comment.content === undefined) {
                window.alert("Please complete the comment form.")
            } else {
                const newComment = {
                    postId: postId,
                    subject: comment.subject,
                    content: comment.content,
                    creatDateTime: comment.creatDateTime
                }
                addComment(newComment)
                .then((c) => history.push("/comments"))
            }
        }

        useEffect(() => {
            if (commentId) {
                getCommentById(commentId).then((comment) => {
                    setComment(comment);
                    console.log(comment);
                    setIsLoading(false);
                });
            } else {
                setIsLoading(false);
            }
        }, []);

        return(
            <>
             <form className="commentForm">
            <h2 className="commentForm__subject comment_header">{id ? <>Update Comment</> : <>New Comment</>}{" "}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="subject">Subject:</label>
                    <input type="text" id="subject" required autoFocus className="form-control" placeholder="Subject" value={comment.subject} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <input type="text" id="content" required autoFocus className="form-control" placeholder="Content" value={comment.content} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="createDateTime">Publication Date:</label>
                    <input type="createDateTime" id="createDateTime" required autoFocus className="form-control" placeholder="Enter a date" value={comment.publishDateTime} onChange={handleControlledInputChange} />
                </div>
            </fieldset> */}
            <div className="buttons"><button className="btns" onClick={
                (event) => {
                    event.preventDefault()
                    handleClickSaveComment()
                }
            }>
            SAVE COMMENT
            </button> </div>
        </form>    
            </>
        )
}