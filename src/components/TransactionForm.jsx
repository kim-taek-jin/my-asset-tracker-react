import React, { useState, useEffect } from 'react';

function TransactionForm({ type, onTransactionSubmit, editingItem, onCancelEdit }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(type === 'expense' ? '식비' : '월급');
  const [description, setDescription] = useState('');
  const isEditing = editingItem && editingItem.type === type;

  useEffect(() => {
    if (isEditing) {
      setAmount(editingItem.item.amount);
      setCategory(editingItem.item.category);
      setDescription(editingItem.item.description);
    }
  }, [isEditing, editingItem]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!amount || !description) return alert('금액과 내용을 입력해주세요.');
    const transactionData = { amount: parseInt(amount), category, description };
    onTransactionSubmit(isEditing ? { ...transactionData, id: editingItem.item.id } : transactionData);
    resetForm();
  };

  const resetForm = () => {
    setAmount('');
    setCategory(type === 'expense' ? '식비' : '월급');
    setDescription('');
    if (isEditing) onCancelEdit();
  };

  const expenseCategories = {'식비':'🍔','교통':'🚌','학업':'📚','쇼핑':'🛍️','동아리':'🎪','카페':'☕','미용':'💄','의료':'🏥','운동':'💪','투자':'📈'};
  const incomeCategories = {'월급':'💼','용돈':'💵','부수입':'📈','금융소득':'🏦','기타':'📎'};
  const categories = type === 'expense' ? expenseCategories : incomeCategories;
  const title = isEditing ? '내역 수정' : (type === 'expense' ? '지출 기록' : '수입 기록');
  
  return (
    <div className="card">
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group"><input type="number" placeholder="금액" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
        <div className="form-group"><select value={category} onChange={(e) => setCategory(e.target.value)}>{Object.keys(categories).map(cat => (<option key={cat} value={cat}>{categories[cat]} {cat}</option>))}</select></div>
        <div className="form-group"><input type="text" placeholder="내용" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
        {isEditing ? (
          <div className="btn-group">
            <button type="submit" className={type === 'expense' ? 'btn' : 'btn income-btn'}>수정 완료</button>
            <button type="button" className="btn cancel-btn" onClick={resetForm}>취소</button>
          </div>
        ) : (
          <button type="submit" className={type === 'expense' ? 'btn' : 'btn income-btn'}>{type === 'expense' ? '지출 추가' : '수입 추가'}</button>
        )}
      </form>
    </div>
  );
}

export default TransactionForm;