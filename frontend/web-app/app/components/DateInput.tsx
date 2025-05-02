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
          <Label htmlFor={field.name}>{props.label}</Label>
        </div>
      )}

      <DatePicker
        {...props}
        {...field}
        placeholderText={props.label}
        selected={field.value}
        className={`
          block
          w-full
          rounded-lg
          border
          p-2.5
          text-sm
          focus:border-cyan-500
          focus:ring-cyan-500
          ${
            fieldState.error
              ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
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
