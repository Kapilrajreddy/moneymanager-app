// Write your code here
import './index.css'

const TransactionItem = props => {
  const {TransactionDetails, TransactionDelete} = props
  console.log(TransactionDetails)
  const {title, amount, type, id} = TransactionDetails

  const deleteTransaction = () => {
    TransactionDelete(id)
  }

  return (
    <li className="transaction-item-list">
      <p className="transaction-item-list-history-text">{title}</p>
      <p className="transaction-item-list-history-text">{amount}</p>
      <p className="transaction-item-list-history-text">{type}</p>
      <div>
        <button
          type="button"
          className="delete-button"
          onClick={deleteTransaction}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}
export default TransactionItem
/*
const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li className="table-row">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text">Rs {amount}</p>
      <p className="transaction-text">{type}</p>
      <div className="delete-container">
        <button
          className="delete-button"
          type="button"
          onClick={onDeleteTransaction}
          data-testid="delete"
        >
          <img
            className="delete-img"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem

*/
