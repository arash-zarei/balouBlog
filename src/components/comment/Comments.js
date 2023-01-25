import React from "react";

import { useQuery } from "@apollo/client";
import { GET_POST_COMMENTS } from "../../graphql/queries";
import { Avatar, Box, Grid, Typography } from "@mui/material";

const Comments = ({ slug }) => {
  const { loading, data, error } = useQuery(GET_POST_COMMENTS, {
    variables: { slug },
  });

  if (loading) return null;

  return (
    <Grid
      container
      sx={{
        boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px",
        borderRadius: 4,
        py: 1,
        mt: 8,
      }}
    >
      <Grid item xs={12} m={2}>
        <Typography component="p" variant="h6" fontWeight={700} color="primary">
          کامنت ها
        </Typography>
      </Grid>
      {data.comments.map((comment) => (
        <Grid
          item
          xs={12}
          m={2}
          p={2}
          key={comment.id}
          borderRadius={1}
          border="1px solid silver"
        >
          <Box component="div" display="flex" alignItems="center" mb={3}>
            <Avatar>{comment.name[0]}</Avatar>
            <Typography component="span" variant="p" fontWeight={700} mr={2}>
              {comment.name}
            </Typography>
          </Box>
          <Typography component="p" variant="p">{comment.text}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default Comments;
