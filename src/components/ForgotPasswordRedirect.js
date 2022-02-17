import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../constants';
import LoaderPage from './LoaderPage';

const ForgotPasswordRedirect = () => {

    const navigate = useNavigate();
    const params = useParams();

    const redirect = async () => {
        const token = params.token;
        const verifyString = params.verifyString;
        const response = await fetch(`${API_URL}/forgot-password/verify/${token}/${verifyString}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': token,
            },
        })

        if (response.status === 200) {
            localStorage.setItem("resetToken", token)
            navigate('/reset-password');
        }
        else {
            navigate('/link-error');
            console.log(response.status);
        }


        // window.location.href = '/link-error';
    };

    redirect();
    document.title='Redirect';
    return <LoaderPage />;
};

export default ForgotPasswordRedirect;
