import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DefinitionSearch() {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  return (
    <form
      className="flex space-between space-x-2 max-w-[300px]"
      onSubmit={(e) => {
        e.preventDefault();
        navigate("/dictionary/" + word);
      }}
    >
      <input
        className="px-2 py-1 rounded border-1 border-slate-600"
        placeholder="Apple"
        type="text"
        onChange={(e) => {
          setWord(e.target.value);
          console.log(word);
        }}
      />
      <button className="rounded bg-gray-800 hover:bg-gray-900 text-white px-3 py-1">
        Search
      </button>
    </form>
  );
}
