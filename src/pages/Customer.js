import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "../components/NotFound";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");

  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!customer || !tempCustomer) return;

    let equal = true;

    if (customer.name !== tempCustomer.name) equal = false;

    if (customer.industry !== tempCustomer.industry) equal = false;

    if (equal) {
      setChanged(false);
    }
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

        if (!response.ok) {
          throw new Error("Something went wrong, try again later");
        }

        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  function updateCustomer(e) {
    e.preventDefault();

    const url = baseUrl + "api/customers/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setChanged(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <div className="p-3">
      {notFound ? <NotFound /> : null}
      {customer ? (
        <div>
          <p className="font-bold">ID: {customer.id}</p>
          <form
            id="customerForm"
            onSubmit={updateCustomer}
            className="w-full max-w-sm"
          >
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label htmlFor="name">Name</label>
              </div>
              <div className="md:w-2/3">
                <input
                  id="name"
                  className="bg-gray-100 appearance-none border-1 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.name}
                  onChange={(e) => {
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                    setChanged(true);
                  }}
                ></input>
              </div>
            </div>

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label htmlFor="industry">Industry</label>
              </div>
              <div className="md:w-2/3">
                <input
                  id="industry"
                  className="bg-gray-100 appearance-none border-1 border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={tempCustomer.industry}
                  onChange={(e) => {
                    setTempCustomer({
                      ...tempCustomer,
                      industry: e.target.value,
                    });
                    setChanged(true);
                  }}
                ></input>
              </div>
            </div>
          </form>

          {changed ? (
            <div className="mb-2">
              <button
                className="mr-2 bg-slate-500 hover:bg-gray-700 text-white py-1 px-3 rounded"
                onClick={(e) => {
                  setTempCustomer({ ...customer });
                  setChanged(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-800 text-white py-1 px-3 rounded"
                form="customerForm"
              >
                Save
              </button>
            </div>
          ) : null}

          <button
            className="block bg-slate-800 hover:bg-red-700 text-white py-1 px-3 rounded"
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
                  setError(e.message);
                });
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br></br>
      <Link
        to="/customers"
        className="bg-slate-500 hover:bg-gray-700 text-white py-1 px-3 rounded no-underline"
      >
        ← Go back
      </Link>
    </div>
  );
}
