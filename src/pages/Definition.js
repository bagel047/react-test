import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate, Link } from "react-router-dom";
import NotFound from "../components/NotFound";
import DefinitionSearch from "../components/DefinitionSearch";
import { useLocation } from "react-router-dom";

export default function Definition() {
  const [word, setWord] = useState();
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState();

  let { search } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect:
  // no dependency array --> update for any state change
  // empty dependency array --> execute once (on page load)
  // passing in data --> only execute when those state variables are changed

  useEffect(() => {
    // const url = "https://httpstat.us/500";
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        }

        if (!response.ok) {
          setError(true);
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setWord(data[0].meanings);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [word]);

  if (notFound === true) {
    return (
      <>
        <NotFound />
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }
  if (error === true) {
    return (
      <>
        <p>Something went wrong, try again?</p>
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }

  return (
    <div className="mt-12">
      {word ? (
        <>
          <h1 className="mb-8">Here are definitions:</h1>
          {word?.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech}: {meaning.definitions[0].definition}
              </p>
            );
          })}
        </>
      ) : null}
      <p className="mt-8">Search again:</p>
      <DefinitionSearch />
    </div>
  );
}
