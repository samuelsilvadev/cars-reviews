import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

import type { Car } from "types/Car";

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
      res.status(200).json(adaptCars(response));
    })
    .catch((err) => {
      res.status(500).json({ statusCode: 500, message: err.message });
    });
});

export default handler;
