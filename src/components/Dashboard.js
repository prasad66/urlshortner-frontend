/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { isExpired } from 'react-jwt'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoaderPage from './LoaderPage'
import { API_URL } from '../constants'
import CustomisedSnackbar from './CustomisedSnackbar'
import BasicCard from './Card';
import { Typography } from '@mui/material'

const Dashboard = () => {
    document.title='Dashboard'

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [color, setColor] = useState('');
    const [msg, setMsg] = useState('');
    const [shortUrl, setShortUrl] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [total, setTotal] = useState('')
    // console.log(token);




    const { handleChange, handleSubmit, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            url: "",
            customUrl: "",
        },
        validationSchema: yup.object({
            url: yup.string().url('Enter a valid url').required("URL is required"),
            customUrl: yup.string().matches(/^[A-Za-z0-9 ]+$/, "Special Characters Not Allowed").min('10', 'Custom Path must be 10 characters').max('10', 'Custom Path must be 10 characters')
        }),
        onSubmit: values => {
            generateUrl(values);
        }
    })

    const generateUrl = async (data) => {
        setLoading(true);
        const response = await fetch(`${API_URL}/url/createurl`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token,
            },
            body: JSON.stringify({
                "email": user.email,
                "url": data.url,
                "customUrl": data.customUrl
            }),
        });

        setLoading(false);
        const result = await response.json();
        console.log(result);
        setError(true);
        if (response.status === 200) {
            setShortUrl(result.shortLink);
            setError(true);
            setColor('success')
            setMsg("URL Shortened !!!");
            values.url = "";
            values.customUrl = "";
            setTimeout(() => { setError(false); }, 3000);
        }
        else if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            console.log(response.status);
            navigate('/')
        }
        else if (response.status === 400 && result.message === 'Url already exists') {
            setColor('warning')
            setMsg("Url already exists");
        }

    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        console.log(error)
        setError(true);
        setColor('success')
        setMsg("URL Copied !!!");
        setTimeout(() => { setError(false); }, 3000);
    }

    const count = async () => {
        setLoading(true);
        const response = await fetch(`${API_URL}/urlinfo`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json', 'token': token, 'email': user.email },
        });

        const result = await response.json();
        setMonth(result.monthCount);
        setDay(result.todayCount);
        setTotal(result.total);
        console.log(result)
        setLoading(false);
    }
    useEffect(() => {
        if (isExpired(localStorage.getItem('token'))) {
            localStorage.removeItem('token');
            navigate('/')
        }

        count();

    }, [navigate]);

    return (
        loading ? <LoaderPage /> : (
            <Box sx={{ margin: '50px 20px' }}>
                <CustomisedSnackbar show={error} msg={msg} color={color} />

                <Form onSubmit={handleSubmit}>
                    <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
                        <Grid item xs={11} sm={9} md={7}>
                            <TextField
                                sx={{ width: '100%' }}
                                required
                                id="url"
                                label="URL"
                                error={errors.url && touched.url}
                                helperText={errors.url && touched.url && errors.url}
                                name='url' type="url" onChange={handleChange} value={values.url} onBlur={handleBlur} autoComplete="off"
                                placeholder="eg. https://www.example.com/"
                            />

                        </Grid>
                        <Grid item xs={11} sm={9} md={7} sx={{ justifyContent: 'center' }}>
                            <TextField
                                sx={{ width: '100%' }}

                                label="Custom URL"
                                // type={isVisible ? 'text' : 'password'}
                                id="customUrl"
                                error={errors.customUrl && touched.customUrl}
                                helperText={errors.customUrl && touched.customUrl && errors.customUrl}
                                name='customUrl' onChange={handleChange} value={values.customUrl} onBlur={handleBlur} autoComplete="off"
                                placeholder="eg. a4s5ffe5c2"

                            />
                        </Grid>
                        <br />
                    </Grid>
                    <Grid container spacing={3} sx={{ marginTop: '0px', justifyContent: 'center' }}>

                        <Grid item xs={11} sm={9} md={4}>
                            <Button sx={{ width: '100%' }} variant="contained" color='primary' type="submit" >Generate  <ArrowForwardIosIcon fontSize="" /> </Button>
                        </Grid>
                    </Grid>
                </Form>

                <Grid container spacing={5} sx={{ marginTop: '20px', justifyContent: 'center' }}>
                    <Grid item xs={11} sm={9} md={7}>
                        <TextField
                            disabled
                            sx={{ width: '100%' }}
                            id="outlined-disabled"
                            label="Shortened URL"
                            value={shortUrl}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                            onClick={handleCopy}
                                        >
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={5} sx={{ marginTop: '5px', display: "flex", justifyContent: 'center' }}>
                    <Grid item xs={11} sm={5} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ display: "flex", justifyContent: 'center' }}>URLs Shortened:</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={5} sx={{ marginTop: '10px', display: "flex", justifyContent: 'center' }}>
                    <Grid item spacing={2} xs={11} sm={5} md={3}>
                        <BasicCard txt={'TOTAL'} count={total} />
                    </Grid>
                    <Grid item spacing={2} xs={11} sm={5} md={3}>
                        <BasicCard txt={'THIS MONTH'} count={month} />
                    </Grid>
                    <Grid item spacing={2} xs={11} sm={5} md={3}>
                        <BasicCard txt={'TODAY'} count={day} />
                    </Grid>
                </Grid>
            </Box>
        )
    )
}

export default Dashboard

const Form = styled.form``;