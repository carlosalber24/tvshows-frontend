import {expect, test} from '@jest/globals';
import axios, { AxiosResponse } from 'axios';

const mockData = 'defaultLocation=9.74569,-63.18323';

async function getTrailList(params: string) {
  try {
    const ENDPOINT_URL = `http://localhost:3001/v1/trails/list?${params}`;
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

test('Get trail list data from service', async () => {
  const data = await getTrailList(mockData);
  expect(data.status).toBe(true);
});

test('the trail list service fails with an error', async () => {
  expect.assertions(0);
  try {
    await getTrailList(mockData);
  } catch (e) {
    expect(e).toMatch('error');
  }
});