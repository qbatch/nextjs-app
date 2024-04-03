'use client';

import React, { useEffect, useState } from 'react';
import validator from 'validator';

import Button from '../components/button/button';
import Input from '../components/search-bar/search-bar';
import Toast from '../components/toast/toast';

import { useSelector, useDispatch } from 'src/redux/store';
import { SetState, ForgotPassword as forgotPassword } from '../../redux/slices/auth-slice';

import { SignInWrapper } from './style';

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const {
    err,
    message
  } = useSelector((state) => state.auth);

  const [ email, setEmail ] = useState('');
  const [ isToastOpen, setIsToastOpen ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState('');
  const [ severity, setSeverity ] = useState('');
  const [ forgetPasswordError, setForgetPasswordError ] = useState('');

  useEffect(() => {
    setForgetPasswordError('');
    if (err) {
      setToastMessage(err);
      setSeverity('error');
      setIsToastOpen(true);

      dispatch(SetState({
        field: 'err',
        value: ''
      }));
    } else if (message) {
      setToastMessage(message);
      setSeverity('success');
      setIsToastOpen(true);

      dispatch(SetState({
        field: 'message',
        value: ''
      }));
    }
  }, [ err, message ]);

  const handleToastClose = () => {
    setIsToastOpen(false);
  };

  const handleForgetPassword = async () => {
    if (!email.trim()) {
      setForgetPasswordError('Please provide your Email');
      return;
    }

    if (!validator.isEmail(email)) {
      setForgetPasswordError('Invalid email address');
      return;
    }

    dispatch(forgotPassword({
      email
    }));
  };

  return (
    <SignInWrapper>
      <div className="Sign-wrapper">
        <div className="header">
          <p>Facebook</p>
        </div>
        <div className="sign-overlay-wrapper">
          <p>Forget Passoword</p>
          <div className="text-field">
            <Input
              placeholder="Enter Your Email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {forgetPasswordError ? <div className='show-error'>{forgetPasswordError}</div> : null}
          <div className="buttons-wrapper">
            <Button
              text="Submit"
              onClick={handleForgetPassword}
              variant="contained" />
          </div>
        </div>
      </div>
      <Toast
        toastOpen={isToastOpen}
        message={toastMessage}
        severity={severity}
        handleToastClose={handleToastClose}
      />
    </SignInWrapper>
  );
};

export default ForgotPassword;
