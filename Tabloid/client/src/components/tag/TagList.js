import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Tag from './Tag';
import { getAllTags } from "../../modules/TagManager";

export default  function TagList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags().then(res => setTags(res));
  }, []);

  console.log(tags);

  return (
    <div>
      <h3>Tag List</h3>
      <br></br>
      <Link to="/tags/form">Add A Tag</Link>
      <br></br>
      <br></br>
        <div className="container">
            <div className="row justify-content-center">
                {tags.map(tag => 
                    <Tag tag={tag} key={tag.id} />
                )}
            </div>
        </div>
    </div>
  );
};

