function buildBffUrl(endpoint: string): string {
  return `${process.env.NEXT_PUBLIC_BFF_URL}/${endpoint}`;
}

export default buildBffUrl;
