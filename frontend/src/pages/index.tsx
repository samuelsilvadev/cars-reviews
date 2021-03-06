import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { createStyles, makeStyles } from "@material-ui/core";

import type { GetServerSideProps } from "next";

import { END_POINTS } from "constants/api";
import buildBffUrl from "utils/buildBffUrl";
import CarsList from "components/cars-list/CarsList";

import type { MinimalCar } from "types/Car";

type Props = {
  cars: MinimalCar[];
};

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      marginTop: "20px",
      marginBottom: "50px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        marginBottom: "100px",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "stretch",
      },
    },
    searchInput: {
      fontSize: "30px",
      height: "80px",
      width: "90%",
      marginBottom: "5px",
      "& > input": {
        textAlign: "center",
      },
      [theme.breakpoints.up("sm")]: {
        marginBottom: "0",
        width: "60%",
      },
    },
    button: {
      width: "90%",
      [theme.breakpoints.up("sm")]: {
        width: "auto",
      },
    },
  })
);

const IndexPage = ({ cars = [] }: Props): JSX.Element => {
  const styles = useStyles();
  const searchInputRef = useRef<HTMLInputElement | undefined>();

  const [value, setValue] = useState<string>("");
  const [filteredCars, setFilteredCars] = useState<MinimalCar[]>(cars);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value.trim()) {
      searchInputRef.current?.focus();
      setFilteredCars(cars);
      return;
    }

    const _filteredCars = cars.filter((car) => {
      return car.model.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredCars(_filteredCars);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          inputRef={searchInputRef}
          placeholder="Type a car model"
          type="search"
          className={styles.searchInput}
          value={value}
          onChange={handleOnChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.button}
        >
          Search
        </Button>
      </form>
      <CarsList cars={filteredCars} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch(buildBffUrl(END_POINTS.CARS));
    const data = await response.json();

    if (response.status >= 400) {
      throw data;
    }

    return {
      props: {
        cars: data,
      },
    };
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      cars: [],
    },
  };
};

export default IndexPage;
