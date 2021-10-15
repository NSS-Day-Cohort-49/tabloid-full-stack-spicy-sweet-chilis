import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addTag, getTagById, updateTag } from "../../modules/TagManager";

const TagForm = () => {
  const [tag, setTag] = useState();
  const { tagId } = useParams();
  const history = useHistory();

  useEffect(() => {
    if(tagId)
    {getTagById(tagId)
    .then(tag => {
      setTag(tag)
    })}
  }, [])

  const handleControlledInputChange = (event) => {
  const newTag = { ...tag } 
  newTag[event.target.id] = event.target.value
  setTag(newTag)
  }

  const handleClickSaveForm = () => {
    if (tagId) {
    updateTag({id: tag.id, name: tag.name})
    .then(() => history.push("/tags"))
    } else {
      const newTag = {
        name: tag.name
    }
    addTag(newTag)
      .then(() => history.push("/tags"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));

    }
  }

  return (
    <>
    <form className="tagForm">
      <h2 className="tagForm__title tag_header">Tag Form</h2>
        <fieldset>
          <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" required className="form-control" placeholder="Required" value={tag.name} onChange={handleControlledInputChange} />
          </div>
        </fieldset>
        <div className="buttons">
          <button className="btns" onClick={
            (event) => {
              event.preventDefault()
              handleClickSaveForm()
            }
          }>
          {tagId ? "Edit Tag" : "Save Tag"}
          </button>
          <button className="btns" onClick={() => history.goBack()}>Cancel</button>
        </div>
    </form>
    </>
  );
}
export default TagForm;