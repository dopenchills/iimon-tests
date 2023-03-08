const reload = () => {
  const endpoint      = "https://catfact.ninja/fact";
  const text_element  = document.querySelector("p.text");
  fetch(endpoint, {
    method: "GET"
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    else {
      console.error(`API call failed: ${endpoint}`);
    }
  }).then(json => {
    const response = json;
    text_element.textContent = response.fact;
  })
};
