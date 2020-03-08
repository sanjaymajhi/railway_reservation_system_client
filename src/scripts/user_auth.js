export const login_form_submit = e => {
  e.preventDefault();
  const url = "http://localhost:9000/user/login/";
  let data = {
    email: e.email.value,
    password: e.password.value,
    "g-recaptcha-response": e["g-recaptcha-response"].value
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => res.json())
    .then(token => {
      localStorage.setItem("token", token);
      let form = document.getElementById("token_submit");
      form.token.value = token;
      form.submit();
    });
};

export const gettopost = (e, link) => {
  e.preventDefault();
  let form = document.getElementById("token_submit");
  form.token.value = localStorage.getItem("token");
  form.action = link;
  form.submit();
};

export const logout = e => {
  e.preventDefault();
  localStorage.removeItem("token");
  let form = document.getElementById("token_submit");
  form.action = "/";
  form.method = "get";
  form.token.disabled = "true";
  form.submit();
};
