import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventDiv from "./eventDiv";
import Card from "react-bootstrap/Card";
import "./addEventButton.css";

const EventList = ({ tabName }) => {
  const [events, setEvents] = useState(null);
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  console.log(token);
  console.log(email);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://react-http-b8565-default-rtdb.firebaseio.com/${tabName}/.json`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const loadedEvents = [];

        for (const key in data) {
          loadedEvents.push({
            id: key,
            title: data[key].title,
            description: data[key].description,
            imageUrl: data[key].imageUrl,
            text: data[key].text,
          });
        }

        loadedEvents.sort((a, b) => b.id.localeCompare(a.id));
        // console.log(loadedEvents);

        setEvents(loadedEvents);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEvents();
  }, [tabName]);

  if (!events) {
    return <h1>Завантажуємо</h1>;
  }
  if (events.length === 0) {
    return <h1>На сторінці відсутні публікації :(</h1>;
  }

  return (
    <>
    <div id="pageEventsList">
      <div
        id="addEvents"
        style={{
          display:
            localStorage.getItem("token") &&
            localStorage.getItem("email") === "qwerty12@gmail.com"
              ? "block"
              : "none",
        }}
      >
        <Link to="/events/add">Додати нову подію</Link>
      </div>
      <div id="EventsList">
        <h1>Публікації</h1>
        <div id="content">
          {events.map((event) => (
            <EventDiv key={event.id} event={event} tabName={tabName} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default EventList;
