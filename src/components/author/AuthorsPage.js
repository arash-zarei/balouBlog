import React from "react";

import { useQuery } from "@apollo/client";
import { GET_AUTHOR_INFO } from "../../graphql/queries";
import { useParams } from "react-router-dom";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import sanitizeHtml from "sanitize-html";
import CardEL from "../shared/CardEL";
import Loader from "../shared/Loader";

const AuthorsPage = () => {
  const { slug } = useParams();

  const { loading, data, error } = useQuery(GET_AUTHOR_INFO, {
    variables: { slug },
  });

  if (loading) return <Loader />;
  if (error) return <h1>Error...</h1>;

  const {
    author: {
      avatar: { url },
      name,
      description: { html },
      fild,
      posts
    },
  } = data;

  return (
    <Container maxWidth="lg">
      <Grid container mt={10}>
        <Grid
          item
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar src={url} sx={{ width: 250, height: 250 }} />
          <Typography component="h3" variant="h5" mt={4}>
            {name}
          </Typography>
          <Typography component="p" variant="h5" color="text.secondary" mt={2}>
            {fild}
          </Typography>
        </Grid>
        <Grid item xs={12} mt={5}>
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}></div>
        </Grid>
        <Grid item xs={12} mt={6}>
          <Typography component="h3" variant="h5" fontWeight={700}>
            مقالات {name}
          </Typography>
          <Grid container spacing={2} mt={2}>
            {posts.map(post => (
                <Grid item xs={12} sm={6} md={4}>
                    <CardEL title={post.title} slug={post.slug} coverPhoto={post.coverPhoto} />
                </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthorsPage;
