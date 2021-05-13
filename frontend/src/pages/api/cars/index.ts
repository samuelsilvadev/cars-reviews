import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import type { Car } from "types/Car";

import StatusException from "api/exceptions/status";

function adaptCars(cars: Car[]) {
  return cars.map(({ slug, model, description, id }) => ({
    slug,
    model,
    description,
    id,
  }));
}

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get((_req, res) => {
  return fetch(`${process.env.API_URL}/cars`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.statusCode === 403) {
        throw new StatusException(
          "Access is not allowed on this route",
          response.statusCode
        );
      }

      if (response.statusCode >= 500) {
        throw new StatusException(
          "Something went wrong on our server",
          response.statusCode
        );
      }

      res.status(200).json(adaptCars(response));
    })
    .catch((err) => {
      if (err instanceof StatusException) {
        res
          .status(err.status)
          .json({ statusCode: err.status, message: err.message });
      } else {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
    });
});

export default handler;
