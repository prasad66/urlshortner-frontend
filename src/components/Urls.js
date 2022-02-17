import React, { useEffect, useState } from 'react'
import { isExpired } from 'react-jwt'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';

import { API_URL } from './../constants';


const Urls = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { email } = JSON.parse(localStorage.getItem('user'));

  const [pageSize, setPageSize] = useState(10);

  const [urls, setUrls] = useState('');

  useEffect(() => {

    if (isExpired(token)) {
      localStorage.removeItem('token');
      navigate('/')
    }

  }, [navigate]);

  const getUrls = async () => {
    const response = await fetch(`${API_URL}/url/getall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "token": token,
        "email": email
      },
    })

    const data = await response.json()
    const finalData = data.urls.map((url, index) => {
      return {
        id: index + 1,
        sno: index + 1,
        url: url.url,
        shortUrl: url.shortUrl,
        clicks: url.clicks,
      }
    })
    setUrls(finalData)
    console.log(data.urls)
  }

  useEffect(() => {
    getUrls();
  }, []);

  const columns = [
    { field: 'sno', headerName: 'S.No', width: 100 },
    { field: 'url', headerName: 'URL', width: 350 },
    { field: 'shortUrl', headerName: 'Short URL', width: 385 },
    { field: 'clicks', headerName: 'Visited', width: 250 },
  ];


  return (
    <Box sx={{ flexGrow: 1, marginTop: '25px' }}>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={11} sm={10} md={9} sx={{ height: '400' }}>
          <div style={{ height: 550, width: '100%', }}>

            <DataGrid
              rows={urls}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[10, 15, 20]}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>

        </Grid>
      </Grid>
    </Box >
  )
}

export default Urls