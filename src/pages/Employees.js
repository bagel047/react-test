import "../index.css";
import Employee from "../components/Employee";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditEmployee from "../components/EditEmployee";
import AddEmployee from "../components/AddEmployee";
import Header from "../components/Header";

function Employees() {
  const [role, setRole] = useState("dev");
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John",
      role: "Intern",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      id: 2,
      name: "Abby",
      role: "Dev",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      id: 3,
      name: "David",
      role: "Manager",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      id: 4,
      name: "Sarah",
      role: "HR",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      id: 5,
      name: "James",
      role: "Intern",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      id: 6,
      name: "Travis",
      role: "Dev",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    const updatedEmployees = employees.map((employee) => {
      if (id == employee.id) {
        return { ...employee, name: newName, role: newRole };
      }

      return employee;
    });
    setEmployees(updatedEmployees);
  }

  function addEmployee(name, role, img) {
    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img,
    };
    setEmployees([...employees, newEmployee]);
  }

  return (
    <div id="employees" className="">
      <div className="flex flex-wrap justify-center">
        {employees.map((employee) => {
          const editEmployee = (
            <EditEmployee
              id={employee.id}
              name={employee.name}
              role={employee.role}
              updateEmployee={updateEmployee}
            />
          );

          return (
            <Employee
              key={employee.id}
              id={employee.id}
              name={employee.name}
              role={employee.role}
              img={employee.img}
              editEmployee={editEmployee}
            />
          );
        })}
      </div>
      <AddEmployee addEmployee={addEmployee} />
    </div>
  );
}

export default Employees;
