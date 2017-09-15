export const USERS = {
  USER: `${API_URL}/api/v1/users`,
};

export const POINTS = {
  POINTS: `${API_URL}/api/v1/points`,
  ALL: `${API_URL}/api/v1/points/all`,
  RND: `${API_URL}/api/v1/points/rnd`,
  NEAR: `${API_URL}/api/v1/points/near`,
  STATE: `${API_URL}/api/v1/points/state`,
  FILTER: `${API_URL}/api/v1/points/filter`,
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
