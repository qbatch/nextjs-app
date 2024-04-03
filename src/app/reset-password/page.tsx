'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

import Button from '../components/button/button';
import Input from '../components/search-bar/search-bar';
import Toast from '../components/toast/toast';

import { useSelector, useDispatch } from 'src/redux/store';
import { SetState, ResetPassword as resetPassword } from '../../redux/slices/auth-slice';

import { SignInWrapper } from './style';

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    err,
    message
  } = useSelector((state) => state.auth);

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token') ?? undefined;

  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ isToastOpen, setIsToastOpen ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState('');
  const [ severity, setSeverity ] = useState('');
  const [ resetPasswordError, setResetPasswordError ] = useState('');

  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?_&])[A-Za-z\d@#$!%*?_&]{8,30}$/;

  useEffect(() => {
    setResetPasswordError('');
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

      router.push('/login');
    }
  }, [ err, message ]);

  const handleToastClose = () => {
    setIsToastOpen(false);
  };

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setResetPasswordError('Please fill all fields first');
      return;
    }

    if (password !== confirmPassword) {
      setResetPasswordError('Password do not match');
      return;
    }

    if (!passwordPattern.test(password)) {
      setResetPasswordError('Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character');
      return;
    }

    dispatch(resetPassword({
      password,
      token
    }));
  };
  return (
    <SignInWrapper>
      <div className="Sign-wrapper">
        <div className="header">
          <p>Facebook</p>
        </div>
        <div className="sign-overlay-wrapper">
          <p>Reset Passoword</p>
          <div className="text-field">
            <Input
              placeholder="Enter Your Password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Enter Your Password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {resetPasswordError ? <div className='show-error'>{resetPasswordError}</div> : null}
          <div className="buttons-wrapper">
            <Button text="Reset Your Password"
              onClick={handleResetPassword}
              variant="contained"
            ></Button>
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

export default ResetPassword;
