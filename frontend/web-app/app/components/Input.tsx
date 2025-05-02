import { Label, TextInput } from 'flowbite-react';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps {
  label: string;
  type?: string;
  showLabel?: boolean;
}
export default function Input(props: Props) {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  return (
    <div className="mb-3">
      {props.showLabel && (
        <div className="mb-2 block">
          <Label htmlFor={field.name}>{props.label}</Label>
        </div>
      )}
      <TextInput
        {...props}
        {...field}
        type={props.type || 'text'}
        placeholder={props.label}
        color={
          fieldState.error ? 'failure' : !fieldState.isDirty ? '' : 'success'
        }
      />
      {fieldState.error && (
        <div className="text-red-500 text-sm">{fieldState.error.message}</div>
      )}
    </div>
  );
}
