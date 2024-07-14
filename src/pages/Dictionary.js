import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dictionary() {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  // no dependency array --> update for any state change
  // empty dependency array --> execute once (on page load)
  // passing in data --> only execute when those state variables are changed

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
          console.log(word);
        }}
      />
      <button
        onClick={() => {
          navigate("/definition/" + word, { replace: true });
        }}
      >
        Search
      </button>
    </>
  );
}
