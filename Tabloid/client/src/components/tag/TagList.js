import React, { useEffect, useState } from "react";

const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags();
}, []);

  const getAllTags = () => {
    getAllTags().then(tags => setTags(tags));
  };

  return (
    <div>
        <br/>
        <div className="container">
            <div className="row justify-content-center">
                {videos.map((tag) => (
                    <Tag tag={tag} key={tag.id} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default TagList;