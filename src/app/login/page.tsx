'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import validator from 'validator';

import Button from '../components/button/button';
import Input from '../components/search-bar/search-bar';
import Toast from '../components/toast/toast';

import { useSelector, useDispatch } from 'src/redux/store';
import { SetState, SignIn as login } from '../../redux/slices/auth-slice';

import { SignInWrapper } from './style';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  const { err } = useSelector((state) => state.auth);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isToastOpen, setIsToastOpen ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState('');
  const [ severity, setSeverity ] = useState('');
  const [ signinError, setSigninError ] = useState('');

  useEffect(() => {
    setSigninError('');
    if (err) {
      setToastMessage('Invalid Email or Password');
      setSeverity('error');
      setIsToastOpen(true);

      dispatch(SetState({
        field: 'err',
        value: ''
      }));
    }
  }, [ err ]);

  const handleToastClose = () => {
    setIsToastOpen(false);
  };

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      setSigninError('Please fill all fields first');
      return;
    }

    if (!validator.isEmail(email)) {
      setSigninError('Invalid email address');
      return;
    }

    dispatch(login({
      email,
      password
    }));
  };

  const linkStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <SignInWrapper>
      <div className="Sign-wrapper">
        <div className="header">
          <p>Facebook</p>
        </div>
        <div className="sign-overlay-wrapper">
          <p>Sign In</p>
          <div className="text-field">
            <Input
              placeholder="Enter Your Email"
              label="Email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Enter Your Password"
              label="Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={`forget-password ${signinError ? 'error-vissible' : null}`}>
            {signinError ? <div className='show-error'>{signinError}</div> : null}
            <Link href="/forgot-password">Forget Password</Link>
          </div>

          <div className="buttons-wrapper">
            <Button text="Sign In"
              onClick={handleSignIn}
              variant="contained"
            ></Button>
          </div>
          <div className='auth-fotter-wrapper'> <p>Dont have an Account ? </p>
            <Link href="/signup" style={linkStyle}>Sign Up</Link></div>
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

export default SignIn;
