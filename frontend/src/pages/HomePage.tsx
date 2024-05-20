
import '../styling/HomePage.css';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
  userData: {
    firstName: string;
    lastName: string;
    dateOfBirth: string; 
    email: string;
    username: string;
    password: string;
    purchaseHistory: PurchaseHistoryItem[];
  };
}

interface PurchaseHistoryItem {
  id: number;
  productName: string;
  purchaseDate: string;
  price: number;
}

const examplePurchaseHistory = [
  { id: 1, productName: "Product A", purchaseDate: "2004-05-10", price: 20 },
  { id: 2, productName: "Product B", purchaseDate: "2020-01-15", price: 30 },
  { id: 3, productName: "Product C", purchaseDate: "2021-05-18", price: 40 },
  { id: 4, productName: "Product D", purchaseDate: "2022-07-12", price: 20 },
  { id: 5, productName: "Product E", purchaseDate: "2009-02-14", price: 30 },
  { id: 6, productName: "Product F", purchaseDate: "2023-03-11", price: 40 },
  { id: 7, productName: "Product G", purchaseDate: "2021-04-17", price: 20 },
  { id: 8, productName: "Product H", purchaseDate: "2004-01-11", price: 30 },
];

const UserProfile: React.FC<UserProfileProps> = ({ userData}) => {

  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const passwordDisplay = isPasswordVisible ? userData.password : '*'.repeat(userData.password.length);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredPurchases, setFilteredPurchases] = useState(examplePurchaseHistory);
  const handleStartDateChange = (date: Date | null) => setStartDate(date);
  const handleEndDateChange = (date: Date | null) => setEndDate(date);


  const filterPurchases = () => {
    if (!startDate || !endDate) return;

    const filteredData = examplePurchaseHistory.filter((item) => {
      const purchaseDate = new Date(item.purchaseDate);
      return purchaseDate >= startDate && purchaseDate <= endDate;
    });

    setFilteredPurchases(filteredData);
  };
  const handleTitleClick = () => {
    navigate('/landing');
  };

  return (
    <div className="user-profile">
        <h1 className="store-title" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
          NerdStore
        </h1>
      <h1 className='page-title'>Your Account Details</h1>
      <div className='user-profile-content'>
      <div className='user-info'>
          <div className='user-item'><h2>Full Name: {userData.firstName} {userData.lastName}</h2></div>
          <div className='user-item'><p>Email: {userData.email}</p></div>
          <div className='user-item'><p>Username: {userData.username}</p></div>
          <div className='user-item'><p>Date of Birth: {userData.dateOfBirth}</p></div>
          <div className='user-item'><p>Password: {passwordDisplay}
          <button onClick={togglePasswordVisibility} className='button'>{isPasswordVisible ? 'Hide' : 'Show'}</button></p></div>
      </div>

      <div className='order-history'>
        <h3>Purchase History</h3>
        <div className='filtering'>
          <div className='date-selector'>
          <label htmlFor="start-date">Start Date:</label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={handleStartDateChange}
            className="datepicker"
          /></div>

          <div className='date-selector'>
          <label htmlFor="end-date">End Date:</label>
          <DatePicker
            id="end-date"
            selected={endDate}
            onChange={handleEndDateChange}
            className="datepicker"
          /> </div>
          <button onClick={filterPurchases} className='filter-button'>Filter</button>
        </div>

        <div className='table-overflow'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Purchase Date</th>
              {examplePurchaseHistory.some((item) => item.price) && ( // Check if any item has price
                <th>Price</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.productName}</td>
                <td>{item.purchaseDate}</td>
                {item.price && <td>{item.price.toFixed(2)}</td>}
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  </div>
</div>
);};

export default UserProfile;
