
interface APIParams {
  uri: string;
  method: 'POST' | 'GET',
  body: any;
}

export const callAPI = async ({ uri, method, body }: APIParams) => {

  console.log('callAPI:',uri, method, body);

  const fetch_result = await fetch(uri ,{
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
    method,
  })

  const fetch_json = await fetch_result.json();

  if(fetch_json.ok === false) throw new Error('login error');
  return fetch_json.data;
}