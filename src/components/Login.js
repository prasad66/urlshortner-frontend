import * as React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { API_URL } from '../constants'
import { useNavigate } from 'react-router-dom'
import { isExpired } from 'react-jwt'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import VisibilityIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import CustomisedSnackbar from './CustomisedSnackbar';
import LoaderPage from './LoaderPage';

const Login = () => {
    document.title = 'Login'

    const navigate = useNavigate();

    React.useEffect(() => {

        if (isExpired(localStorage.getItem('token'))) {
            localStorage.removeItem('token');
            return;
        }
        navigate('/dashboard')

    }, [navigate])


    const [error, setError] = React.useState(false);
    const [color, setColor] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [isVisible, setIsVisible] = React.useState(false);



    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email('Enter a valid email address').required("Email is required"),
            password: yup.string().min('8', 'Password must be at least 8 characters').required("Please enter the password"),
        }),
        onSubmit: values => {
            login(values);
        }
    })

    const login = async (data) => {
        setLoading(true);
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify({
                "email": data.email,
                "password": data.password,
            }),
        });
        const result = await response.json();
        console.log(result);
        setLoading(false)
        setError(true);
        if (response.status === 200) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.loggedUser));
            setColor('success')
            setMsg("Login Successful");
            setTimeout(() =>{navigate('/dashboard')}, 2000);
            return;
        } else {
            if (response.status === 400) {
                setColor('error')
                setMsg("User doesn't exist");
                return;
            }
            else if (response.status === 401) {
                setColor('error')
                setMsg('Invalid credentials');
                return;
            }else if (response.status === 409) {
                setColor('warning')
                setMsg('Account not verified!!! Please verify to continue...');
                return;
            }
        }

    }



    return (
        loading ? <LoaderPage /> : (
            <LoginPage>
                <div className="col-12 col-md-8 col-lg-6">
                    <CustomisedSnackbar show={error} msg={msg} color={color} />

                    <LoginForm className="px-0 py-5 mx-3">

                        <Typography variant="h3" gutterBottom component="div" sx={{ textAlign: 'center', marginBottom: '30px' }}>
                            Login
                        </Typography>
                        <Form onSubmit={handleSubmit}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                                    <Grid item xs={11} sm={9} md={7}>
                                        <TextField
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <PersonIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ width: '100%' }}

                                            id="email"
                                            label="Email*"
                                            error={errors.email && touched.email}
                                            helperText={errors.email && touched.email && errors.email}
                                            name='email' type="email" onChange={handleChange} value={values.email} onBlur={handleBlur} autoComplete="off" />

                                    </Grid>
                                    <Grid item xs={11} sm={9} md={7}>
                                        <TextField
                                            sx={{ width: '100%' }}

                                            label="Password*"
                                            type={isVisible ? 'text' : 'password'}
                                            id="password"
                                            error={errors.password && touched.password}
                                            helperText={errors.password && touched.password && errors.password}
                                            name='password' onChange={handleChange} value={values.password} onBlur={handleBlur} autoComplete="off"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end" onClick={() => setIsVisible(!isVisible)}>
                                                        <IconButton >
                                                            {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={11} sm={9} md={7} sx={{ justifyContent: 'end' }}>
                                        <div className="p-0 d-flex justify-content-end">
                                            <Typography variant="caption" display="inline" gutterBottom>
                                                <Link to="/forgot-password"> Forgot Password?</Link>
                                            </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={11} sm={9} md={7}>
                                        <Button sx={{ width: '100%' }} variant="contained" color='success' type="submit" >Login <LoginIcon /></Button>
                                    </Grid>
                                    <Grid item xs={11} sm={9} md={8}>
                                        <Typography variant="caption" display="block" gutterBottom sx={{ textAlign: 'center' }}>
                                            Need an Account?
                                            <Typography variant="overline" display="inline" gutterBottom>
                                                <Link to="/register"> Signup here <AppRegistrationIcon fontSize="small" /></Link>
                                            </Typography>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Form>
                    </LoginForm>
                </div>
            </LoginPage>
        )
    )
}

export default Login

const LoginPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(180deg, #0072ff85 30%, whitesmoke 30%);
     `;
const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    background-color:white;
    border-radius: 10px;

    box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
    -webkit-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
    -moz-box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.7);
`;

const Form = styled.form``;