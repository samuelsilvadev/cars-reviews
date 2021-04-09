import React, { useEffect, useState } from "react";
import Link from "next/link";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { createStyles, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

import useSaveReview from "hooks/reviews/useSaveReview";

import type { ErrorBody } from "hooks/reviews/types";

type ReviewForm = {
  review: string;
  author: string;
};

const flexColumContainerStyles = {
  display: "flex",
  flexDirection: "column" as const,
};

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
    reviewWrapper: {
      ...flexColumContainerStyles,
      width: "100%",
      marginBottom: "30px",
    },
    authorWrapper: {
      ...flexColumContainerStyles,
      marginBottom: "30px",
    },
    button: {
      alignSelf: "flex-end",
    },
    alert: {
      marginBottom: theme.spacing(2),
    },
    formFooter: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    cancelLink: {
      textTransform: "uppercase",
      textDecoration: "none",
      marginRight: "10px",
    },
  })
);

const schema = yup.object().shape({
  review: yup.string().min(10).required(),
  author: yup.string().email().required(),
});

const buildErrorAlerts = (err: ErrorBody, className?: string) => {
  if (typeof err.meta == "undefined" || typeof err.meta.errors == "undefined") {
    return [];
  }

  return Object.keys(err.meta.errors).map((field) => {
    const [firstMessage] = err.meta?.errors?.[field] ?? [];

    if (!firstMessage) {
      return null;
    }

    return (
      <Alert
        key={field}
        variant="outlined"
        severity="error"
        color="error"
        className={className}
      >
        {firstMessage}
      </Alert>
    );
  });
};

function CreateReview(): JSX.Element {
  const router = useRouter();
  const styles = useStyles();
  const { register, errors, handleSubmit, reset } = useForm<ReviewForm>({
    resolver: yupResolver(schema),
  });
  const [state, save] = useSaveReview();
  const [hideSuccessAlert, setHideSuccessAlert] = useState(false);

  useEffect(() => {
    if (state.created) {
      reset();
    }
  }, [state.created]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setHideSuccessAlert(true);
    }, 3000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [state.created]);

  const onSubmit = async (values: ReviewForm): Promise<void> => {
    const { slug: slugQuery } = router.query;
    const slug = Array.isArray(slugQuery) ? slugQuery[0] : slugQuery;

    save({ ...values, slug });
    setHideSuccessAlert(false);
  };

  return (
    <article className={styles.wrapper}>
      {state.created && !hideSuccessAlert && (
        <Alert variant="outlined" severity="success" className={styles.alert}>
          Your review was posted successfully
        </Alert>
      )}
      {state.err && buildErrorAlerts(state.err, styles.alert)}
      <Typography variant="h5" component="h1" className={styles.title}>
        Add Your Review
      </Typography>
      <Typography variant="body1" component="p" className={styles.subtitle}>
        Your review will be used to help other users to find the right car.
      </Typography>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.reviewWrapper}>
          <InputLabel htmlFor="review" className={styles.label}>
            Your Review
          </InputLabel>
          <Input
            id="review"
            name="review"
            rowsMin={10}
            multiline
            rows={7}
            inputRef={register}
          />
          {errors.review && (
            <Typography color="error" variant="body1" component="p">
              {errors.review.message}
            </Typography>
          )}
        </div>
        <div className={styles.authorWrapper}>
          <InputLabel htmlFor="author" className={styles.label}>
            Author Email
          </InputLabel>
          <Input id="author" name="author" type="email" inputRef={register} />
          {errors.author && (
            <Typography color="error" variant="body1" component="p">
              {errors.author.message}
            </Typography>
          )}
        </div>
        <div className={styles.formFooter}>
          <Link href={`/car/${router.query.slug}`}>
            <a className={styles.cancelLink}>Cancel</a>
          </Link>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={styles.button}
            disabled={state.isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </article>
  );
}

export default CreateReview;
