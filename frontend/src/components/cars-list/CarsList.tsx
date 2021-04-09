import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, createStyles } from "@material-ui/core";

import type { MinimalCar } from "types/Car";

type Props = {
  cars: MinimalCar[];
};

const useStyles = makeStyles((theme) =>
  createStyles({
    grid: {
      display: "flex",
      flexDirection: "column",
      listStyle: "none",
      padding: 0,
      maxWidth: "95%",
      margin: "0 auto",
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: "1000px",
      },
    },
    item: {
      margin: "12px",
      height: "260px",
      boxShadow: `0 10px 20px ${theme.palette.grey[200]}`,
      [theme.breakpoints.up("sm")]: {
        width: "calc(50% - (12px * 2))",
      },
      [theme.breakpoints.up("lg")]: {
        width: "calc(33% - (12px * 2))",
      },
    },
    link: {
      textDecoration: "none",
      cursor: "pointer",
      width: "100%",
      overflow: "hidden",
    },
    itemCard: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      paddingBottom: "24px",
      boxShadow: "none",
      "& > :last-child": {
        paddingBottom: 0,
      },
    },
    itemCardContent: {
      flexGrow: 1,
      padding: "16px 16px 0",
      overflow: "hidden",
    },
  })
);

const CarsList = ({ cars = [] }: Props): JSX.Element => {
  const styles = useStyles();

  return (
    <ul className={styles.grid}>
      {cars.map((car) => {
        return (
          <Link href={`/car/${car.slug}`} key={car.id}>
            <li className={styles.item}>
              <a className={styles.link}>
                <Card className={styles.itemCard}>
                  <CardHeader title={car.model} />
                  <CardContent className={styles.itemCardContent}>
                    {car.description}
                  </CardContent>
                </Card>
              </a>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default CarsList;
