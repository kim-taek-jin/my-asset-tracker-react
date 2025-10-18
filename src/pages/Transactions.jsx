import React from 'react';
import { useOutletContext } from 'react-router-dom';
import TransactionList from '../components/TransactionList';

function Transactions() {
    const { incomes, expenses, deleteExpense, deleteIncome, handleStartEdit } = useOutletContext();
    return (
        <div className="lists-container">
            <TransactionList title="📝 지출 내역" items={expenses} type="expense" onDeleteItem={deleteExpense} onStartEditItem={handleStartEdit} />
            <TransactionList title="💰 수입 내역" items={incomes} type="income" onDeleteItem={deleteIncome} onStartEditItem={handleStartEdit} />
        </div>
    );
}

export default Transactions;