import nc from "next-connect";
import cors from "cors";

import type { NextApiRequest, NextApiResponse } from "next";

import saveHandler from "./save/saveHandler";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors()).post(saveHandler);

export default handler;
