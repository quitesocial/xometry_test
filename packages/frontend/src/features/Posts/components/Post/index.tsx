type Props = {
  body: string,
  date: string,
  title: string,
}

export const Post = ({
  body,
  date,
  title,
}: Props) => (
  <div className='card'>
    <p className='card__date'>{date}</p>
    <h3 className='card__title'>{title}</h3>
    <p className='card__body'>{body}</p>
  </div>
);
