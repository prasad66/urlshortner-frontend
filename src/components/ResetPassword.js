import * as React from 'react';
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { API_URL } from '../constants'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomisedSnackbar from './CustomisedSnackbar';
import LoaderPage from './LoaderPage';
const ResetPassword = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!localStorage.getItem('resetToken')) navigate('/login');
    }, [navigate]);

    const [error, setError] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [color, setColor] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: yup.object({
            password: yup.string().min(8).required("Please enter the password"),
            confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password does not match').required("Please conform the password"),
        }),
        onSubmit: values => {
            handleSave(values);
        }
    })

    const handleSave = async (values) => {
        setLoading(true);
        const response = await fetch(`${API_URL}/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'token': localStorage.getItem('resetToken'),
            },
            body: JSON.stringify({
                'password': values.password,
            }),
        });
        setLoading(false);
        if (response.status === 200) {
            setError(true);
            setMsg('Password changed successfully.');
            setColor('success');
            values.password = '';
            values.confirmPassword = '';
            setTimeout(() => { setError(false); navigate('/') }, 3000);

            return;
        }
        setError(true);
        setMsg('Error. Try again later');
        setColor('error');
        setTimeout(() => { setError(false); }, 5000);
        values.password = '';
        values.confirmPassword = '';
        return;

    }

    document.title = 'Change Password'

    return (
        loading ? <LoaderPage /> : (
            <ResetPasswordPage className="container-fluid">

                <div className="col-12 col-md-8 m-5 ">
                    <CustomisedSnackbar show={error} msg={msg} color={color} />

                    <ResetPasswordForm className="py-5 px-3">
                        <Typography variant="h3" component="div" gutterBottom  sx={{display: 'flex', justifyContent:'center'}}>Reset Password</Typography>
                        <Form onSubmit={handleSubmit} >
                            <Box  sx={{display: 'flex', justifyContent:'center',flexGrow: 1 }}>
                                <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item xs={12} sm={9} md={7} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <TextField
                                            sx={{ width: '80%' }}
                                            required
                                            id="password"
                                            label="Password"
                                            error={errors.password && touched.password}
                                            helperText={errors.password && touched.password && errors.password}
                                            name='password' type="password" onChange={handleChange} value={values.password} onBlur={handleBlur} autoComplete="off" />

                                    </Grid>
                                    <Grid item xs={12} sm={9} md={7} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <TextField
                                            sx={{ width: '80%' }}
                                            required
                                            id="confirmPassword"
                                            label="Confirm Password"
                                            error={errors.confirmPassword && touched.confirmPassword}
                                            helperText={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                                            name='confirmPassword' type="password" onChange={handleChange} value={values.confirmPassword} onBlur={handleBlur} autoComplete="off" />
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button sx={{ width: '80%' }} variant="contained" color='success' type="submit" >
                                            Change Password
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Form>
                    </ResetPasswordForm>
                </div>

            </ResetPasswordPage>
        )
    );
};

export default ResetPassword;

const ResetPasswordPage = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
min-height: 100vh;
min-width: 100vw;
/* background-color:whitesmoke;     */
background: linear-gradient(180deg, #00a884 30%, whitesmoke 30%);
 `;
const ResetPasswordForm = styled.div`
display: flex;
flex-direction: column;
background-color:white;
border-radius: 10px;

box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
-webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
-moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
`;

const Form = styled.form``;