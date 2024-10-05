// Helper function to extract the "offset" query parameter from the API URL
function getQueryParamFromUrl(url, queryName) {
  const urlObj = new URL(url); // Create a URL object from the string
  const params = new URLSearchParams(urlObj.search); // Get the search parameters
  const paramValue = params.get(queryName); // Get the value of the specified query parameter

  // Return the value as a number if it's found, or 0 if it's not
  return paramValue ? Number(paramValue) : 0;
}

export default getQueryParamFromUrl;
