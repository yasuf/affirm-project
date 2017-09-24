### OSX Setup

1. Run `npm install`
1. Run `webpack-dev-server`
1. Run `open dist/index.html`

### Affirm assignment

* How long did you spend working on the problem? How much time did you spend thinking about the design before writing your code?

I spent around 20 minutes thinking about which libraries to use and have a clear idea of the scope of the problem and then spent a bit more than 3 hours working on the solution.

* What are the UI/UX usability features you implemented, or thought about implementing? How do they help validate the user input?

Validations, which include:
-Rendering an error message when the user is missing a field
-Limiting the number of characters they can input in different cases depending on the type of card (AmEx, VISA).
-Highlighting the image of the credit card that matches the number they typed.

UX features include:
-Render a spinner after they submittted the form
-Show a success message after the transaction has been completed

Though of implementing:
-Separating the characters in groups of 4 for VISA and 4-6-5 for American Express, I saw there's an npm package that can be helpful with this, `react-number-format`.
-Validate that the name contains only characters and not numbers

* What would an form submission/API payload of this look like? How would you deal with validation errors that may come from that API response?

The submission of the payload would look something like:
```
{
  name: 'John Watson',
  card_number: 4239010939043321,
  ccv2: 142,
  expiration: {
    month: 10,
    year: 2020
  }
}
```

The request type should be a POST since we are posting information to a system to process the payment

And although most of the validations are made in the client's browser, we can render a message on top of the form with an error that came back from the server that could be useful for the user, the payments server could be down so we can render something like 'Your payment could not be processed at the moment, please try again later' or something similar if the HTTP response code is 500 or higher or times out.

* How would you test this component?

Since this component was built using React we could test it using Enzyme to mock render the components in a test file and another library like Jest or Mocha/Chai  or Jasmine to create tests that ensure many things, among them that the correct error messages are rendered when the conditions are met or validate that the functionallity that limits the number of characters works correctly, among other things.

We could also ensure the API call to make the payment is being made with the right parameters in the test files

* What are some styling and layout considerations for these types of form inputs?

Padding is important as it makes it cleaner to look at and users are expecting inputs to have certain spacing between each other. Validation errors should be close to the input they are referring to. The layout can vary if we wish to support mobile clients as well since responsiveness plays a role in that case. Browser compatibility is also important to support a greater percentage of users, there are certain CSS styles that are not very well supported and even if they simplify the code they won't work in some of the browser a big percentage of users rely on so their use is discouraged, I.E. flexbox.
