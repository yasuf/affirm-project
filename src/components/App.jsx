import React, { Component } from 'react'
import { isEmpty } from 'lodash'

import Spinner from './Spinner'
import Form from './Form'

const requiredFields = ['name', 'cardNumber', 'ccv', 'month', 'year']

class App extends Component {

  constructor() {
    super()
    this.state = {
      errors: {}
    }
  }

  onNameChange = (event) => {
    const name = event.target.value
    this.setState({ name })
  }

  onCardNumberChange = (event) => {
    let cardNumber = event.target.value
    const firstTwo = cardNumber.slice(0, 2)
    let cardType
    cardNumber = cardNumber.slice(0, 16)
    if (cardNumber[0] === '4') {
      cardType = 'visa'
    } else if (firstTwo === '34' || firstTwo === '37') {
      cardType = 'amex'
      cardNumber = cardNumber.slice(0, 15)
    }
    this.setState({ cardNumber, cardType })
  }

  onMonthChange = (event) => {
    let month = event.target.value
    if (month.length > 2) {
      month = month.slice(0, 2)
    }
    this.setState({ month })
  }

  onYearChange = (event) => {
    let year = event.target.value
    if (year.length > 4) {
      year = year.slice(0, 4)
    }
    this.setState({ year })
  }

  onCcvChange = (event) => {
    const { cardType } = this.state
    let ccv = event.target.value
    if ((!cardType || cardType === 'visa') && ccv.length > 3) {
      ccv = ccv.slice(0, 3)
    } else if(cardType === 'amex' && ccv.length > 4){
      ccv = ccv.slice(0, 4)
    }
   this.setState({ ccv })
  }

  isDateValid = () => {
    let { month, year } = this.state
    month = parseInt(month)
    year = parseInt(year)
    const currentDate = new Date()
    const currentMonth = parseInt(currentDate.getMonth()) + 1 //Because month count starts on 0
    const currentYear = parseInt(currentDate.getFullYear())
    if(currentYear > year ||
      (currentMonth > month && currentYear === year) ||
      !month || !year || month > 12) {
      this.setState({ dateInvalid: true })
      return false
    } else {
      this.setState({ dateInvalid: false })
      return true
    }
  }

  isCardValid = () => {
    const { cardType } = this.state
    if(!cardType) {
      this.setState({ cardInvalid: true })
      return false
    } else {
      this.setState({ cardInvalid: false })
      return true
    }
  }

  onSubmit = () => {
    const { name, cardNumber, month, ccv, year, errors, dateInvalid, cardType } = this.state
    requiredFields.forEach((field) => {
      if(!this.state[field]) {
        errors[field] = true
      } else {
        delete errors[field]
      }
    })
    if(Object.keys(errors).length === 0 && !dateInvalid && cardType &&
      this.isCardValid() && this.isDateValid()) {
      this.submitForm()
    }
  }

  submitForm = () => {
    this.setState({ processingPayment: true })
    setTimeout(() => {
      this.setState({
        processingPayment: false,
        formSubmitted: true
      })
    }, 500)
  }

  render() {
    const { name, cardNumber, month, ccv,
      year, cardType, errors, dateInvalid,
      processingPayment, formSubmitted, cardInvalid } = this.state
    if(processingPayment) return (<Spinner />)
    if(formSubmitted) return (<h1>Your payment has been processed successfully</h1>)
    return (
      <Form
        onNameChange={ this.onNameChange }
        onCardNumberChange={ this.onCardNumberChange }
        onMonthChange={ this.onMonthChange }
        onYearChange={ this.onYearChange }
        onCcvChange={ this.onCcvChange }
        onSubmit={ this.onSubmit }
        errors={ errors }
        cardInvalid={ cardInvalid }
        dateInvalid={ dateInvalid }
        cardNumber={ cardNumber }
        name={ name }
        cardNumber={ cardNumber }
        ccv={ ccv }
        month={ month }
        year={ year }
        cardType={ cardType }
      />
    )
  }
}

export default App
