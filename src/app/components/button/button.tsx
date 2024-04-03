import React, { MouseEventHandler, ReactNode } from 'react';
import { ButtonStyleWrapper } from './style';

interface ButtonProps {
  variant: "text" | "contained" | "outlined";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  className?: string;
  onMouseEnter?: () => void;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  text,
  className,
  onMouseEnter,
  icon,
  ...rest
}) => {
  return (
    <ButtonStyleWrapper
      className={className}
      onMouseEnter={onMouseEnter}
      variant={variant}
      onClick={onClick}
      {...rest}
    >
      {icon}
      {text}
    </ButtonStyleWrapper>
  );
};

export default Button;
