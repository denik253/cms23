import React, { useCallback, useState } from "react";
import EventForm from "./eventForm";

const EditEventForm = ({ event, tabName, eventId, handleEditModalClose }) => {
  // const [title, setTitle] = useState(event.title);
  // const [description, setDescription] = useState(event.description);
  // const [text, setText] = useState(event.text);
  // const [imageUrl, setImageUrl] = useState(event.imageUrl);

  const [data, setData] = useState(event);
  const push = useCallback(
    (name, target) => {
      setData((prevState) => ({ ...prevState, [name]: target }));
    },
    [setData]
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await fetch(
        `https://react-http-b8565-default-rtdb.firebaseio.com/${tabName}/${eventId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      handleEditModalClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div id="modal">
      <div id="container">
        <EventForm submitHandler={submitHandler} data={data} push={push} />
        <button onClick={handleEditModalClose}>Закрити</button>
      </div>
    </div>
  );
};

export default EditEventForm;
