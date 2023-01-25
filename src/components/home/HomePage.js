import React from "react";

import { Container, Grid, Typography } from "@mui/material";
import Authors from "../author/Authors";
import Blogs from "../blog/Blogs";

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} padding={3}>
        <Grid item xs={12} md={3} mt={4}>
          <Typography component="h5" variant="h5" fontWeight={700} mb={3}>
            نویسنده ها
          </Typography>
          <Authors />
        </Grid>
        <Grid item xs={12} md={9} mt={4}>
          <Typography component="h5" variant="h5" fontWeight={700} mb={3}>
            مقالات
          </Typography>
          <Blogs />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
