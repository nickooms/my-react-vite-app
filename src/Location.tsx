import * as React from 'react';
import { useLocation } from './useLocation';
// import { useControls } from 'leva';
import { TextFieldProps, TextFieldFactory } from './TextFieldProps';
import './Position.css';
import './App.css';
import { Objects } from './Objects';

interface LocationProps {
  latitude: number;
  longitude: number;
}

export const Location: React.FC<LocationProps> = ({ latitude, longitude }) => {
  const { location } = useLocation({ latitude, longitude });

  /* const controls = useControls('Location', {
    formattedAddress: location?.FormattedAddress ?? '',
    municipality: location?.Municipality ?? '',
    zipcode: location?.Zipcode ?? '',
    thoroughfarename: location?.Thoroughfarename ?? '',
    housenumber: location?.Housenumber ?? '',
    id: location?.ID ?? '',
  }); */

  const [form, setForm] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onUpdateField: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const nextFormState = {
      ...form,
      [e.currentTarget.name]: e.currentTarget.value,
    };
    setForm(nextFormState);
  };

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    alert(JSON.stringify(form, null, 2));
  };

  const TextField: React.FC<TextFieldProps> = TextFieldFactory(onUpdateField);

  console.log(location);

  return (
    //  <details open>
    //    <summary>Location</summary>
    location && (
      // <>
      <Objects
        x={location.Location.X_Lambert72}
        y={location.Location.Y_Lambert72!}
      />
    )
    /* <form className="form" onSubmit={onSubmitForm}>
            <TextField label="Formatted Address">{location.FormattedAddress}</TextField>
            <TextField label="Municipality">{location.Municipality}</TextField>
            <TextField label="Zipcode">{location.Zipcode}</TextField>
            <TextField label="Thoroughfarename">{location.Thoroughfarename}</TextField>
            <TextField label="Housenumber">{location.Housenumber}</TextField>
            <TextField label="ID">{location.ID}</TextField>
          </form> }
      // </>
    )
    // </details>
  );
};*/
  );
};
