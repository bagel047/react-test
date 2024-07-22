import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

export default function Customers() {
  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const url = baseUrl + "api/customers/";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }

        return response.json();
      })
      .then((data) => {
        setCustomers(data.customers);
      });
  }, []);

  function addCustomer(name, industry) {
    let data = {
      name: name,
      industry: industry,
    };
    data = JSON.stringify(data);
    const url = baseUrl + "api/customers/";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        toggleShow();
        setCustomers([...customers, data.customer]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function toggleShow() {
    setShow(!show);
  }

  return (
    <>
      <h1 className="mb-12">Here are our customers:</h1>
      {customers
        ? customers.map((customer) => {
            return (
              <div key={customer.id} className="mb-2">
                <Link to={"/customers/" + customer.id}>
                  <button className="min-w-[100px] bg-purple-600 hover:bg-purple-800 text-white py-2 px-4 rounded">
                    {customer.name}
                  </button>
                </Link>
              </div>
            );
          })
        : null}
      <AddCustomer
        addCustomer={addCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
