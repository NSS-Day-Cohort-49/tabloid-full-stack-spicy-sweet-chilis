import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Card, CardBody } from "reactstrap";
import { deleteComment, getCommentById } from "../../modules/CommentManager";

const Comment = ( {comment} ) => {

    const history = useHistory();
    const { postId } = useParams();
    // const [ com, setComment ] = useState();

    const deleteSelectedComment = (event) => {
        event.preventDefault()
        const confirmDelete = window.confirm("Are you sure you would like to delete the post?")
        if (confirmDelete) {
            deleteComment(comment.id).then(() => {history.push(`/posts/detail/${postId}`)})
        };
    }

    // useEffect(() => {
    //     getCommentById(id).then((resp) => {
    //         setComment(resp)
    //     })
    // }, []);

if (!comment) {
    return null;
}

return (
        <Card >
            <CardBody>
                <p className="text-center px-4">
                    ~{comment.subject}~
                </p>
                <div>
                <p className="text-left px-4">
                    -{comment.content}
                </p>
            <p className="text-left px-3">
                Commenter: {comment.userProfile.displayName}
            </p>
            <p className="text-left px-3">
                Date Commented: {new Date(comment.createDateTime).toLocaleDateString()}
                </p>
                </div>
            </CardBody>
            <button className="btns" onClick={() => {
                history.push(`/comments/edit/${comment.id}`)
			        }}>Edit</button>
        <button onClick={deleteSelectedComment}>Delete</button>
        </Card>
    )
};
export default Comment;

