import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './App.css';

function App() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const handleExpenseSubmit = (data) => {
    if (data.id) { setExpenses(prev => prev.map(item => item.id === data.id ? data : item)); } 
    else { setExpenses(prev => [...prev, { ...data, id: Date.now() }]); }
    setEditingItem(null);
  };
  const handleIncomeSubmit = (data) => {
    if (data.id) { setIncomes(prev => prev.map(item => item.id === data.id ? data : item)); } 
    else { setIncomes(prev => [...prev, { ...data, id: Date.now() }]); }
    setEditingItem(null);
  };
  
  const deleteExpense = (id) => setExpenses(prev => prev.filter(item => item.id !== id));
  const deleteIncome = (id) => setIncomes(prev => prev.filter(item => item.id !== id));
  const handleStartEdit = (item, type) => setEditingItem({ item, type });
  const handleCancelEdit = () => setEditingItem(null);

  return (
    <div className="container">
      <h1>나의 자산 관리</h1>
      <nav className="card navigation">
        <NavLink to="/">대시보드</NavLink>
        <NavLink to="/transactions">전체 내역</NavLink>
      </nav>
      <main>
        <Outlet context={{
          incomes, expenses, editingItem,
          handleExpenseSubmit, handleIncomeSubmit,
          deleteExpense, deleteIncome,
          handleStartEdit, handleCancelEdit,
        }} />
      </main>
    </div>
  );
}

export default App;