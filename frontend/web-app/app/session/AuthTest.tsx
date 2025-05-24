/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { updateAuctionTest } from '../actions/auctionActions';

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();

  function doUpdate() {
    setResult(undefined);
    setLoading(true);
    updateAuctionTest()
      .then((res) => setResult(res))
      .catch((err) => setResult(err))
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        outline
        onClick={doUpdate}
      >
        {loading && (
          <Spinner
            size="sm"
            aria-label="Loading"
            className="mr-3"
          />
        )}
        Test Auth
      </Button>
      <div>{JSON.stringify(result, null, 2)}</div>
    </div>
  );
}
