import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      padding: "0 50px",
      margin: "100px auto",
      [theme.breakpoints.up("sm")]: {
        padding: "0",
        maxWidth: "500px",
      },
    },
    title: {
      marginBottom: "10px",
    },
    subtitle: {
      marginBottom: "50px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "5px",
    },
    textarea: {
      marginBottom: "30px",
    },
    input: {
      marginBottom: "30px",
    },
    button: {
      alignSelf: "flex-end",
    },
  })
);

function CreateReview(): JSX.Element {
  const styles = useStyles();

  return (
    <article className={styles.wrapper}>
      <Typography variant="h5" component="h1" className={styles.title}>
        Add Your Review
      </Typography>
      <Typography variant="body1" component="p" className={styles.subtitle}>
        Your review will be used to help other users to find the right car.
      </Typography>
      <form className={styles.form}>
        <InputLabel htmlFor="review" className={styles.label}>
          Your Review
        </InputLabel>
        <Input
          id="review"
          rowsMin={10}
          className={styles.textarea}
          multiline
          rows={7}
        />
        <InputLabel htmlFor="author" className={styles.label}>
          Author Email
        </InputLabel>
        <Input id="author" type="email" className={styles.input} />
        <Button variant="outlined" color="primary" className={styles.button}>
          Save
        </Button>
      </form>
    </article>
  );
}

export default CreateReview;
