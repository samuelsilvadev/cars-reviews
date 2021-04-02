import buildBffUrl from "utils/buildBffUrl";
import { END_POINTS } from "constants/api";

import type { NextApiRequest, NextApiResponse } from "next";

import errorsValidator from "./errorsValidator";

import type { Review } from "./types";

const fetchCarBySlug = (slug: string) =>
  fetch(`${buildBffUrl(END_POINTS.CAR)}/${slug}`);

const saveReview = (data: Review) =>
  fetch(`${process.env.API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

function saveHandler(
  req: NextApiRequest,
  res: NextApiResponse
): void | Promise<void | undefined> {
  const parsedBody = JSON.parse(req.body);
  const { author, review, slug } = parsedBody;
  const errors = errorsValidator(parsedBody);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      statusCode: 400,
      message: "Validation failed",
      meta: { errors },
    });
  }

  return fetchCarBySlug(slug)
    .then((response) => response.json())
    .then((carResponse) => {
      const [car] = carResponse;

      return saveReview({
        author,
        description: review,
        car: car._id,
      });
    })
    .then((response) => {
      if (response.status === 400) {
        return response.json().then((error) => {
          throw {
            message: "Validation failed",
            meta: error.data,
            status: 400,
          };
        });
      }

      res.status(201).end();
    })
    .catch((err) => {
      const { status, message, meta } = err;

      res.status(status || 500).json({ statusCode: status, message, meta });
    });
}

export default saveHandler;
