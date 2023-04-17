import React from "react";

const DeleteButton = ({ id, handleDelete }) => {
  const onClickHandler = () => {
    handleDelete(id);
  };

  return (
    <div>
      <button type="button" onClick={onClickHandler}>
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
