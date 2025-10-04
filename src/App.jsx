import React, { useState, useEffect } from 'react';
import './App.css';

// --- 컴포넌트들 ---

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

function TransactionForm({ type, categories, onTransactionSubmit, editingItem, onCancelEdit }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(Object.keys(categories)[0]);
  const [description, setDescription] = useState('');
  
  const isEditing = editingItem && editingItem.type === type;

  // 수정할 항목(editingItem)이 바뀌면, 입력 폼의 상태를 그 항목의 데이터로 채웁니다.
  useEffect(() => {
    if (isEditing) {
      setAmount(editingItem.item.amount);
      setCategory(editingItem.item.category);
      setDescription(editingItem.item.description);
    }
  }, [editingItem, type]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!amount || !description) return alert('금액과 내용을 입력해주세요.');
    
    const transactionData = { amount: parseInt(amount), category, description };
    if (isEditing) {
      onTransactionSubmit({ ...transactionData, id: editingItem.item.id });
    } else {
      onTransactionSubmit(transactionData);
    }
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setCategory(Object.keys(categories)[0]);
    setDescription('');
    if (isEditing) onCancelEdit();
  };

  const isExpense = type === 'expense';
  const title = isEditing ? (isExpense ? '지출 수정' : '수입 수정') : (isExpense ? '지출 기록' : '수입 기록');
  const buttonClass = isExpense ? 'btn' : 'btn income-btn';
  const emojiMap = isExpense 
    ? {'식비':'🍔','교통':'🚌','학업':'📚','쇼핑':'🛍️','동아리':'🎪','카페':'☕','미용':'💄','의료':'🏥','운동':'💪','투자':'📈'}
    : {'월급':'💼','용돈':'💵','부수입':'📈','금융소득':'🏦','기타':'📎'};

  return (
    <div className="card">
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><input type="number" placeholder="금액" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
        <div className="form-group">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {Object.keys(categories).map(cat => (<option key={cat} value={cat}>{emojiMap[cat]} {cat}</option>))}
          </select>
        </div>
        <div className="form-group"><input type="text" placeholder="내용" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
        
        {isEditing ? (
          <div className="btn-group">
            <button type="submit" className={buttonClass}>수정 완료</button>
            <button type="button" className="btn cancel-btn" onClick={resetForm}>취소</button>
          </div>
        ) : (
          <button type="submit" className={buttonClass}>{isExpense ? '지출 추가' : '수입 추가'}</button>
        )}
      </form>
    </div>
  );
}

function TransactionItem({ item, type, onDelete, onStartEdit }) {
  const emojiMap = type === 'expense' 
    ? {'식비':'🍔','교통':'🚌','학업':'📚','쇼핑':'🛍️','동아리':'🎪','카페':'☕','미용':'💄','의료':'🏥','운동':'💪','투자':'📈'}
    : {'월급':'💼','용돈':'💵','부수입':'📈','금융소득':'🏦','기타':'📎'};

  return (
    <div className="list-item">
      <div className="item-icon">{emojiMap[item.category]}</div>
      <div className="item-info">
        <div className="item-category">{item.category}</div>
        <div className="item-description">{item.description}</div>
      </div>
      <div className="item-actions">
        <div className="item-amount">{item.amount.toLocaleString()}원</div>
        <button className="action-btn" onClick={() => onStartEdit(item, type)}>✏️</button>
        <button className="action-btn delete-btn" onClick={() => onDelete(item.id)}>🗑️</button>
      </div>
    </div>
  );
}

function TransactionList({ title, items, type, onDeleteItem, onStartEditItem }) {
  return (
    <div className="card list-container">
      <h3>{title}</h3>
      <div className="list-content">
        {items.length === 0 && <p className="empty-message">내역이 없습니다.</p>}
        {items.sort((a, b) => b.id - a.id).map(item => (
          <TransactionItem key={item.id} item={item} type={type} onDelete={onDeleteItem} onStartEdit={onStartEditItem} />
        ))}
      </div>
    </div>
  );
}

// --- 메인 App 컴포넌트 ---
function App() {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // 어떤 항목을 수정 중인지 기억하는 State

  const expenseCategories = {'식비':'🍔','교통':'🚌','학업':'📚','쇼핑':'🛍️','동아리':'🎪','카페':'☕','미용':'💄','의료':'🏥','운동':'💪','투자':'📈'};
  const incomeCategories = {'월급':'💼','용돈':'💵','부수입':'📈','금융소득':'🏦','기타':'📎'};

  // 추가 또는 수정 함수
  const handleExpenseSubmit = (data) => {
    if (editingItem && editingItem.type === 'expense') { // 수정 모드일 때
      setExpenses(prev => prev.map(item => item.id === data.id ? { ...item, ...data } : item));
      setEditingItem(null);
    } else { // 추가 모드일 때
      setExpenses(prev => [...prev, { ...data, id: Date.now() }]);
    }
  };
  const handleIncomeSubmit = (data) => {
    if (editingItem && editingItem.type === 'income') { // 수정 모드일 때
      setIncomes(prev => prev.map(item => item.id === data.id ? { ...item, ...data } : item));
      setEditingItem(null);
    } else { // 추가 모드일 때
      setIncomes(prev => [...prev, { ...data, id: Date.now() }]);
    }
  };

  const deleteExpense = (id) => setExpenses(prev => prev.filter(item => item.id !== id));
  const deleteIncome = (id) => setIncomes(prev => prev.filter(item => item.id !== id));

  // 수정 시작/취소 함수
  const handleStartEdit = (item, type) => setEditingItem({ item, type });
  const handleCancelEdit = () => setEditingItem(null);
  
  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="container">
      <h1>나의 자산 관리</h1>
      <SummaryCard income={totalIncome} expense={totalExpense} />
      <div className="forms-container">
        <TransactionForm type="expense" categories={expenseCategories} onTransactionSubmit={handleExpenseSubmit} editingItem={editingItem} onCancelEdit={handleCancelEdit} />
        <TransactionForm type="income" categories={incomeCategories} onTransactionSubmit={handleIncomeSubmit} editingItem={editingItem} onCancelEdit={handleCancelEdit} />
      </div>
      <div className="lists-container">
        <TransactionList title="📝 지출 내역" items={expenses} type="expense" onDeleteItem={deleteExpense} onStartEditItem={handleStartEdit} />
        <TransactionList title="💰 수입 내역" items={incomes} type="income" onDeleteItem={deleteIncome} onStartEditItem={handleStartEdit} />
      </div>
    </div>
  );
}

export default App;