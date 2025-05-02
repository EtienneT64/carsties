'use client';

import { deleteAuction } from '@/app/actions/auctionActions';
import { Button, Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  id: string;
}

export default function DeleteButton({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function doDelete() {
    setLoading(true);
    deleteAuction(id)
      .then((res) => {
        if (res.error) throw res.error;
        router.push('/');
      })
      .catch((error) => {
        toast.error(`${error.status} ${error.message}`);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Button
      color={'red'}
      onClick={doDelete}
    >
      {loading && (
        <Spinner
          size="sm"
          aria-label="Loading"
          className="me-3"
        />
      )}
      Delete Auction
    </Button>
  );
}
