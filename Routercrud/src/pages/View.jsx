import React, { useState } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './View.css'

function View() {
  const navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];
  const [record, setRecord] = useState(data);
  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleDelete = (id) => {
    const updatedRecords = record.filter(user => user.id !== id);
    setRecord(updatedRecords);
    localStorage.setItem('users', JSON.stringify(updatedRecords));
  };

  const handleSelect = (id) => {
    if (selectedRecords.includes(id)) {
      setSelectedRecords(selectedRecords.filter(recordId => recordId !== id));
    } else {
      setSelectedRecords([...selectedRecords, id]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedRecords = record.filter(user => !selectedRecords.includes(user.id));
    setRecord(updatedRecords);
    setSelectedRecords([]);
    localStorage.setItem('users', JSON.stringify(updatedRecords));
  };

  return (
    <div>
      <Header />

      <div className="container">
        <div className="row">
          <button className="btn btn-danger mb-2 col-1" onClick={handleDeleteSelected} disabled={selectedRecords.length === 0}>
            Delete Selected
          </button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRecords(record.map(user => user.id));
                      } else {
                        setSelectedRecords([]);
                      }
                    }}
                    checked={selectedRecords.length === record.length}
                  />
                </th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Course</th>
                <th scope="col">Phone No.</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((val) => (
                <tr key={val.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(val.id)}
                      onChange={() => handleSelect(val.id)}
                    />
                  </td>
                  <td>{val.firstname}</td>
                  <td>{val.lastname}</td>
                  <td>{val.email}</td>
                  <td>{val.gender}</td>
                  <td>{val.course.join(' , ')}</td>
                  <td>{val.phone}</td>
                  <td>{val.date}</td>
                  <td>
                    {val.status === 'active' ? (
                      <button className="btn btn-success btn-sm">{val.status}</button>
                    ) : (
                      <button className="btn btn-warning btn-sm">{val.status}</button>
                    )}
                  </td>
                  <td className="button">
                    <button className="btn btn-danger" onClick={() => handleDelete(val.id)}>
                      Delete
                    </button>
                    <button onClick={() => navigate('/edit', { state: val })} className="btn btn-info">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default View;
