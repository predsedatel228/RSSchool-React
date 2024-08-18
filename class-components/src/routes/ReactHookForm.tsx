import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { IForm } from '../types';
import { validation } from '../validation';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/store';

const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
    resolver: yupResolver(validation),
  });

  const onSubmit: SubmitHandler<IForm> = (data: IForm) => {
    console.log(data);
  };
  const countries = useSelector((state: IRootState) => state.countriesSlice);
  return (
    <div>
      <p>React hook form</p>
      <Link to="/">To Main page</Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        // autoComplete="off"
        className="form"
      >
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input type="text" id={'name'} {...register('name')} />
        </div>
        <span className="error-message">
          {errors.name && errors.name.message}
        </span>

        <div className="form-field">
          <label htmlFor="email">E-mail</label>
          <input type="text" id={'email'} {...register('email')} />
        </div>
        <span className="error-message">
          {errors.email && errors.email.message}
        </span>

        <div className="form-field">
          <label htmlFor="age">Age</label>
          <input type="number" className='input-number' min={1} id={'age'} {...register('age')} />
        </div>
        <span className="error-message">
          {errors.age && errors.age.message}
        </span>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input type="password" id={'password'} {...register('password')} />
        </div>
        <span className="error-message">
          {errors.password && errors.password.message}
        </span>
        <div className="form-field">
          <label htmlFor="comfirmPassword">Confirm password</label>
          <input
            type="password"
            id={'comfirmPassword'}
            {...register('comfirmPassword')}
          />
        </div>
        <span className="error-message">
          {errors.comfirmPassword && errors.comfirmPassword.message}
        </span>
        <fieldset className="form-field">
          <span>Gender</span>
          <input type="radio" id="male"  value={'male'} {...register('gender')}/>
          <label htmlFor="male">Male</label>
          <input type="radio" id="female" value={'female'} {...register('gender')}/>
          <label htmlFor="female">Female</label>
        </fieldset>

        <span className="error-message">
          {errors.gender && errors.gender.message}
        </span>

        <div className="form-field">
          <input type="checkbox" id={'accept'} {...register('accept')} />
          <label htmlFor="accept">accept Terms and Conditions agreement</label>
        </div>
        <span className="error-message">
          {errors.accept && errors.accept.message}
        </span>

        <div className="form-field">
          <label htmlFor="image">Upload image</label>
          <input type="file" id={'image'} {...register('image')} />
        </div>
        <span className="error-message">
          {errors.image && errors.image.message}
        </span>

        <div className="form-field">
          <label htmlFor="country">Country</label>
          <input
            type="list"
            id="country"
            list="list"
            size={10}
            {...register('country')}
            className="list"
          />
        </div>
        <span className="error-message">
          {errors.country && errors.country.message}
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

export default ReactHookForm;
