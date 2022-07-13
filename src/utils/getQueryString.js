import qs from "qs";

const getQueryString = (string) => {
  if (string.length === 0) return "";
  const query = qs.parse(string, {
    ignoreQueryPrefix: true,
  });
  return query.q;
};

export default getQueryString;
