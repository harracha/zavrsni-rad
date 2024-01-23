import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "./Button";

type NavigateButtonProps = ButtonProps & {
  to: string;
};

const NavigateButton: React.FC<NavigateButtonProps> = ({
  to,
  ...buttonProps
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use history.push to navigate to the specified route
    navigate(to);

    // If you want to perform additional actions on button click, you can use the onClick prop
    // buttonProps.onClick && buttonProps.onClick((e:any));
  };

  return <Button {...buttonProps} onClick={handleClick} />;
};

export { NavigateButton };
