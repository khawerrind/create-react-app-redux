import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import renderField from './renderField';
import { Button } from 'react-bootstrap';

const alphabetsOnlyRe = /^[a-zA-Z]*$/;

const validate = values => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = 'First name is required';
  } else if (!alphabetsOnlyRe.test(values.firstname)) {
    errors.firstname = 'Please enter only alphabets characters';
  }
  if (!values.lastname) {
    errors.lastname = 'Last name is required';
  } else if (!alphabetsOnlyRe.test(values.lastname)) {
    errors.lastname = 'Please enter only alphabets characters';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Value should be a valid email';
  }
  if (!values.iban) {
    errors.iban = 'IBAN is required';
  }
  return errors;
};

async function submitToServer(values) {
  try {
    let response = await fetch('http://localhost:3050/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log('error server', error);
  }
}

const submit = values => {
  return submitToServer(values).then(data => {
    if (data.message) {
      throw new SubmissionError({ iban: data.message });
    } else if (!data.valid) {
      throw new SubmissionError({ iban: 'IBAN should be valid' });
    } else {
      toast.success('Congratz! All data is valid', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  });
};

class Home extends Component {
  state = {};

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (
      <section id="loginform" className="outer-wrapper">
        <div className="inner-wrapper">
          <div className="container">
            <div className="row col-sm-8 col-sm-offset-2 inner-container">
              <div className="col-sm-12">
                <ToastContainer autoClose={3000} />
                <h1 className="text-center">Register Account</h1>
                <form onSubmit={handleSubmit(submit)}>
                  <Field
                    name="firstname"
                    type="text"
                    component={renderField}
                    label="First Name"
                  />
                  <Field
                    name="lastname"
                    type="text"
                    component={renderField}
                    label="Last Name"
                  />
                  <Field
                    name="email"
                    type="email"
                    component={renderField}
                    label="Email"
                  />
                  <Field
                    name="iban"
                    type="text"
                    component={renderField}
                    label="IBAN"
                  />
                  <div>
                    <Button
                      bsStyle="warning"
                      type="submit"
                      disabled={submitting}>
                      Submit
                    </Button>
                    <Button
                      bsStyle="warning"
                      disabled={pristine || submitting}
                      onClick={reset}>
                      Clear Values
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'syncValidation', // a unique identifier for this form
    validate,
    asyncBlurFields: ['iban']
  })(Home)
);
