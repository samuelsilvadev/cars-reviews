import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get((req, res) => {
  const { slug } = req.query;

  return fetch(`${process.env.API_URL}/cars?slug=${slug}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({ statusCode: 500, message: err.message });
    });
});

export default handler;
