import type { RequestBody } from "./types";

function errorsValidator(requestBody: RequestBody): Record<string, string[]> {
  const { author, review, slug } = requestBody;
  const errors: Record<string, string[]> = {};

  if (!author) {
    errors.author = ["Author is required"];
  }

  if (!review) {
    errors.review = ["Review is required"];
  }

  if (!slug) {
    errors.slug = ["Car slug is required"];
  }

  return errors;
}

export default errorsValidator;
