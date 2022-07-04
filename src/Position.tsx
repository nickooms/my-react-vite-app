import * as React from 'react';
import { useControls } from 'leva';
import { Location } from './Location';
import { useCurrentPosition } from './useCurrenPosition';
import { TextFieldProps, TextFieldFactory } from './TextFieldProps';
import './Position.css';
import './App.css';

export const Position = () => {
  const currentPosition = useCurrentPosition(true, {
    enableHighAccuracy: true,
  });
  const [
    {
      Position: [x, y],
    },
  ] = useControls(() => ({
    Position: [currentPosition.latitude || 0, currentPosition.longitude || 0],
  }));

  const [form, setForm] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onUpdateField: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { name, value },
  }) => {
    const nextFormState = {
      ...form,
      [name]: value,
    };
    setForm(nextFormState);
  };

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  const TextField: React.FC<TextFieldProps> = TextFieldFactory(onUpdateField);

  // <details open>
  //   <summary>Position</summary>
  //   <form className="form" onSubmit={onSubmitForm}>
  //     <TextField label="Latitude">{currentPosition.latitude}</TextField>
  //     <TextField label="Longitude">{currentPosition.longitude}</TextField>
  //   </form>
  // </details>;

  return (
    <>
      {currentPosition.latitude && currentPosition.longitude && (
        <Location
          latitude={currentPosition.latitude!}
          longitude={currentPosition.longitude!}
        />
      )}
    </>
  );
};
