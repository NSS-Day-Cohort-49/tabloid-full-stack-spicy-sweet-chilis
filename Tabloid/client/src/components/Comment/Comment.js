import React from "react";
import { Card, CardBody } from "reactstrap";

const Comment = ({ comment }) => {
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
                Date Commented: {comment.createDateTime}
                </p>
                </div>
            </CardBody>
        </Card>
    )
};
export default Comment;

