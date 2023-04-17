import React, { useState } from "react";

const EditEventForm = ({ event, onEdit, tabName, id}) => {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [text, setText] = useState(event.text);
  const [imageUrl, setImageUrl] = useState(event.imageUrl);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const updatedEvent = {
        title,
        description,
        text,
        imageUrl,
      };
      await fetch(
        `https://react-http-b8565-default-rtdb.firebaseio.com/${tabName}/${id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      onEdit(updatedEvent);
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
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditEventForm;
