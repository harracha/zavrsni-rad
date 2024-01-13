interface headerProps {
  login: string;
  userEmail?: string;
  userRole?: string;
}

const Header: React.FC<headerProps> = (props) => {
  return (
    <div className="flex flex-col mt-8 md:mt-0 md:flex-row p-5 border-b-[1px] border-neutral-weak bg-section-strong gap-10 justify-between bg-gray-800">
      <div className="flex flex-col gap-3">
        <div className="title-1 text-neutral">{"Osnove elektrotehnike"}</div>
        <div className="body-2 text-neutral">{"infoMessage"}</div>
      </div>
      <div className=" gap-2 items-center hidden md:flex">{props.login}</div>
      <div className=" gap-2 items-center flex flex-row-reverse md:hidden z-0">
        {"actions"}
      </div>
    </div>
  );
};

export default Header;
