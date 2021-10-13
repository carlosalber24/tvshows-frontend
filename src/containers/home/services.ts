import axios, { AxiosResponse } from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function getTvShows(params: string) {
  try {
    console.log(BASE_URL);
    const ENDPOINT_URL = `${BASE_URL}v1/tvshows/list?${params}`;
    const requestOptions = {
      headers: { 'Content-Type': 'application/json' },
    };

    const requestData: AxiosResponse = await axios.get(ENDPOINT_URL, requestOptions);
    return { status: requestData.data.status, data: requestData.data.data, error: '' };
  } catch (err) {
    console.log(err);
    return { status: false, data: '', error: 'An expected error has ocurred' }
  }
}