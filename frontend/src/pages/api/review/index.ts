import nc from "next-connect";

import type { NextApiRequest, NextApiResponse } from "next";

import saveHandler from "./save/saveHandler";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(saveHandler);

export default handler;
