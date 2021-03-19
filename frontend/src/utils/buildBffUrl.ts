function buildBffUrl(endpoint: string): string {
  return `${process.env.BFF_URL}/${endpoint}`;
}

export default buildBffUrl;
