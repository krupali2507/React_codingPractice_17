// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetail, onDeleteTransactionHistory} = props
  const {id, title, amount, type} = transactionDetail

  const onClickingDelete = () => {
    onDeleteTransactionHistory(id)
  }

  return (
    <li className="table-header">
      <p className="table-header-cell">{title}</p>
      <p className="table-header-cell">{amount}</p>
      <p className="table-header-cell">{type}</p>
      <button
        type="button"
        onClick={onClickingDelete}
        className="delete-btn"
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default TransactionItem
