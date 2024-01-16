import { FC } from "react";

interface CardProps {
  logoUrl: string;
  title: string;
  subTitle: string;
}

const Card: FC<CardProps> = ({ logoUrl, title, subTitle }) => {
  return (
    <div className="md:w-[260px] w-300px h-[320px] shadow-sm border-gray-200 border rounded-md">
      <figure className="card-title max-w-20 mx-5 mt-5 border-gray-200 border p-5 rounded-md">
        <img className="w-10" src={logoUrl} alt={title} />
      </figure>

      <div className="m-5">
        <h3 className="font-bold text-base my-5">{title}</h3>
        <p className="text-gray-500 text-sm">{subTitle}</p>
      </div>
    </div>
  );
};

export default Card;
