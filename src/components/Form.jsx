import React from 'react'

const Form = (props) => {
  const { onNameChange, onCardNumberChange, onCcvChange, onMonthChange, onYearChange, onSubmit,
    errors, cardInvalid, dateInvalid, cardType,
    name, cardNumber, ccv, month, year } = props
  return (
    <div className="payment-form">
      <h3>
        Enter your credit card information
      </h3>
      <input
        value={ name }
        onChange={ onNameChange }
        type="text"
        placeholder="Name"
      />
      { errors.name && <p className="error">Please enter a name</p> }
      <input
        value={ cardNumber }
        onChange={ onCardNumberChange }
        type="text"
        placeholder="Card Number"
      />
      { errors.cardNumber && <label className="error">Please enter a Card Number</label> }
      <input
        value={ ccv }
        onChange={ onCcvChange }
        type="text"
        placeholder="CCV2"
        />
      { errors.ccv && <label className="error">Please enter a CCV2 number</label> }
      <div className="expiration">
        <input
          value={ month }
          onChange={ onMonthChange }
          type="text"
          placeholder="Exp. Month"/>
        <input
          value={ year }
          onChange={onYearChange }
          type="text"
          placeholder="Exp. Year"/>
      </div>
      { dateInvalid && <label className="error">Please enter a valid future date</label> }
      <div className="credit-card-logos">
        <img
          src="images/visa.gif"
          className={ cardType === 'visa' ? '' : 'disabled' }
        />
        <img
          src="images/amex.gif"
          className={ cardType === 'amex' ? '' : 'disabled' }
        />
      </div>
      { cardInvalid && <label className="error">Please enter a valid card number</label> }
      <button onClick={ onSubmit }>Submit</button>
    </div>
  )
}

export default Form
