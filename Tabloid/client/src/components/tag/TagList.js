import React, { useEffect, useState } from "react";
import Tag from './Tag';
import { getAllTags } from "../../modules/tagManager";

export default  function TagList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  

  return (
        <div className="container">
            <div className="row justify-content-center">
                {tags.map(tag => 
                    <Tag tag={tag} key={tag.id} />
                )}
            </div>
        </div>
  );
};