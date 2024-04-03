import Button, { ButtonProps } from '@mui/material/Button';
import styled from 'styled-components';

const mainColor = 'rgba(39, 73, 137, 1) !important';

interface CustomButtonProps extends ButtonProps {
  variant: 'text' | 'contained' | 'outlined';
}

const ButtonStyleWrapper = styled(({ variant, ...other }: CustomButtonProps) => (
    <Button variant={variant} {...other} />
))`
  ${({ variant }) => {
    switch (variant) {
      case 'text':
        return `
          color: ${mainColor}; // Customize the styles for the "text" variant
        `;
      case 'contained':
        return `
          background-color: ${mainColor}; // Customize the styles for the "contained" variant
        `;
      case 'outlined':
        return `
          border: 1px solid ${mainColor};
          color: ${mainColor}; // Customize the styles for the "outlined" variant
        `;
      default:
        return '';
    }
  }}
`;

export { ButtonStyleWrapper };
