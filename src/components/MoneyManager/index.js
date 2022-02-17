import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const currentBalanceImageUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png'
const incomeImageUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png'
const expensesImageUrl =
  'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionHistoryList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  onSubmitTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionHistoryList: [
        ...prevState.transactionHistoryList,
        newTransaction,
      ],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteTransactionHistory = id => {
    this.setState(prevState => ({
      transactionHistoryList: prevState.transactionHistoryList.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
    }))
  }

  getTotalIncome = () => {
    const {transactionHistoryList} = this.state
    let incomeAmount = 0
    transactionHistoryList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getTotalExpenses = () => {
    const {transactionHistoryList} = this.state
    let expenseAmount = 0
    transactionHistoryList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expenseAmount += eachTransaction.amount
      }
    })
    return expenseAmount
  }

  getBalance = () => {
    const {transactionHistoryList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionHistoryList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {
      titleInput,
      amountInput,
      optionId,
      transactionHistoryList,
    } = this.state

    const incomeAmount = this.getTotalIncome()
    const expenseAmount = this.getTotalExpenses()
    const currentBalance = this.getBalance()

    return (
      <div className="bg-container">
        <div className="header-container">
          <h1 className="person-name">Hi, Richard</h1>
          <p>
            Welcome back to your <span className="app-name">Money Manager</span>
          </p>
        </div>
        <div className="account-summary-carousal">
          <MoneyDetails
            imgUrl={currentBalanceImageUrl}
            alt="balance"
            amountTitle="Your Balance"
            amount={currentBalance}
            applyClass="current-balance"
            testid="balanceAmount"
          />
          <MoneyDetails
            imgUrl={incomeImageUrl}
            alt="income"
            amountTitle="Your Income"
            amount={incomeAmount}
            applyClass="income-balance"
            testid="incomeAmount"
          />
          <MoneyDetails
            imgUrl={expensesImageUrl}
            alt="expenses"
            amountTitle="Your Expenses"
            amount={expenseAmount}
            applyClass="expenses-balance"
            testid="expensesAmount"
          />
        </div>
        <div className="account-history-container">
          <form className="form-carousal" onSubmit={this.onSubmitTransaction}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              onChange={this.onChangeTitle}
              value={titleInput}
              className="input-class"
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="text"
              onChange={this.onChangeAmount}
              value={amountInput}
              className="input-class"
            />
            <label htmlFor="type">TYPE</label>
            <select
              onChange={this.onChangeType}
              value={optionId}
              className="input-class"
            >
              {transactionTypeOptions.map(eachType => (
                <option key={eachType.optionId} value={eachType.optionId}>
                  {eachType.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="submit-button">
              Add
            </button>
          </form>

          <div className="history-carousal">
            <h1>History</h1>
            <div className="transaction-table-container">
              <ul className="transaction-table">
                <li className="table-header">
                  <p className="table-header-cell">Title</p>
                  <p className="table-header-cell">Amount</p>
                  <p className="table-header-cell">Type</p>
                </li>
                {transactionHistoryList.map(eachTransaction => (
                  <TransactionItem
                    transactionDetail={eachTransaction}
                    key={eachTransaction.id}
                    onDeleteTransactionHistory={this.onDeleteTransactionHistory}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
