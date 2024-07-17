import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const url = baseUrl + "api/customers/" + id;
    fetch(url)
      .then((response) => {
        // redirect to a 404 page (new URL)
        // if (response.status === 404) {
        //   navigate("/404");
        // }

        // render a 404 component in this page
        if (response.status === 404) {
          setNotFound(true);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCustomer(data.customer);
      });
  }, []);

  return (
    <>
      {notFound ? <NotFound /> : null}
      {customer ? (
        <>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
          <Link to="/customers">Go back</Link>
        </>
      ) : null}
    </>
  );
}
