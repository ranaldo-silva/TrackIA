import Link from "next/link";

const HomeButton = () => {
  return (
    <div className="absolute top-4 right-4">
      <Link href="/">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Home
        </button>
      </Link>
    </div>
  );
};

export default HomeButton;