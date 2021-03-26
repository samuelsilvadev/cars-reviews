import React from "react";
import Link from "next/link";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core";

import type { GetServerSideProps } from "next";

import { END_POINTS } from "constants/api";
import buildBffUrl from "utils/buildBffUrl";

import type { Car as CarType } from "types/Car";

type Props = {
  car: CarType;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      position: "relative",
    },
    backLink: {
      position: "absolute",
      top: "10px",
      left: "20px",
      textTransform: "uppercase",
      textDecoration: "none",
      color: theme.palette.primary.main,
      [theme.breakpoints.up("sm")]: {
        left: "50px",
      },
    },
    hero: {
      width: "100%",
      height: "50vh",
      objectFit: "cover",
      verticalAlign: "bottom",
    },
    heroBackup: {
      backgroundColor: theme.palette.grey[200],
      width: "100%",
      height: "50vh",
    },
    contentWrapper: {
      backgroundColor: theme.palette.common.white,
      padding: "20px",
      borderBottomLeftRadius: "4px",
      borderBottomRightRadius: "4px",
      boxShadow: `0 10px 20px ${theme.palette.grey[200]}`,
      [theme.breakpoints.up("sm")]: {
        padding: "20px 50px",
      },
    },
    additionalInfoWrapper: {
      display: "flex",
    },
    createdAt: {
      marginRight: "20px",
    },
    subtitle: {
      marginBottom: "20px",
    },
  })
);

function Car({ car }: Props): JSX.Element {
  const {
    photos: [primaryPhoto] = [],
    model,
    description,
    reviews,
    createdAt,
  } = car;

  const styles = useStyles();
  const createdAtDate = new Date(createdAt);

  return (
    <Container fixed>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.backLink}>back</a>
        </Link>
        {primaryPhoto ? (
          <img
            className={styles.hero}
            srcSet={`
              ${process.env.NEXT_PUBLIC_ASSETS_URL}${primaryPhoto.formats.thumbnail.url} 375w,
              ${process.env.NEXT_PUBLIC_ASSETS_URL}${primaryPhoto.formats.small.url} 768w,
              ${process.env.NEXT_PUBLIC_ASSETS_URL}${primaryPhoto.formats.medium.url} 1200w,
            `}
            sizes="(max-width: 768px) 375px, (min-width: 769px) and (max-width: 1024px) 768px, 1024px"
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${primaryPhoto.formats.medium.url}`}
            alt={primaryPhoto.alternativeText}
          />
        ) : (
          <div className={styles.heroBackup} aria-hidden />
        )}
        <div className={styles.contentWrapper}>
          <div className={styles.additionalInfoWrapper}>
            <Typography
              variant="h6"
              component="p"
              color="textSecondary"
              className={styles.createdAt}
            >
              Created at: {createdAtDate.toLocaleDateString()}
            </Typography>
            <Typography variant="h6" component="p" color="textSecondary">
              {reviews.length} reviews
            </Typography>
          </div>
          <Typography variant="h2" component="h1">
            {model}
          </Typography>
          <Typography variant="h6" component="p" className={styles.subtitle}>
            {description}
          </Typography>
          <Button variant="outlined" color="primary">
            Write a review
          </Button>
        </div>
      </header>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params?.slug) {
    const response = await fetch(
      buildBffUrl(`${END_POINTS.CAR}/${params.slug}`)
    );
    const [car] = await response.json();

    if (car) {
      return {
        props: {
          car,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};

export default Car;
