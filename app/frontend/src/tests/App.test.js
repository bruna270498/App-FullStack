import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Footer from '../components/Footer';

const EMAIL_INPUT_TESTID = 'email-input';
const PASSWORD_INPUT_TESTID = 'password-input';

describe('Testa a tela de Login', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Testa se a tela de Login possui inputs de email e senha', () => {
    render(<App />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT_TESTID);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TESTID);
    expect(inputPassword).toBeInTheDocument();
  });

  it('Testa se a tela de Login possui um botão de Enter', () => {
    render(<App />);

    const enterBttn = screen.getByRole('button', { name: /entrar/i });
    expect(enterBttn).toBeInTheDocument();
  });

  it('Testa se, o botão é validado com um email e senha válidos', () => {
    render(<App />);

    const inputEmail = screen.getByTestId(EMAIL_INPUT_TESTID);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT_TESTID);
    const enterBttn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(enterBttn);
  });
});
