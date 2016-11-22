const API_URL = process.env.REACT_APP_API_URL

function path(curr) {
  // TODO: use real path joining
  return `${API_URL}/${curr}`
}

async function post(url, data) {
  const response = await fetch(path(url), {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const body = await await response.json();

  if (!body) {
    return undefined;
  }

  return body;
}

async function get(url, data) {
  let newUrl = null
  url = path(url)

  Object.keys(data).forEach(k => {
    const v = data[k];
    if (newUrl == null) {
      newUrl = `${url}?${k}=${v}`;
    } else {
      newUrl += `&${k}=${v}`;
    }
  })

  const resp = await fetch(newUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (resp.status !== 200) {
    throw new Error(resp.statusText)
  }

  // Weird but I have to await twice.
  const body = await await resp.json()

  if (!body) {
    return undefined
  }

  return body
}

export { post, get };
