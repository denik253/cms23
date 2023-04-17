import React, { useCallback, useEffect, useState } from "react";
import EventForm from "./eventForm";

const AddEventForm = ({ tabName }) => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [text, setText] = useState("");
  // const [imageUrl, setImageUrl] = useState("");
  // const [fields, setFields] = useState([]);
  // const [formValues, setFormValues] = useState({});

  const empty = {
    title: "",
    description: "",
    text: "",
    imageUrl: "",
  };

  const [data, setData] = useState(empty);

  const push = useCallback(
    (name, target) => {
      setData((prevState) => ({ ...prevState, [name]: target }));
    },
    [setData]
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(data);
    try {
      const response = await fetch(
        `https://react-http-b8565-default-rtdb.firebaseio.com/${tabName}/event${new Date()
          .getTime()
          .toString()}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add event.");
      }

      setData(empty);
    } catch (error) {
      console.log(error.message);
    }
  };

  return <EventForm submitHandler={submitHandler} data={data} push={push} />;
};

export default AddEventForm;
