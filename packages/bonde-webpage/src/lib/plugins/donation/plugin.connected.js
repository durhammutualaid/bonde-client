import React from 'react'
import Donation from './plugin'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = { donationCustomerData: undefined }
  }

  handleTransactionCreate (values) {
    const {
      mobilization,
      widget,
      selectedValue,
      selectedPaymentType,
      storedDonationCustomerData
    } = values

    return new Promise((resolve, reject) => {
      debugger
      const paymentType = widget.settings.payment_type
      const recurringPeriod = widget.settings.recurring_period
      const mainColor = widget.settings.main_color
        ? widget.settings.main_color
        : '#43a2cc'

      const checkout = new window.PagarMeCheckout.Checkout({
        encryption_key: process.env.REACT_APP_PAGARME_KEY || 'setup env var',
        success: (data) => {
          data.subscription = paymentType === 'users_choice'
            ? (selectedPaymentType !== 'unique')
            : data.subscription = (paymentType !== 'unique')

          data.recurring_period = recurringPeriod
          data.mobilization_id = mobilization.id
          data.widget_id = widget.id
          data.amount = widget.settings['donation_value' + selectedValue] + '00'

          this.props.donationTransactionCreate(data)
            .then(() => {
              if (this.state.donationCustomerData) {
                this.setState({ donationCustomerData: undefined })
              }
              this.props.analyticsEvents.donationFinishRequest()
              return resolve()
            })
            .catch(failure => {
              if (failure.config && failure.config.data) {
                try {
                  const failureData = JSON.parse(failure.config.data)
                  this.setState({ donationCustomerData: failureData.donation.customer })
                } catch (error) {
                  console.error('Customer data is not parsable. Cannot store the customer data.')
                  console.error(error)
                }
              } else {
                console.error(failure)
              }
            })
        },
        error: (err) => {
          console.error(err)
          return reject()
        }
      })

      const customerData = {}
      if (storedDonationCustomerData) {
        const d = storedDonationCustomerData

        // reference: https://docs.pagar.me/v2017-07-17/docs/inserindo-o-formulario
        customerData.customerName = d.name
        customerData.customerDocumentNumber = d.document_number
        customerData.customerEmail = d.email
        customerData.customerPhoneDdd = d.phone.ddd
        customerData.customerPhoneNumber = d.phone.number
        customerData.customerAddressZipcode = d.address.zipcode
        customerData.customerAddressStreet = d.address.street
        customerData.customerAddressStreetNumber = d.address.street_number
        customerData.customerAddressComplementary = d.address.complementary
        customerData.customerAddressNeighborhood = d.address.neighborhood
        customerData.customerAddressCity = d.address.city
        customerData.customerAddressState = d.address.state
      }

      const params = {
        createToken: 'false',
        amount: widget.settings['donation_value' + selectedValue] + '00',
        customerData: 'true',
        paymentMethods: widget.settings.payment_methods === 'true' ? 'credit_card,boleto' : 'credit_card',
        uiColor: mainColor,
        paymentButtonText: widget.settings.button_text,
        ...customerData
      }

      this.props.analyticsEvents.donationSetValue()

      checkout.open(params)
    })
  }

  render () {
    return (
      <Donation
        {...this.props}
        donationCustomerData={this.state.donationCustomerData}
        handleDonationTransactionCreate={this.handleTransactionCreate.bind(this)}
      />
    )
  }
}
