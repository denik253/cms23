import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./deleteEventButton";
import EditEventForm from "./editEventForm";

const EventList = ({ tabName }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEventId, setEditEventId] = useState(null);

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
          });
        }

        loadedEvents.sort((a, b) => b.id.localeCompare(a.id));
        console.log(loadedEvents);

        setEvents(loadedEvents);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchEvents();
  }, [tabName]);

  const handleDelete = async (id) => {
    try {
      // Удаляем элемент из базы данных
      const response = await fetch(
        `https://react-http-b8565-default-rtdb.firebaseio.com/${tabName}/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event.");
      }

      // Обновляем состояние списка событий, исключая удаленный элемент
      setEvents((prevEvents) => {
        return prevEvents.filter((event) => event.id !== id);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setEditEventId(event.id);
  };

  const handleEditModalClose = () => {
    setEditEventId(null);
  };

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/${tabName}/${event.id}`}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <img src={event.imageUrl} alt={event.title} />
            </Link>
            <div>
              <div>
                <button onClick={() => handleEditClick(event)}>Edit</button>
                <DeleteButton id={event.id} handleDelete={handleDelete} />
              </div>
              {editEventId === event.id && (
                <div>
                  <EditEventForm
                    event={selectedEvent}
                    tabName={tabName}
                    id={event.id}
                  />
                  <button onClick={handleEditModalClose}>Close</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
