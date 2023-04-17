import MDEditor from "@uiw/react-md-editor";
import { useEffect } from "react";
import "../styles/editor.css"

const EventForm = ({ submitHandler, data, push }) => {

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="title">Заголовок</label>
        <input
          type="text"
          id="title"
          value={data["title"]}
          onChange={(val) => push("title", val.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Опис</label>
        <input
          type="text"
          id="description"
          value={data["description"]}
          onChange={(val) => push("description", val.target.value)}
          required
        />
      </div>
      <MDEditor
        data-color-mode="light"
        value={data["text"]}
        onChange={(val) => push("text", val)}
      />
      <div>
        <label htmlFor="imageUrl">Посилання на зображення</label>
        <input
          type="url"
          id="imageUrl"
          value={data["imageUrl"]}
          onChange={(val) => push("imageUrl", val.target.value)}
        />
      </div>
      <button type="submit">Підтвердити</button>
    </form>
  );
};

export default EventForm;
