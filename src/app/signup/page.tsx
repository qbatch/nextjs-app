'use client';

import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import validator from 'validator';

import Button from '../components/button/button';
import Input from '../components/search-bar/search-bar';
import Toast from '../components/toast/toast';

import { useSelector, useDispatch } from 'src/redux/store';
import { SetState, UserRegistration } from '../../redux/slices/auth-slice';

import { SignInWrapper } from './style';

const SignUp: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    err,
    message
  } = useSelector((state: any) => state.auth);

  const [ email, setEmail ] = useState<string>('');
  const [ username, setUserName ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ signupError, setSignupError ] = useState<string>('');
  const [ isToastOpen, setIsToastOpen ] = useState<boolean>(false);
  const [ toastMessage, setToastMessage ] = useState<string>('');
  const [ severity, setSeverity ] = useState<string>('');

  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?_&])[A-Za-z\d@#$!%*?_&]{8,30}$/;

  const handleToastClose = () => {
    setIsToastOpen(false);
  };

  useEffect(() => {
    setSignupError('');
    if (err) {
      setToastMessage(err);
      setSeverity('error');
      setIsToastOpen(true);

      dispatch(SetState({
        field: 'err',
        value: ''
      }));
    } else if (message) {
      dispatch(SetState({
        field: 'message',
        value: ''
      }));
      router.push("/login");
    }
  }, [ err, message ]);

  const handleSignup = async () => {
    if (!email.trim() || !password || !username.trim()) {
      setSignupError('Please fill all fields first');
      return;
    }

    if (!validator.isEmail(email)) {
      setSignupError('Invalid email address');
      return;
    }

    if (!passwordPattern.test(password)) {
      setSignupError('Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character');
      return;
    }

    dispatch(UserRegistration({
      username,
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
          <p>Sign Up</p>
          <div className="text-field">
            <Input
              placeholder="Enter Your Full Name"
              label="Name"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              placeholder="Enter Your Email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box sx={{ height: 150 }}>
              <Input
                placeholder="Enter Your Password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {signupError ? <div className='show-error'>{signupError}</div> : null}
            </Box>
          </div>
          <div className="buttons-wrapper register-button-wrapper">
            <Button text="Sign Up" onClick={handleSignup} variant="contained" />
          </div>
          <div className="auth-fotter-wrapper">
            <p>
              Already a Member?
            </p>
            <Link href="/login" style={linkStyle}>Visit login page</Link>
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

export default SignUp;
