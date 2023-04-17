import React, { useState } from "react";

const DynamicForm = ({ fields, setFields }) => {
const [formValues, setFormValues] = useState({});

    const addField = (type) => {
    const nextIndex = fields.length + 1;
    const newFieldName = `${nextIndex}${type.name}`;
    setFields([...fields, { ...type, name: newFieldName, value: "" }]);
    };

  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleChange = (event, fieldName) => {
    setFormValues({ ...formValues, [fieldName]: event.target.value });
  };

  return (
    <div>
      {Array.isArray(fields) &&
        fields.map((field, index) => {
          return (
            <div key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={(event) => {
                  const newFields = [...fields];
                  newFields[index].value = event.target.value;
                  setFields(newFields);
                  handleChange(event, field.name); // Обновляем объект с значениями полей формы
                }}
              />
              <button type="button" onClick={() => removeField(index)}>
                Remove
              </button>
            </div>
          );
        })}
      <div>
        <button
          type="button"
          onClick={() =>
            addField({
              name: "title2",
              label: "Title",
              type: "text",
              value: "",
            })
          }
        >
          Add Title Field
        </button>
        <button
          type="button"
          onClick={() =>
            addField({
              name: "text2",
              label: "Text",
              type: "text",
              value: "",
            })
          }
        >
          Add Text Field
        </button>
        <button
          type="button"
          onClick={() =>
            addField({
              name: "imageUrl2",
              label: "Image URL",
              type: "url",
              value: "",
            })
          }
        >
          Add Image URL Field
        </button>
      </div>
      <div>
        <p>Form values: {JSON.stringify(formValues)}</p>
      </div>
    </div>
  );
};

export default DynamicForm;
