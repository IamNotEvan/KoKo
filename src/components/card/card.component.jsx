import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import "./card.component.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

import data from "../../firebase/db.json";

const theme = createTheme({
  palette: {
    primary: {
      light: blue[250],
      main: blue[400],
      dark: blue[600],
      darker: blue[800],
    },
  },
});

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({ lessonNumber, imageSource }) {
  return (
    <Card sx={{ minWidth: 275 }} className="lesson-card">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
          Lesson {lessonNumber}
        </Typography>
      </CardContent>
      <img src={imageSource} alt="abc" className="card-image" />
      <CardActions>
        <ThemeProvider theme={theme}>
            <Link className="start-link" to={`/lesson/${lessonNumber}`}>
              <Button variant="contained" className='start-link' disabled={
                                                  data[`lesson${lessonNumber}`].complete 
                                                  || data[`lesson${lessonNumber}`].locked ? true : null}>
                Start
              </Button>
            </Link>
        </ThemeProvider>
      </CardActions>
    </Card>
  );
}