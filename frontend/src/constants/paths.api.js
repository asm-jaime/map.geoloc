export const USERS = {
  USER: `${API_URL}/api/v1/users`,
};

export const LOCS = {
  LOCS: `${API_URL}/api/v1/locs`,
  ALL: `${API_URL}/api/v1/locs/all`,
  RND: `${API_URL}/api/v1/locs/rnd`,
  NEAR: `${API_URL}/api/v1/locs/near`,
  STATE: `${API_URL}/api/v1/locs/state`,
  FILTER: `${API_URL}/api/v1/locs/filter`,
};

export const env_const = { //{{{
  STATUS_OK: 200,
  CONFIG_GET: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  },
};//}}}
