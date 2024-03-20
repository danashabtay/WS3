import React, { useState } from 'react';
import './main-page.css'; 
import { AuthApi } from '../../api/authApi';
import { Loader } from '../loader/loader';
import { APIStatus, PageProps } from '../../types';
import { ErrorMessage } from '../error/error';

export const MainPage: React.FC<PageProps> = ({navigateToLoginPage}) => {
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // TODO: get the user name from AuthApi and update the state
  // TODO: handle different APIStatus and navigate to the right page

 
  const fetchUserName = async () => {
    setIsLoading(true);
    try {
      const response = await AuthApi.getUserName();
      setIsLoading(false);
      if (typeof response === 'string') {
        setUsername(response);
      } else {
        navigateToLoginPage();
      }
    } catch (error) {
      setErrorMessage('Failed to fetch username, please try again');
    } 
  };

  // Fetch username when the component renders
  fetchUserName();


  const onLogout = async () => {
    setIsLoading(true);
    const res = await AuthApi.logout();
    setIsLoading(false);
    if(res === APIStatus.Success) {
        navigateToLoginPage();
        return;
    }
    setErrorMessage('Failed to logout, please try again');
  }

  return (
    <div className="main-page-container">
      {isLoading 
      ? <Loader /> 
      : <> 
        <h2>Hello, {username}</h2>
        <button onClick={onLogout}>Logout</button> 
      </>
      }
    {errorMessage && <ErrorMessage message={errorMessage}/>}
    </div>
  );
};
