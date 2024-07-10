class Api {
  searchResults() {
    const result = fetch(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20`)
    .then(response => response.json())
    .catch((err) => {
      console.error(err);
    })
    return result;
  }
  defaulsSearchResults() {
    const result = fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
    .then(response => response.json())
    .catch((err) => {
      console.error(err);
    })
    return result;
  }

  fetchImage(url: string) {
    const item = fetch(url).then(response => response.json())
    .catch((err) => {
      console.error(err);
    });
    return item;
  }

  fetchAll(count: number) {
    const result = fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${count}`)
    .then(response => response.json())
    .catch((err) => {
      console.error(err);
    })
    return result;
  }
}

export default Api;