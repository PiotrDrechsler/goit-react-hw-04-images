import { Oval } from 'react-loader-spinner';
import s from '../Loader/Loader.module.css';
export const Loader = () => {
  return (
    <div className={s.overlay}>
      <Oval
        className={s.loader}
        height={80}
        width={80}
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#3f51b5"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};
