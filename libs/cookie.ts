const parse = (cookies: string) => {
  const result: Record<string, string> = {};
  const pairs = cookies.split('; ');
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    result[key] = value;
  }
  return result;
};

const cookie = {
  parse,
};

export default cookie;
