import styled from 'styled-components';

const mainColor = 'rgba(39, 73, 137, 1)';

const SignUpWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .header {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: center;
    img {
      width: 100px;
    }
    p {
      font-weight: 700;
      color: ${mainColor};
      width: 161px;
      font-size: 32px;
      line-height: 31px;
    }
    span {
        font-weight: 700;
        color: ${mainColor};
        width: 161px;
        font-size: 32px;
        line-height: 31px;
      }
  }
  .Sign-wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;
    max-width: 600px;
    width: 100%;
    padding: 0px 24px;
  }
  .footer-sign-up {
    margin-top: 16px;
    font-size: 16px;
    display: block;
    a {
      color: ${mainColor};
    }
  }
  .sign-overlay-wrapper {
    p {
      text-align: center;
      font-size: 31px;
      margin: 24px 0px 15px;
      font-weight: 700;
      color: ${mainColor};
    }
  }
  .text-field {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  .forget-password {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
    gap: 8px;
    &.error-visible {
      justify-content: space-between;
    }
    a {
      color: ${mainColor};
    }
  }
  .buttons-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
    &.register-button-wrapper {
      margin-top: -8px;
    }
    button {
      width: 100%;
    }
  }
  .show-error {
    color: red;
  }
  .auth-footer-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
    p {
      margin: 0px;
      font-size: 10px;
      color: #000;
    }
    span {
        margin: 0px;
        font-size: 12px;
        color: #000;
      }
    a {
      margin: 0px;
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;
    }
  }
`;

export { SignUpWrapper };
