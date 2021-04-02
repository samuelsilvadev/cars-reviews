import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core";

import ReviewCard from "components/review-card/ReviewCard";

type Props = {
  reviews: {
    id: string;
    createdAt: string;
    description: string;
    author: string;
  }[];
};

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      listStyle: "none",
      padding: "0",
    },
    item: {
      marginBottom: theme.spacing(4),
    },
  })
);

const ReviewsList = (props: Props): JSX.Element | null => {
  const { reviews } = props;

  const styles = useStyles();

  if (reviews.length == 0) {
    return null;
  }

  return (
    <section>
      <Typography variant="h4" component="h2">
        Reviews
      </Typography>
      <ul className={styles.list}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.item}>
            <ReviewCard {...review} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ReviewsList;
