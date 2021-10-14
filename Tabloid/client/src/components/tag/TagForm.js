import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addTag,  } from "../../modules/TagManager";

const TagForm = () => {
  const history = useHistory();
  // const { tagId } = useParams();
  const [tag, setTag] = useState();

  const handleControlledInputChange = (event) => {
  const newTag = { ...tag } 
  newTag[event.target.id] = event.target.value
  setTag(newTag)
  }

  const handleClickSubmitForm = () => {
    if (tagId) {
    updateTag({id: tag.id, name: tag.name})
    .then(() => history.push("/tags"))
    }
    else {
      const newTag = {
        name: tag.name
    }
    addTag(newTag)
      .then(() => history.push("/tags"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));

    }}
  // const submitForm = (e) => {
  //   e.preventDefault();
  //   addTag({ name: tag.name })
  //     .then(() => history.push("/tags"))
  // };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="tagText">Tag</Label>
        <Input id="tag" type="textarea" onChange={e => setTag(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}
export default TagForm;