import * as React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { API_URL } from '../constants'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomisedSnackbar from './CustomisedSnackbar';
import SendIcon from '@mui/icons-material/Send';
import LoaderPage from './LoaderPage';
const ForgotPassswordForm = () => {

    const [error, setError] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [color, setColor] = React.useState('');
    const [loading, setLoading] = React.useState(false);


    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid Email').required("Please enter the emial"),
        }),
        onSubmit: values => {
            handleSave(values);
        }
    })

    const handleSave = async (values) => {
        setLoading(true);
        const response = await fetch(`${API_URL}/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                'email': values.email,
            }),
        });
        setLoading(false);
        if (response.status === 200) {
            setError(true);
            setMsg('Reset password link has been sent to your email. Check your email and click on the link to reset your password.');
            setColor('success');
            values.email = '';
            setTimeout(() => { setError(false); }, 5000);
            return;
        } else if (response.status === 500) {
            setError(true);
            setMsg('Server Error. Please try again or try again later.');
            setColor('error');
            values.email = '';
            setTimeout(() => { setError(false); }, 5000);
            return;

        }
        setError(true);
        setMsg('Email does not exist. Please enter the registered email.');
        setColor('error');
        setTimeout(() => { setError(false); }, 5000);
        values.email = '';
        return;

    }

    document.title = 'Forgot Password'

    return (!loading ? (
        <ForgotPasswordPage className="container-fluid">

            <div className="col-12 col-md-8 m-5 ">
                <CustomisedSnackbar show={error} msg={msg} color={color} />

                <ForgotPasswordForm className="py-5 px-3">
                    <Typography variant="h3" component="div" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>Forgot Password</Typography>
                    <Form onSubmit={handleSubmit} >
                        <Box sx={{ flexGrow: 1}}>
                            <Grid container spacing={5} sx={{display: 'flex', justifyContent:'center'}}>
                                <Grid item xs={12} md={10} sx={{display: 'flex', justifyContent:'center'}}>
                                    <TextField
                                        sx={{ width: '80%' }}
                                        required
                                        id="email"
                                        label="Email"
                                        error={errors.email && touched.email}
                                        helperText={errors.email && touched.email && errors.email}
                                        name='email' type="email" onChange={handleChange} value={values.email} onBlur={handleBlur} autoComplete="off" />
                                </Grid>
                                <Grid item xs={12} md={5} sx={{display: 'flex', justifyContent:'center',width:'100%'}}>
                                    <Button sx={{ width: '80%' }} variant="contained" color='primary' type="submit" >
                                        Send Mail  <SendIcon />
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        <Typography variant="overline" display="inline" gutterBottom>
                                            <Link to="/login"> Login</Link> / <Link to="/register"> Register</Link>
                                        </Typography>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                    </Form>
                </ForgotPasswordForm>
            </div>

        </ForgotPasswordPage>) : <LoaderPage />
    );
};

export default ForgotPassswordForm;

const ForgotPasswordPage = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 100vh;
min-width: 100vw;
background: linear-gradient(180deg, #0072ff85 30%, whitesmoke 30%);
 `;
const ForgotPasswordForm = styled.div`
display: flex;
flex-direction: column;
background-color:white;
border-radius: 10px;

box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
-webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
-moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
`;

const Form = styled.form``;