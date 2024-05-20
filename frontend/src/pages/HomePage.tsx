import "../styling/HomePage.css";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext";

const UserProfile: React.FC = () => {
  const { user } = useUser();

  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    console.log("User data in UserProfile:", user); // Debugging line
  }, [user]);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const passwordDisplay = isPasswordVisible
    ? user?.password
    : "*".repeat(user?.password.length || 0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredPurchases, setFilteredPurchases] = useState(
    user?.purchaseHistory || []
  );
  const handleStartDateChange = (date: Date | null) => setStartDate(date);
  const handleEndDateChange = (date: Date | null) => setEndDate(date);

  const filterPurchases = () => {
    if (!startDate || !endDate) return;

    const filteredData = (user?.purchaseHistory || []).filter((item) => {
      const purchaseDate = new Date(item.purchaseDate);
      return purchaseDate >= startDate && purchaseDate <= endDate;
    });

    setFilteredPurchases(filteredData);
  };

  const handleTitleClick = () => {
    navigate("/landing");
  };

  return (
    <div className="user-profile">
      <h1
        className="store-title"
        onClick={handleTitleClick}
        style={{ cursor: "pointer" }}
      >
        NerdStore
      </h1>
      <h1 className="page-title">Your Account Details</h1>
      <div className="user-profile-content">
        <div className="user-info">
          <div className="user-item">
            <p>Full Name: {user?.firstName}</p>
          </div>
          <div className="user-item">
            <p>Last Name: {user?.lastName}</p>
          </div>
          <div className="user-item">
            <p>Email: {user?.email}</p>
          </div>
          <div className="user-item">
            <p>Username: {user?.username}</p>
          </div>
          <div className="user-item">
            <p>Date of Birth: {user?.dateOfBirth}</p>
          </div>
          <div className="user-item">
            <p>
              Password: {passwordDisplay}
              <button onClick={togglePasswordVisibility} className="button">
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </p>
          </div>
        </div>

        <div className="order-history">
          <h3>Purchase History</h3>
          <div className="filtering">
            <div className="date-selector">
              <label htmlFor="start-date">Start Date:</label>
              <DatePicker
                id="start-date"
                selected={startDate}
                onChange={handleStartDateChange}
                className="datepicker"
              />
            </div>

            <div className="date-selector">
              <label htmlFor="end-date">End Date:</label>
              <DatePicker
                id="end-date"
                selected={endDate}
                onChange={handleEndDateChange}
                className="datepicker"
              />{" "}
            </div>
            <button onClick={filterPurchases} className="filter-button">
              Filter
            </button>
          </div>

          <div className="table-overflow">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Purchase Date</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.productName}</td>
                    <td>{item.purchaseDate}</td>
                    <td>{item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
