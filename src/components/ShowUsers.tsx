import { Score } from '../interfaces/sccore';

interface Props {
  data: Score[];
}

export const ShowUsers = ({ data }: Props) => {
  if (data.length <= 0) {
    return <p>Cargando...</p>;
  }

  return (
    <div className='show__users'>
      <div className='container__users'>
        {data.map(({ points, total, user, image, active }, index) => (
          <div
            className={active ? 'content__users active' : 'content__users'}
            key={index}
          >
            <img className='img-fluid' src={image} />
            <span>{user}</span>
            <span key={index}>{points}</span>
            <span>{total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
