/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Auction } from '@/types';
import { Button, Spinner } from 'flowbite-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createAuction, updateAuction } from '../actions/auctionActions';
import DateInput from '../components/DateInput';
import Input from '../components/Input';

interface Props {
  auction?: Auction;
}

export default function AuctionForm({ auction }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    control,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm({
    mode: 'onTouched',
  });

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus('make');
  }, [auction, reset, setFocus]);

  async function onSubmit(data: FieldValues) {
    try {
      let id = '';
      let res;

      if (pathname === '/auctions/create') {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          res = await updateAuction(data, auction.id);
          id = auction.id;
        }
      }
      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(`${error.status} ${error.message}`);
    }
  }

  return (
    <form
      className="flex flex-col mt-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: 'Make is required' }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: 'Model is required' }}
      />
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: 'Color is required' }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          control={control}
          type="number"
          rules={{ required: 'Year is required' }}
        />
        <Input
          label="Mileage"
          name="mileage"
          control={control}
          type="number"
          rules={{ required: 'Mileage is required' }}
        />
      </div>

      {pathname === '/auctions/create' && (
        <>
          <Input
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: 'Image URL is required' }}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price (enter 0 if no reserve)"
              name="reservePrice"
              control={control}
              type="number"
              rules={{ required: 'Reserve price is required' }}
            />
            <DateInput
              label="Auction end date/time"
              name="auctionEnd"
              dateFormat={'dd MMMM yyyy h:mm a'}
              showTimeSelect
              control={control}
              rules={{ required: 'Auction end date is required' }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button
          outline
          color="gray"
        >
          Cancel
        </Button>
        <Button
          outline
          color="green"
          disabled={!isValid}
          type="submit"
        >
          {isSubmitting && (
            <Spinner
              size="sm"
              className="mr-3"
              aria-label="Loading"
            />
          )}
          Submit
        </Button>
      </div>
    </form>
  );
}
