import ButtonLink from './ButtonLink';



type CardServiceProps = {
  title: string;
  description: string;
  imageUrl: string;
};

const CardService: React.FC<CardServiceProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="card-service">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <ButtonLink href="/booking" label="Book Now" />
    </div>
  );
};

export default CardService;
