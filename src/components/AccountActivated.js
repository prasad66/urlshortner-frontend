import * as React from 'react';
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomisedSnackbar from './CustomisedSnackbar';

const AccountActivated = () => {
    document.title = 'Success';

    const navigate = useNavigate();

    (() => {
        setTimeout(() => { navigate('/') }, 3000);
    })();


    return (
        <RegisterPage className="container-fluid">

            <div className="col-12 col-md-8 m-5 ">
                <CustomisedSnackbar show={true} msg={'Redirecting to Login Page'} color={'success'} />

                <RegisterForm className="py-5 px-3">
                    <Form>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={5} sx={{ justifyContent: 'center' }}>
                                <Typography variant="h3" component="div" gutterBottom sx={{ color: 'red', marginTop: '30px' }}>Account Activated. Login to Continue...</Typography>
                                <Grid item xs={12}>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        <Typography variant="overline" display="inline" gutterBottom>
                                            <Link to="/"> Login</Link> / <Link to="/register"> Register</Link>
                                        </Typography>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                </RegisterForm>
            </div>

        </RegisterPage>
    );
};

export default AccountActivated;

const RegisterPage = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 100vh;
min-width: 100vw;
/* background-color:whitesmoke;     */
background: linear-gradient(180deg, #00a884 30%, whitesmoke 30%);
 `;
const RegisterForm = styled.div`
display: flex;
flex-direction: column;
background-color:white;
border-radius: 10px;

box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
-webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
-moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
`;

const Form = styled.form``;