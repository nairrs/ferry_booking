import {getSecret} from 'wix-secrets-backend';
import { fetch } from 'wix-fetch';

let nautikaUsername = '';
let nautikaToken = '';

export const getApiKey = async()=>{
  nautikaUsername = await getSecret('nautika_username');
  nautikaToken = await getSecret('nautika_token');
}

console.log(nautikaUsername, nautikaToken);

export async function postTripData(tFrom, tTo, tDate) {
  const serverURL = 'http://api.dev.gonautika.com:8012/';
  const endpoint = 'getTripData';

  const userRouteInput = {
    from:tFrom,
    to:tTo,
    date:tDate,
    userName: await getSecret('nautika_username'),
    token: await getSecret('nautika_token')
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userRouteInput),
  };
  
  try {
    const response = await fetch(`${serverURL}${endpoint}`, requestOptions);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error fetching data');
  }
}
