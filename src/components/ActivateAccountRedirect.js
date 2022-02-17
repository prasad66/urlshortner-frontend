import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants'
import LoaderPage from './LoaderPage';

const ActivateAccountRedirect = () => {
  document.title = 'Redirect'

  const navigate = useNavigate();
  const params = useParams();

  (async () => {

    const { token, activateString } = params;
    console.log(token, activateString)
    const response = await fetch(`${API_URL}/activate/${token}/${activateString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'token': token,
      }
    });
    const result = await response.json();
    console.log('result********* ' + result)
    console.log('response********* ' + response)
    if (response.status === 200) {
      setTimeout(() => {navigate('/activated');},10000)
    }
    else if (response.status === 409) {
      navigate('/alreadyactivated');
      setTimeout(() => {navigate('/alreadyactivated');},10000)
    }

    else if (response.status === 401) {
      navigate('/alreadyactivated');
      setTimeout(() => {navigate('/link-expired');},10000)
    }
    else {
      navigate('/link-error');

    }
  })();


  return <LoaderPage />
}

export default ActivateAccountRedirect