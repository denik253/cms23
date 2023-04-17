import React, { useState } from "react";
import DynamicForm from "./dynamicForm";

const AddEventForm = ({ tabName }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fields, setFields] = useState([]);
  const [formValues, setFormValues] = useState({});


  
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const dynamicFormValues = { ...formValues };
      fields.forEach((field) => {
        dynamicFormValues[field.name] = field.value;
      });

      const response = await fetch(`https://react-http-b8565-default-rtdb.firebaseio.com/${tabName}/event${new Date().getTime().toString()}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...dynamicFormValues, title, description, text, imageUrl})
      });   
  
      if (!response.ok) {
        throw new Error("Failed to add event.");
      }
  
      setTitle("");
      setDescription("");
      setText("");
      setImageUrl("");
      setFormValues({});
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="text">Text</label>
        <textarea
          id="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          required
        />
      </div>
      <DynamicForm
        fields={fields}
        setFields={setFields}
        onValuesChange={(values) =>
          setFormValues({
            ...values, // значения динамической формы
            title, // значение поля title
            description, // значение поля description
            text, // значение поля text
            imageUrl, // значение поля imageUrl
          })
        }
      />

      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEventForm;
