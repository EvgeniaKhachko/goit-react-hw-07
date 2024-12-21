import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, selectFilter } from "../../redux/filtersSlice";
import s from "./SearchBox.module.css";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <p className={s.text}>Find contacts by name</p>
      <input
        className={s.input}
        type="text"
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
};
