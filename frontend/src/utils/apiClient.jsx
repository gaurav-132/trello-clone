const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = async (endpoint, {
  method = 'GET',
  params = null,
  body = null,
} = {}) => {
    let url = `${BASE_URL}${endpoint}`;

    if (params && typeof params === 'object') {
        const query = new URLSearchParams(params).toString();
        url += `?${query}`;
    }

    const config = {
        method,
    };

    if (body && method !== 'GET') {
        config.headers = { 'Content-Type': 'application/json' };
        config.body = JSON.stringify(body);
    }

    const res = await fetch(url, config);
    return res; 
};

export default apiClient;
