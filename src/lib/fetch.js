async function post(url, data) {
  const response = await fetch(url, {
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

async function get(url, keys, data) {
  let newUrl = null;

  keys.forEach(k => {
    // TODO: I think there was something about getting from a map
    const v = data[k];
    if (newUrl == null) {
      newUrl = `${url}?${k}=${v}`;
    } else {
      newUrl += `&${k}=${v}`;
    }
  });

  const resp = await fetch(newUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }

  // Weird but I have to await twice.
  const body = await await resp.json();

  if (!body) {
    return undefined;
  }

  return body;
}

export { post, get };
