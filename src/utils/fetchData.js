export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    }
};

export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
      'X-RapidAPI-Key': '3df1fd5de4msh3d1dbd32c47ea24p1ceadcjsn9f62c6db221f',
    },
  };


export const fetchData = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json();

    return data;
};