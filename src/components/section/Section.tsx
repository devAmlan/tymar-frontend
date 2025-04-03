export default function Section({
  heading,
  subheading,
  children,
}: {
  heading?: string;
  subheading?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <h2 className="md:text-5xl text-3xl font-bold text-center md:mb-10 mb-5">
        {heading}
      </h2>
      <h3 className="md:text-lg text-base font-normal text-center md:mb-10 mb-10">{subheading}</h3>
      <div className="md:w-3/4 w-full mb-20 mx-5">{children}</div>
    </div>
  );
}
