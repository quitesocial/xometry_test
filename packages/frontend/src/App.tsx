import React, { FC, useEffect } from 'react';

const host = process.env['REACT_APP_BACKEND_HOST'];
const port = process.env['REACT_APP_BACKEND_PORT'];
const url = `${host}:${port}`;

export const App: FC = () => {
  useEffect(() => {
    fetch(`${host}:${port}/ping`)
      .then((response) => response.json())
      .then(json => {
        console.info(json);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  const backend = `Backend hosted on ${url}`;

  return (
    <main>
      <h1>TODO: Xometry frontend assignment</h1>
      <h2>{backend}</h2>
    </main>
  );
}
