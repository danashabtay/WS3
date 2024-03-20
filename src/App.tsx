import { MainPage } from './components/main/main-page';
import { LoginPage } from './components/login/login-page';
import { SignUpPage } from  './components/signup/signup-page';
import { PageProps } from './types';
import { useState } from 'react';


export const App = () => {

  const [currentPage, setCurrentPage] = useState('login');

  // TODO: implement those functions, think about how to use state to navigate between pages
  const pageProps: PageProps = {
    navigateToMainPage: () => setCurrentPage('main'),
    navigateToSignUpPage: () => setCurrentPage('signup'),
    navigateToLoginPage: () => setCurrentPage('login'),
  }

  // TODO: render the correct page according to the state
  if(currentPage === 'login') {
    return (
      <LoginPage {...pageProps}/>
    )
  }
  if(currentPage === 'signup') {
    return (
      <SignUpPage {...pageProps}/>
    )
  }
  return (
    <MainPage {...pageProps}/>
  )
};