import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <div className="flex flex-col items-center justify-center mx-auto overflow-y-auto h-[92vh] md:h-[82vh] hidden-scrollbar w-full">
    {children}
  </div>
);

export default Container;
