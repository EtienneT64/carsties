import { Label } from 'flowbite-react';
import DatePicker, { DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useController, UseControllerProps } from 'react-hook-form';

type Props = UseControllerProps &
  DatePickerProps & {
    label: string;
    type?: string;
    showLabel?: boolean;
  };
export default function DateInput(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <div className="mb-3">
      {props.showLabel && (
        <div className="mb-2 block">
          <Label
            htmlFor={field.name}
            title={props.label}
          />
        </div>
      )}

      <DatePicker
        {...props}
        {...field}
        placeholderText={props.label}
        selected={field.value}
        className={`
          rounded-lg
          w-[100%]
          border
          border-gray-600
          p-2
          flex flex-col
          ${
            fieldState.error
              ? 'bg-red-50 border-red-500 text-red-900'
              : !fieldState.invalid && fieldState.isDirty
              ? 'bg-green-50 border-green-500 text-green-900'
              : ''
          }
        `}
      />
      {fieldState.error && (
        <div className="text-red-500 text-sm">{fieldState.error.message}</div>
      )}
    </div>
  );
}
