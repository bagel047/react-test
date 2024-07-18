import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);

  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("customer", customer);
    console.log("temp", tempCustomer);
    console.log("changed", changed);
  });

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
        setCustomer(data.customer);
        setTempCustomer(data.customer);
      });
  }, []);

  function updateCustomer() {
    const url = baseUrl + "api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
      });
  }

  return (
    <>
      {notFound ? <NotFound /> : null}
      {customer ? (
        <>
          <p className="px-2 block my-2">ID: {customer.id}</p>
          <input
            className="px-2 block my-2"
            type="text"
            value={tempCustomer.name}
            onChange={(e) => {
              setTempCustomer({ ...tempCustomer, name: e.target.value });
              setChanged(true);
            }}
          ></input>
          <input
            className="px-2 block my-2"
            type="text"
            value={tempCustomer.industry}
            onChange={(e) => {
              setTempCustomer({ ...tempCustomer, industry: e.target.value });
              setChanged(true);
            }}
          ></input>

          {changed ? (
            <>
              <button
                className="mr-2"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button onClick={updateCustomer}>Save</button>
            </>
          ) : null}

          <button
            className="block"
            onClick={(e) => {
              const url = baseUrl + "api/customers/" + id;
              fetch(url, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Something went wrong");
                  }
                  navigate("/customers");
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            Delete
          </button>
          <br></br>
          <Link to="/customers">Go back</Link>
        </>
      ) : null}
    </>
  );
}
