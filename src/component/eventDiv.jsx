import DeleteButton from "./deleteEventButton";
import EditEventForm from "./editEventForm";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";


const EventDiv = ({ event, tabName }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editEventId, setEditEventId] = useState(null);

  const handleDelete = async (id) => {
    try {
      // Видаляємо елемент з бази даних
      const response = await fetch(
        `https://react-http-b8565-default-rtdb.firebaseio.com/${tabName}/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event.");
      }

      // Оновлюємо стан списку подій, виключаючи видалений елемент
      setEvents((prevEvents) => {
        return prevEvents.filter((event) => event.id !== id);
      });
    } catch (error) {
      console.log(error.message);
    }
    location.reload();
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    setEditEventId(event.id);
  };

  const handleEditModalClose = () => {
    setEditEventId(null);
  };

  return (
    <div
      id="event"
    >
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <img src={event.imageUrl} alt={event.title} />
      <a id="toEvent" href={`/${tabName}/${event.id}`} ></a>
      {editEventId === event.id && (
        <div>
          <EditEventForm
            event={selectedEvent}
            tabName={tabName}
            handleEditModalClose={handleEditModalClose}
            eventId={event.id}
          />
          <button onClick={handleEditModalClose}>Закрити</button>
        </div>
      )}
      <div id="actions"
              style={{
                display:
                  localStorage.getItem("token") &&
                  localStorage.getItem("email") === "qwerty12@gmail.com"
                    ? !"block"
                    : "none",
              }}
      >
        <FontAwesomeIcon
          icon={faPen}
          onClick={() => handleEditClick(event)}
          className="icon"
        />
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => handleDelete(event.id)}
          className="icon"
        />
      </div>
    </div>
  );
};

export default EventDiv;
