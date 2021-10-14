import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addTag } from "../../modules/TagManager";

export default function TagAddForm() {
  const history = useHistory();
  const [tagName, setTagName] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    addTag({ name: tagName })
      .then(() => history.push("/tags"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="tagText">Tag</Label>
        <Input id="tagName" type="textarea" onChange={e => setTagName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}