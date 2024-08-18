import { SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from '../components/PasswordStrength';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/store';
import { IForm } from '../types';
import { validation } from '../validation';
import { ValidationError } from 'yup';
import getValidationErrors from '../getValidationErrors';

interface IError {
  name?: string[];
  age?: string[];
  email?: string[];
  password?: string[];
  comfirmPassword?: string[];
  gender?: string[];
  accept?: string[];
  image?: string[];
  country?: string[];
}

type inputdata = { preventDefault: () => void; target: { files: File[]; value: IForm; }[]; };

const UncontrolledForm = () => {
  const countries = useSelector((state: IRootState) => state.countriesSlice);
  const [password, setPassword] = useState('');
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [gender, setGender] = useState('');
  const [femaleChecked, setFemaleChecked] = useState(false);
  const [maleChecked, setMaleChecked] = useState(false);
  const [accept, setAccept] = useState(false);
  const [errors, setErrors] = useState({} as IError);

  const handleData = async (event: {
    preventDefault: () => void;
    target: {
      files: File[];
      value: IForm;
    }[];
  }) => {
    event.preventDefault();
    const formData = {
      name: event.target[0].value,
      age: event.target[2].value,
      email: event.target[1].value,
      password: event.target[3].value,
      comfirmPassword: event.target[4].value,
      gender: gender,
      accept: accept,
      image: event.target[9].files,
      country: event.target[10].value,
    };
    console.log(formData);
    const isValid = await validation.isValid(formData);
    if (isValid) {
      setErrors({})
    }

    try {
      validation.validateSync(formData, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log(getValidationErrors(error));
        setErrors(getValidationErrors(error));
      }
    }
  };

  const handleGenderChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setGender(e.target.value);
    if (e.target.value === 'male') {
      setMaleChecked(true);
      setFemaleChecked(false);
    } else {
      setMaleChecked(false);
      setFemaleChecked(true);
    }
  };
  return (
    <div>
      <p>Form</p>
      <Link to="/">To Main page</Link>
      <form
        onSubmit={(e) => handleData(e as unknown as inputdata)}
        className="form"
      >
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input type="text" id={'name'} />
        </div>
        <span className="error-message">{errors.name && errors.name[0]}</span>
        <div className="form-field">
          <label htmlFor="email">E-mail</label>
          <input type="text" id={'email'} />
        </div>
        <span className="error-message">{errors.email && errors.email[0]}</span>
        <div className="form-field">
          <label htmlFor="age">Age</label>
          <input type="number" className="input-number" id={'age'} />
        </div>
        <span className="error-message">{errors.age && errors.age[0]}</span>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id={'password'}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setShowPasswordStrength(true)}
          />
        </div>{' '}
        <div
          style={{
            height: '62px',
          }}
        >
          {showPasswordStrength && (
            <div
              style={{
                visibility: !showPasswordStrength ? 'hidden' : 'visible',
              }}
            >
              <PasswordStrengthMeter password={password} />
            </div>
          )}
        </div>
        <p className="error-message">
        {errors.password && errors.password[0]}
        </p>
        <div className="form-field">
          <label htmlFor="comfirmPassword">Confirm password</label>
          <input type="password" id={'comfirmPassword'} />
        </div>
        <span className="error-message">
        {errors.comfirmPassword && errors.comfirmPassword[0]}
        </span>
        <fieldset className="form-field">
          <span>Gender</span>
          <input
            type="radio"
            id="male"
            value={'male'}
            onChange={handleGenderChange}
            checked={maleChecked}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            value={'female'}
            onChange={handleGenderChange}
            checked={femaleChecked}
          />
          <label htmlFor="female">Female</label>
        </fieldset>
        <span className="error-message">
        {errors.gender && errors.gender[0]}
        </span>
        <div className="form-field terms">
          <input
            type="checkbox"
            id={'accept'}
            onChange={() => setAccept(!accept)}
          />
          <label htmlFor="accept">Accept Terms and Conditions agreement</label>
        </div>
        <span className="error-message">
        {errors.accept && errors.accept[0]}
        </span>
        <div className="form-field">
          <label htmlFor="image">Upload image</label>
          <input type="file" id={'image'} />
        </div>
        <span className="error-message">
        {errors.image && errors.image[0]}
        </span>
        <div className="form-field">
          <label htmlFor="country">Country</label>
          <input
            type="list"
            id="country"
            list="list"
            size={10}
            className="list"
          />
        </div>
        <span className="error-message">
        {errors.country && errors.country[0]}
        </span>
        <datalist className="datalist" id="list">
          {countries.map((v: string) => {
            return <option key={v}>{v}</option>;
          })}
        </datalist>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UncontrolledForm;
