import React, { useState, ChangeEventHandler } from 'react';
import { Input } from '@mui/material';
import { MdSearch, MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { SearchBarWrapper } from './style';

interface SearchBarProps {
  search?: boolean;
  type: string;
  placeholder?: string;
  label?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  search,
  type,
  placeholder,
  label,
  value,
  onChange,
  ...rest
}) => {
  const [ passwordVisible, setPasswordVisible ] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <SearchBarWrapper>
      {label ? <label>{label}</label> : null}
      <Input
        placeholder={placeholder}
        type={passwordVisible ? 'text' : type}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {type === 'password' ? (
        <div className="password-icons" onClick={togglePasswordVisibility}>
          {passwordVisible ? <MdVisibility /> : <MdVisibilityOff />}
        </div>
      ) : null}
      {search ? <MdSearch /> : null}
    </SearchBarWrapper>
  );
};

export default SearchBar;
