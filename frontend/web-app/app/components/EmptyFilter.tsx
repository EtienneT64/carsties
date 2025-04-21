'use client';

import { useParamsStore } from '@/hooks/useParamsStore';
import { Button } from 'flowbite-react';
import Heading from './Heading';

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export default function EmptyFilter({
  title = 'No matches for this filter',
  subtitle = 'Try changing or resetting the filter',
  showReset,
}: Props) {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading
        center
        subtitle={subtitle}
        title={title}
      />
      <div className="mt-4">
        {showReset && (
          <Button
            onClick={reset}
            outline
          >
            Remove Filters
          </Button>
        )}
      </div>
    </div>
  );
}
