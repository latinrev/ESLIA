import Link from "next/link";

export const Card = ({ to, item }) => {
  console.log(item);
  return (
    <Link href={to} className="h-full">
      <div className="relative h-full w-full">
        <div className="relative z-10 flex h-full flex-col self-center justify-self-center rounded-3xl border-2 border-secondary bg-primary px-24 py-16 pt-24 font-bold text-textSecondary">
          <span className="absolute -top-20 flex h-36 w-36 items-center justify-center self-center rounded-full border border-secondary bg-primary text-6xl font-bold text-textSecondary">
            {item?.number}
          </span>
          <div className="flex h-full flex-col gap-8">
            <h4 className="w-full text-6xl font-bold"> {item?.title}</h4>
            <p className="text-5xl font-light">{item?.description}</p>
          </div>
        </div>
        <span className="absolute bottom-[calc(-50%-0.8rem)] left-[calc(50%+0.8rem)] z-0 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-3xl border-2 bg-[#fff] text-4xl text-textSecondary" />
      </div>
    </Link>
  );
};
