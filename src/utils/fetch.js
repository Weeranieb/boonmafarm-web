export const fetchData = async (url, requestOptions) => {
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    // setError(error);
    console.log(error);
    return null;
  }
};
