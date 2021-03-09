import type { GetServerSideProps } from "next";

type Car = {
  createdAt: string;
  description: string;
  id: string;
  model: string;
  photos: [];
  published_at: string;
  slug: string;
  updatedAt: string;
};

type Props = {
  cars: Car[];
};

const IndexPage = ({ cars = [] }: Props): JSX.Element => {
  return (
    <ul>
      {cars.map((car) => {
        return <li key={car.id}>{car.model}</li>;
      })}
    </ul>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/cars");
  const data = await response.json();

  return {
    props: {
      cars: data,
    },
  };
};

export default IndexPage;
