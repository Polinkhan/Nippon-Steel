const fetchDataFromApi = async (data, apiLink, callback) => {
  try {
    const response = await fetch(apiLink, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.text();
    callback(json);
  } catch (error) {
    console.error(error);
  }
};

export { fetchDataFromApi };
