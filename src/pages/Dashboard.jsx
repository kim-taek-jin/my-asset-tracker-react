import React from 'react';
import { useOutletContext } from 'react-router-dom';
import SummaryCard from '../components/SummaryCard';
import TransactionForm from '../components/TransactionForm';

function Dashboard() {
  const { incomes, expenses, editingItem, handleExpenseSubmit, handleIncomeSubmit, handleCancelEdit } = useOutletContext();
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <SummaryCard income={totalIncome} expense={totalExpense} />
      <div className="forms-container">
        <TransactionForm type="expense" onTransactionSubmit={handleExpenseSubmit} editingItem={editingItem} onCancelEdit={handleCancelEdit} />
        <TransactionForm type="income" onTransactionSubmit={handleIncomeSubmit} editingItem={editingItem} onCancelEdit={handleCancelEdit} />
      </div>
    </>
  );
}

export default Dashboard;