import React from 'react';

function TransactionItem({ item, type, onDelete, onStartEdit }) {
    const emojiMap = type === 'expense' ? {'식비':'🍔','교통':'🚌','학업':'📚','쇼핑':'🛍️','동아리':'🎪','카페':'☕','미용':'💄','의료':'🏥','운동':'💪','투자':'📈'} : {'월급':'💼','용돈':'💵','부수입':'📈','금융소득':'🏦','기타':'📎'};
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
          {items.sort((a, b) => b.id - a.id).map(item => (<TransactionItem key={item.id} item={item} type={type} onDelete={onDeleteItem} onStartEdit={onStartEditItem} />))}
        </div>
      </div>
    );
}

export default TransactionList;