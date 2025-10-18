import React from 'react';

function SummaryCard({ income, expense }) {
  const total = income - expense;
  return (
    <div className="card summary-section">
      <div className="summary-item summary-income"><div className="label">월간 총 수입</div><div className="amount">{income.toLocaleString()}원</div></div>
      <div className="summary-item summary-expense"><div className="label">월간 총 지출</div><div className="amount">{expense.toLocaleString()}원</div></div>
      <div className="summary-item summary-total"><div className="label">합계</div><div className="amount" style={{ color: total >= 0 ? '#27ae60' : '#c0392b' }}>{total.toLocaleString()}원</div></div>
    </div>
  );
}

export default SummaryCard;