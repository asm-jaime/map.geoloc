'use strict';
const fetch = require('node-fetch');

const SERVER = "localhost";
const PORT = "8080";
const URL = `http://${SERVER}:${PORT}`

const static_point = {
  token: gen_token(),
  coordinates: [gen_num(), gen_num()],
};

//gen data {{{
function gen_num() {
  const min = 0.0000;
  const max = 1.9000;
  return Math.random() * (max - min) + min;
}

function gen_token() {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const len_token = 5;
  let text = "";
  for (let i = 0; i < len_token; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  };
  return text;
} //}}}

// ========== rnd_point

function get_rnd_point() {
  fetch(`${URL}/api/v1/rnd_point/get`)
    .then((res) => res.json())
    .then((json) => console.log('get random_point:', json))
    .catch(error => console.log('get random_point error: ', error));
}

function post_rnd_point() {//{{{
  let rnd_pos = {
    token: gen_token(),
    coordinates: [gen_num(), gen_num()],
  };

  fetch(`${URL}/api/v1/rnd_point/post`, {
      method: 'POST',
      body: JSON.stringify(rnd_pos),
    })
    .then((res) => res.json())
    .then((json) => console.log('post random_point: ', json))
    .catch(error => console.log('post random_point error: ', error));
}//}}}

// ========== point

function get_points() {
  fetch(`${URL}/api/v1/point/get`)
    .then((res) => res.json())
    .then((json) => console.log('get point:', json))
    .catch(error => console.log('get point error: ', error));
}

// get_rnd_point();
post_rnd_point();
get_points();
