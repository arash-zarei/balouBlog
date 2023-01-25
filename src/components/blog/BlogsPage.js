import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_BLOG_INFO } from "../../graphql/queries";
import Loader from "../shared/Loader";
import { Container } from "@mui/system";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import sanitizeHtml from "sanitize-html";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CommentForm from "../comment/CommentForm";
import Comments from "../comment/Comments";

function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { loading, data, errors } = useQuery(GET_BLOG_INFO, {
    variables: { slug },
  });

  if (loading) return <Loader />;

  if (errors) return <h3>Error...</h3>;

  const {
    post: {
      author: {
        name,
        fild,
        avatar
      },
      content: { html },
      title,
      coverPhoto
    },
  } = data;

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} mt={9} display="flex" justifyContent="space-between">
          <Typography
            component="h2"
            variant="h4"
            color="primary"
            fontWeight={700}
          >
            {title}
          </Typography>
          <ArrowBackRoundedIcon onClick={() => navigate(-1)} />
        </Grid>
        <Grid item xs={12} mt={6}>
          <img
            src={coverPhoto.url}
            alt={slug}
            width="100%"
            style={{ borderRadius: 15 }}
          />
        </Grid>
        <Grid item xs={12} mt={7} display="flex" alignItems="center">
          <Avatar
            src={avatar.url}
            sx={{ width: 80, height: 80, marginLeft: 2 }}
        />
          <Box component="div">
            <Typography component="p" variant="h5" fontWeight={700}>
              {name}
            </Typography>
            <Typography component="p" variant="p" color="text.secondary">
              {fild}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} mt={5}>
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(html),
            }}
          ></div>
        </Grid>
        <Grid item xs={12}>
            <CommentForm slug={slug} />
        </Grid>
        <Grid item xs={12}>
            <Comments slug={slug} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default BlogPage;