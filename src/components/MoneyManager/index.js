import {Component} from 'react'
import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

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

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    historyList: [],
    historyType: transactionTypeOptions[0].optionId,
  }

  titleChange = e => {
    this.setState({titleInput: e.target.value})
  }

  amountChange = e => {
    this.setState({amountInput: e.target.value})
  }

  typeChange = e => {
    this.setState({historyType: e.target.value})
  }

  formSubmit = e => {
    const {titleInput, amountInput, historyType} = this.state
    e.preventDefault()
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: amountInput,
      type: historyType,
    }
    this.setState(prevState => ({
      historyList: [...prevState.historyList, newTransaction],
      titleInput: '',
      amountInput: '',
      historyType: transactionTypeOptions[0].optionId,
    }))
  }

  TransactionDelete = id => {
    const {historyList} = this.state
    this.setState({
      historyList: historyList.filter(
        eachTransaction => eachTransaction.id !== id,
      ),
    })
  }

  balanceAmount = () => {
    const {historyList} = this.state

    let initialBalance = 0
    let incomeBalance = 0
    let expenseBalance = 0
    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].optionId) {
        incomeBalance += parseInt(eachTransaction.amount)
      } else {
        expenseBalance += parseInt(eachTransaction.amount)
      }
    })
    initialBalance = incomeBalance - expenseBalance
    return initialBalance
  }

  incomeAmount = () => {
    const {historyList} = this.state
    let incomeBalance = 0
    historyList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].optionId) {
        incomeBalance += parseInt(eachTransaction.amount)
      }
    })
    return incomeBalance
  }

  expensesAmount = () => {
    const {historyList} = this.state
    let expenseBalance = 0
    historyList.forEach(eachTransaction => {
      if (eachTransaction.type !== transactionTypeOptions[0].optionId) {
        expenseBalance += parseInt(eachTransaction.amount)
      }
    })
    return expenseBalance
  }

  render() {
    const {historyList, titleInput, amountInput, historyType} = this.state
    const balance = this.balanceAmount()
    const income = this.incomeAmount()
    const expenses = this.expensesAmount()

    return (
      <div className="app-container">
        <div className="money-manager-main-container">
          <div className="money-manager-name-container">
            <h1 className="money-manager-name-heading">Hi, Richard</h1>
            <p className="money-manager-name-description">
              Welcome back to your
              <span className="money-manager-span"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails balance={balance} income={income} expenses={expenses} />
          <div className="money-manager-form-and-history-main-container">
            <div className="money-manager-left-form-container">
              <h1 className="money-manager-add-transaction-heading">
                Add Transaction
              </h1>
              <form className="form-container" onSubmit={this.formSubmit}>
                <label htmlFor="title" className="label-text">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="TITLE"
                  id="title"
                  className="input-box"
                  onChange={this.titleChange}
                  value={titleInput}
                  required
                />
                <label htmlFor="amount" className="label-text">
                  AMOUNT
                </label>
                <input
                  type="amount"
                  id="amount"
                  placeholder="AMOUNT"
                  className="input-box"
                  onChange={this.amountChange}
                  value={amountInput}
                  required
                />
                <label htmlFor="type" className="label-text">
                  TYPE
                </label>
                <select
                  id="type"
                  className="input-box"
                  onChange={this.typeChange}
                  value={historyType}
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <button type="submit" className="form-button">
                  Add
                </button>
              </form>
            </div>
            <div className="money-manager-history-main-container">
              <h1 className="money-manager-add-transaction-heading">History</h1>

              <ul className="transaction-history-list-main-container">
                <li className="history-title-container">
                  <p className="history-titles">Title</p>
                  <p className="history-titles">Amount</p>
                  <p className="history-titles">Type</p>
                </li>
                {historyList.map(eachHistory => (
                  <TransactionItem
                    TransactionDetails={eachHistory}
                    TransactionDelete={this.TransactionDelete}
                    key={eachHistory.id}
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

/*
class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionsList: updatedTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
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
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="heading">Hi, Richard</h1>
            <p className="header-content">
              Welcome back to your
              <span className="money-manager-text"> Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-details">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="transaction-header">Add Transaction</h1>
              <label className="input-label" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitleInput}
                className="input"
                placeholder="TITLE"
              />
              <label className="input-label" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input"
                value={amountInput}
                onChange={this.onChangeAmountInput}
                placeholder="AMOUNT"
              />
              <label className="input-label" htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                className="input"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <div className="history-transactions">
              <h1 className="transaction-header">History</h1>
              <div className="transactions-table-container">
                <ul className="transactions-table">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
*/
