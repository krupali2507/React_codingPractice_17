// Write your code here
import './index.css'

const MoneyManager = props => {
  const {imgUrl, alt, amountTitle, amount, applyClass, testid} = props
  console.log(amount)

  return (
    <li className={`money-info-container ${applyClass}`}>
      <div>
        <img src={imgUrl} alt={alt} className="amount-type-image" />
      </div>
      <div className="amount-type-container">
        <p>{amountTitle}</p>
        <p testid={testid}>Rs. {amount}</p>
      </div>
    </li>
  )
}

export default MoneyManager
