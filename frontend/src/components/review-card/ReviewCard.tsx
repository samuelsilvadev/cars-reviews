import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core";

type Props = {
  createdAt: string;
  description: string;
  author: string;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.common.white,
      paddingBlock: theme.spacing(4),
      paddingInline: theme.spacing(2),
      borderRadius: "4px",
      boxShadow: `0 5px 15px ${theme.palette.grey[200]}`,
      [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
      },
    },
    imagePlaceholder: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "28px",
      color: theme.palette.common.white,
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: theme.palette.grey[400],
      marginInlineEnd: theme.spacing(2),
    },
    left: {
      display: "flex",
      alignItems: "center",
      flexBasis: "40%",
      marginBlockEnd: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        marginBlockEnd: 0,
      },
    },
    date: {
      marginBlockEnd: theme.spacing(1),
    },
  })
);

const ReviewCard = (props: Props): JSX.Element => {
  const { createdAt, description, author } = props;

  const styles = useStyles();

  return (
    <article className={styles.wrapper}>
      <Typography variant="srOnly" component="h2">
        Review from {author}
      </Typography>
      <div className={styles.left}>
        <div className={styles.imagePlaceholder}>-</div>
        <p>{author}</p>
      </div>
      <div>
        <Typography variant="body2" component="p" className={styles.date}>
          {new Date(createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle2" component="p">
          {description}
        </Typography>
      </div>
    </article>
  );
};

export default ReviewCard;
