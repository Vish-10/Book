import React from 'react';
import { Button } from 'reactstrap';
import {Form, Field} from 'react-final-form';
import Styles from '../shared/styles';





const required = value => (value ? undefined : 'Required')
const validEmail = value => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)? undefined : 'Invalid Mail Address'
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)



  function Sign(props){
    const onSubmit = postNewUser => async values => {

        //let user = JSON.stringify(values, 0, 2);
        
        props.postNewUser(values.name, values.username,values.password, values.email);
    
    }
      
      return(
          <div className="container">
              <Styles>
                <Form
                    onSubmit={onSubmit(props.postNewUser)}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                        <Field name="name" validate={required}>
                            {({ input, meta }) => (
                            <div>
                                <label for="name">Name</label>
                                <input {...input} type="text" placeholder="Name" id="name"/>
                                {meta.error && meta.touched && <span>{meta.error}</span>}
                            </div>
                            )}
                        </Field>
                        <Field name="email" validate={composeValidators(required, validEmail)}>
                            {({ input, meta }) => (
                                <div>
                                    <label for="email">E-Mail</label>
                                    <input {...input} type="text" placeholder="E-Mail" id="email"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                                )}
                        </Field>
                        <Field name="username" validate={required}>
                            {({ input, meta }) => (
                                <div>
                                    <label for="username">User Name</label>
                                    <input {...input} type="text" placeholder="User Name"  id="username"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                                )}
                        </Field>
                        <Field name="password" validate={required}>
                            {({ input, meta }) => (
                                <div>
                                    <label for="password">Password</label>
                                    <input {...input} type="password" placeholder="Password"  id="password"/>
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                                )}
                        </Field>
                            <div>
                                <Button type="submit" disabled={submitting}>
                                    Submit
                                    </Button>{' '}
                                    <Button
                                    type="button"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                    className="bg-danger"
                                    >
                                    Reset
                                </Button>
                            </div>
                    </form>
                    )}/> 
              </Styles>
              <div >
                  {props.msg}
              </div>
          </div>
      );
  }



export default Sign;