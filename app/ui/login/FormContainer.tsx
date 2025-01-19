import clsx from 'clsx';

type FormContainerProps = {
  formStatus: string;
  targetStatus: string;
  children: React.ReactNode;
};

export default function FormContainer({ formStatus, targetStatus, children }: FormContainerProps) {
  return (
    <div
      className={clsx(
        {
          block: formStatus === targetStatus,
          hidden: formStatus !== targetStatus,
        },
        "bg-white md:w-[450px] p-6 my-12 mx-auto md:rounded-xl md:shadow-custom"
      )}
    >
      {children}
    </div>
  );
}