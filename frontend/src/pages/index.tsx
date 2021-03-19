import type { GetServerSideProps } from "next";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core";

import { END_POINTS } from "constants/api";
import buildBffUrl from "utils/buildBffUrl";
import CarsList from "components/cars-list/CarsList";

import type { MinimalCar } from "types/Car";
import React, { useState } from "react";

type Props = {
  cars: MinimalCar[];
};

const useStyles = makeStyles({
  form: {
    marginTop: "20px",
    marginBottom: "100px",
    display: "flex",
    justifyContent: "center",
  },
  searchInput: {
    fontSize: "30px",
    height: "80px",
    width: "60%",
  },
});

const IndexPage = ({ cars = [] }: Props): JSX.Element => {
  const styles = useStyles();

  const [value, setValue] = useState<string>("");
  const [filteredCars, setFilteredCars] = useState<MinimalCar[]>(cars);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const _filteredCars = cars.filter((car) => {
      return car.model.toLowerCase().startsWith(value.toLowerCase());
    });

    setFilteredCars(_filteredCars);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          placeholder="Type a car model"
          type="search"
          className={styles.searchInput}
          value={value}
          onChange={handleOnChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      <CarsList cars={filteredCars} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(buildBffUrl(END_POINTS.CARS));
  const data = await response.json();

  return {
    props: {
      cars: data,
    },
  };
};

export default IndexPage;
