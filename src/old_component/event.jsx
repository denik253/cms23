import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Event = ({ tabName }) => {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://react-http-b8565-default-rtdb.firebaseio.com/${tabName}/${eventId}.json`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch event.");
        }

        setEvent(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEvent();
  }, [tabName, eventId]);

  if (!event) {
    return <p>Loading...</p>;
  }

  const dynamicInfo = Object.entries(event).map(([key, value]) => {
    let element = null;
  
    if (key.endsWith("title2")) {
      element = <h2 key={key}>{value}</h2>;
    } else if (key.endsWith("text2")) {
      element = <p key={key}>{value}</p>;
    }
    return element;
  });

  return (
    <div>
      <div id="staticinfo">
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <img src={event.imageUrl} alt={event.title} />
        <p>{event.text}</p>
      </div>
      <div id="dinamicinfo">{dynamicInfo}</div>
    </div>
  );
};

export default Event;
