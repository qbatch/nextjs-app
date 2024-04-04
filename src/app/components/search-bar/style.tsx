import styled from 'styled-components';

const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-row-gap: 4px;
  label {
    font-size: 12px;
    font-weight: 600;
  }
  input {
    border-radius: 4px;
    border: 1px solid var(--Component-Divider, #eceff1);
    background: var(--White, #fff);
    padding: 8px 24px 8px 12px;
    color: var(--Text-Place-Holder, #000);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    width: 100%;
    outline: none;
  }
  svg {
    position: absolute;
    top: 12px;
    right: 8px;
    font-size: 16px;
    cursor: pointer;
    color: #245c5c;
  }
  .password-icons {
    position: absolute;
    width: 30px;
    top: 20px;
    right: 0;
  }
  .MuiInput-underline {
    &:before,
    &:after {
      display: none;
    }
  }
`;

export { SearchBarWrapper };
