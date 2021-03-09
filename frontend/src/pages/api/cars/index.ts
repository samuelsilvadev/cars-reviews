import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get((_req, res) => {
  return fetch(`${process.env.API_URL}/cars`)
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
