axios.get('/admin/dashboard', {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    })