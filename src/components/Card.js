import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function BasicCard({txt,count}) {
    return (
        <Card sx={{ minWidth: 275 }} className='count-card'>
            <CardContent>
                <Typography variant="subtitle1" gutterBottom  sx={{ display: 'flex', justifyContent: 'center' }}>
                    {txt}
                </Typography>
                <Typography variant="h3" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>
                    {count}
                </Typography>
            </CardContent>

        </Card>
    );
}
