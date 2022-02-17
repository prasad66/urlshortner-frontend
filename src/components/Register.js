import * as React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { API_URL } from '../constants'
import { useNavigate } from 'react-router-dom'
import { isExpired } from 'react-jwt'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomisedSnackbar from './CustomisedSnackbar';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import LoaderPage from './LoaderPage';


const Register = () => {

    document.title='SIGN UP'


    const navigate = useNavigate();

    React.useEffect(() => {

        if (isExpired(localStorage.getItem('token'))) {
            localStorage.removeItem('token');
            return;
        }
        navigate('/welcome')

    }, [navigate])

    const [error, setError] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [color, setColor] = React.useState('');
    const [loading, setLoading] = React.useState(false);


    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            mobile: '',
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: yup.object({
            firstName: yup.string().required("First Name is required"),
            lastName: yup.string().required("Last Name is required"),
            mobile: yup.string().matches(/^\d{10}$/, 'Mobile Number not valid').required("Email is required"),
            email: yup.string().email('Invalid Email').required("Please enter the email"),
            password: yup.string().min(8).required("Please enter the password"),
            confirmPassword: yup.string().oneOf([yup.ref('password')], 'Password does not match').required("Please conform the password"),
        }),
        onSubmit: values => {
            handleSave(values);
        }
    })

    const handleSave = async (values) => {
        setLoading(true);
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                "firstName": values.firstName,
                "lastName": values.lastName,
                "mobile": values.mobile,
                "email": values.email,
                "password": values.password,
            }),
        });
        const data = await response.json();
        setLoading(false);
        if (response.status === 201) {
            console.log(data);
            localStorage.setItem("token", data.token);
            setError(true);
            setMsg('Registration Completed. Redirecting...');
            setColor('success');
            setTimeout(() => {
                setError(false);
                values.firstName = '';
                values.lastName = '';
                values.mobile = '';
                values.email = '';
                values.password = '';
                values.confirmPassword = '';
                setTimeout(() => { navigate('/') }, 2000)
            }, 3000);
            return;
        }
        setError(true);
        setMsg('Email already exists. Try with different Email');
        setColor('error');
        setTimeout(() => { setError(false); }, 5000);
        return;

    }

    document.title = 'Register'


    return (
        loading ? <LoaderPage /> : (
            <RegisterPage className="container-fluid">

                <div className="col-12 col-md-8 m-5 ">
                    <CustomisedSnackbar show={error} msg={msg} color={color} />

                    <RegisterForm className="py-5 px-3">
                        <Typography variant="h3" component="div" gutterBottom sx={{ display: 'grid', placeContent: 'center' }}>
                            Registration Form
                        </Typography>
                        <Form onSubmit={handleSubmit} sx={{ display: 'grid', placeContent: 'center' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'center' }} >
                                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <TextField
                                            sx={{ width: '80%' }}
                                            required
                                            id="firstName"
                                            label="First Name"
                                            error={errors.firstName && touched.firstName}
                                            helperText={errors.firstName && touched.firstName && errors.firstName}
                                            name='firstName' type="text" onChange={handleChange} value={values.firstName} onBlur={handleBlur} autoComplete="off" />
                                    </Grid>
                                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <TextField
                                            sx={{ width: '80%' }}
                                            required
                                            id="lastName"
                                            label="Last Name"
                                            error={errors.lastName && touched.lastName}
                                            helperText={errors.lastName && touched.lastName && errors.lastName}
                                            name='lastName' type="text" onChange={handleChange} value={values.lastName} onBlur={handleBlur} autoComplete="off" />

                                    </Grid>
                                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <TextField
                                            sx={{ width: '80%' }}
                                            required
                                            id="mobile"
                                            label="Mobile"
                                            error={errors.mobile && touched.mobile}
                                            helperText={errors.mobile && touched.mobile && errors.mobile}
                                            name='mobile' type="text" onChange={handleChange} value={values.mobile} onBlur={handleBlur} autoComplete="off" />
                                    </Grid>
                                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <TextField
                                            sx={{ width: '80%' }}
                                            required
                                            id="email"
                                            label="Email"
                                            error={errors.email && touched.email}
                                            helperText={errors.email && touched.email && errors.email}
                                            name='email' type="email" onChange={handleChange} value={values.email} onBlur={handleBlur} autoComplete="off" />
                                    </Grid>
                                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <TextField
                                            sx={{ width: '80%' }}
                                            required
                                            id="password"
                                            label="Password"
                                            error={errors.password && touched.password}
                                            helperText={errors.password && touched.password && errors.password}
                                            name='password' type="password" onChange={handleChange} value={values.password} onBlur={handleBlur} autoComplete="off" />
                                    </Grid>
                                    <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
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
                                        <Button sx={{ width: '80%' }} variant="contained" color='primary' type="submit" >
                                            Register
                                            <AppRegistrationIcon />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            Already have an account?
                                            <Typography variant="overline" display="inline" gutterBottom>
                                                <Link to="/login"> Login<LoginIcon fontSize="small" /></Link>
                                            </Typography>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Form>
                    </RegisterForm>
                </div>

            </RegisterPage>
        )
    );
};

export default Register;

const RegisterPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    /* background-color:whitesmoke;     */
    background: linear-gradient( #0072ff85 30%, whitesmoke 30%);
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