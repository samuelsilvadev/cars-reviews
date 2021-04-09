import React, { useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core";

import ArrowUpwards from "components/icons/ArrowUpwards";

type Props = {
  elementToWatch?: React.MutableRefObject<HTMLElement | null>;
};

const useStyles = makeStyles(
  createStyles({
    button: {
      position: "fixed",
      bottom: "50px",
      right: "60px",
      width: "70px",
      height: "50px",
    },
  })
);

const ELEMENT_VISIBLE_RATIO = {
  MIN: 0.4,
  MAX: 0.6,
};

function BackToTop(props: Props): JSX.Element | null {
  const { elementToWatch } = props;

  const styles = useStyles();
  const [isVisible, setIsVisible] = useState(false);
  const lastBoundingClientRectTop = useRef<number>(0);

  useEffect(() => {
    if (!elementToWatch || !elementToWatch.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const { intersectionRatio, isIntersecting, boundingClientRect } = entry;

        const isScrollingDown =
          boundingClientRect.top < lastBoundingClientRectTop.current;

        if (
          (intersectionRatio > ELEMENT_VISIBLE_RATIO.MIN &&
            intersectionRatio < ELEMENT_VISIBLE_RATIO.MAX &&
            isScrollingDown) ||
          !isIntersecting
        ) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }

        lastBoundingClientRectTop.current = boundingClientRect.top;
      },
      {
        root: null,
        threshold: [0, 0.5, 1],
      }
    );

    observer.observe(elementToWatch.current);

    return () => {
      observer.disconnect();
    };
  }, [elementToWatch]);

  const handleOnClick = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isVisible ? (
    <Button
      aria-label="Go to the top of the page"
      title="Go to the top of the page"
      variant="contained"
      color="primary"
      onClick={handleOnClick}
      className={styles.button}
    >
      <ArrowUpwards />
    </Button>
  ) : null;
}

export default BackToTop;
