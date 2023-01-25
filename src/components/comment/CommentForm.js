import React, { useState } from "react";

import { Grid, TextField, Typography, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { SEND_COMMENT } from "../../graphql/mutaition";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentForm = ({ slug }) => {
  const [value, setValue] = useState({
    name: "",
    email: "",
    text: "",
  });

  const [pressed, setPressed] = useState(false);

  const valueHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const [sendComment, { loading, data, error }] = useMutation(SEND_COMMENT, {
    variables: {
      name: value.name,
      email: value.email,
      text: value.text,
      slug: slug,
    },
  });

  const sendHandler = () => {
    if (!value.name || !value.text || !value.email) {
      toast.warn("تمام فیلد ها را پر کنید", {
        position: "top-center",
      });
    } else if (
      value.name &&
      value.text &&
      value.email &&
      !/\S+@\S+\.\S+/.test(value.email)
    ) {
      toast.warn("ایمیل معتبر نیست", {
        position: "top-center",
      });
    } else {
      sendComment();
      setPressed(true);
    }
  };

  if (data && pressed) {
    toast.success("ارسال شد و منتظر تایید می باشد", {
      position: "top-center",
    });
    setPressed(false);
    setValue({
        name: "",
        email: "",
        text: ""
    })
  }

  return (
    <Grid
      container
      sx={{
        boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px",
        borderRadius: 4,
        py: 1,
        mt: 5,
      }}
    >
      <Grid item xs={12} m={2}>
        <Typography component="p" variant="h6" fontWeight={700} color="primary">
          ارسال کامنت
        </Typography>
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="نام کاربری"
          variant="outlined"
          sx={{ width: "100%" }}
          value={value.name}
          onChange={valueHandler}
          name="name"
        />
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="ایمیل"
          variant="outlined"
          sx={{ width: "100%" }}
          value={value.email}
          onChange={valueHandler}
          name="email"
        />
      </Grid>
      <Grid item xs={12} m={2}>
        <TextField
          label="متن کامنت"
          variant="outlined"
          sx={{ width: "100%" }}
          value={value.text}
          onChange={valueHandler}
          name="text"
          multiline
          minRows={4}
        />
      </Grid>
      <Grid item m={2}>
        {loading ? (
          <Button variant="contained" disabled>
            در حال ارسال ...
          </Button>
        ) : (
          <Button onClick={sendHandler} variant="contained">
            ارسال
          </Button>
        )}
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default CommentForm;
