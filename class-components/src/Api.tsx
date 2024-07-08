class Api {
  searchResults() {
    const result = fetch(`https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20`)
    .then(response => response.json())
    .catch((err) => {
      console.error(err);
      console.log('ошибка');
    })
    .then(data => console.log(data));
    return result;
  }
  defaulsSearchResults() {
    const result = fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`)
    .then(response => response.json())
    .catch((err) => {
      console.error(err);
      console.log('ошибка');
    })
    .then(data => {
      console.log(data)
      return data;
    });
    return result;
  }

  fetchImage(url: string) {
    const item = fetch(url).then(response => response.json())
    .catch((err) => {
      console.error(err);
      console.log('ошибка');
    })
    .then(data => {
      console.log(data)
      return data;
    })

    return item;
  }

  fetchAll(count: number) {
    const result = fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${count}`)
    .then(response => response.json())
    .catch((err) => {
      console.error(err);
      console.log('ошибка');
    })
    .then(data => {
      console.log(data)
      return data;
    });
    return result;
  }
}

export default Api;