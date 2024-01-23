"use client";

import classNames from "classnames";
import React, { useRef, useState } from "react";
// import Icon, { IconName } from "./Icon";
import { Spinner } from "./Spinner";

export type ButtonType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "ghost";

export type ButtonProps = React.PropsWithChildren<
  React.ComponentPropsWithRef<"button">
> & {
  buttonType?: ButtonType;
  small?: boolean;
  loading?: boolean;
  hasConfirmation?: boolean;
} & (
    | {
        label: string;
        // icon?: IconName;
      }
    | {
        label?: string;
        // icon?: IconName;
      }
  );

const Button: React.FC<ButtonProps> = (props) => {
  const {
    buttonType,
    disabled,
    small,
    style,
    onClick,
    type,
    // icon,
    loading,
    label,
    className,
    hasConfirmation,
  } = props;

  const buttonPrimaryClasses = classNames(
    !disabled && "bg-neutral text-neutral-weak hover:bg-neutral-strong",
    disabled && "bg-neutral-weak text-neutral-medium"
  );

  const [clicked, setClicked] = useState(false);

  const buttonSecondaryClasses = classNames(
    !disabled && "bg-neutral-weak text-neutral hover:bg-neutral-medium",
    disabled && "bg-neutral-weak text-neutral-medium"
  );

  const buttonTertiaryClasses = classNames(
    !disabled &&
      "bg-opacity-0 text-neutral border-[1px] border-neutral-medium hover:bg-neutral-weak hover:border-[0px]",
    disabled && "bg-neutral-weak text-neutral-medium"
  );

  const buttonGhostClasses = classNames(
    !disabled &&
      "bg-opacity-0 text-neutral border-neutral-medium hover:bg-neutral-weak",
    disabled && "bg-neutral-weak text-neutral-medium"
  );

  const buttonDangerClasses = classNames(
    !disabled && "bg-danger text-neutral hover:bg-danger-strong",
    disabled && "bg-danger-weak text-neutral-medium"
  );

  const buttonInfoClasses = classNames(
    !disabled &&
      "bg-success text-neutral hover:bg-success-strong active:opacity-50",
    disabled && "bg-success-weak text-neutral-medium"
  );

  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      onClick={(e) => {
        if (hasConfirmation && !disabled) {
          if (!clicked) {
            setClicked(true);
          } else {
            onClick && onClick(e);
          }
        } else if (!disabled) {
          onClick && onClick(e);
        }
      }}
      type={type ? type : "button"}
      style={{
        ...style,
      }}
      className={classNames(
        className,
        !className && "max-w-min",
        !disabled && !loading && "actionable-translation",
        "select-none whitespace-nowrap",
        "relative flex justify-center items-center rounded-lg transition ease-in-out",
        small ? "h-8" : "h-10",
        small && label && "px-3 gap-1 button-small",
        !small && label && "px-4 gap-2 button",
        !small && !label && "px-2",
        small && !label && "px-1",
        buttonType == "primary" && buttonPrimaryClasses,
        buttonType == "secondary" && buttonSecondaryClasses,
        buttonType == "tertiary" && buttonTertiaryClasses,
        buttonType == "ghost" && buttonGhostClasses,
        buttonType == "danger" && buttonDangerClasses
      )}
      ref={buttonRef}
      onMouseLeave={() => setClicked(false)}
      disabled={disabled}
    >
      {(!hasConfirmation || hasConfirmation == undefined) && (
        <>
          {label && (
            <span
              className={classNames(
                loading && "opacity-0 ",
                small ? "button-small" : "button"
              )}
            >
              {label}
            </span>
          )}
          {/* {icon && (
            <>
              <Icon
                icon={icon}
                size={small ? 16 : 20}
                className={classNames(
                  loading && "opacity-0",
                  "md:block hidden",
                  buttonType === "primary" &&
                    (disabled ? "bg-neutral-medium" : "bg-neutral-weak"),
                  buttonType !== "primary" &&
                    (disabled ? "bg-neutral-medium" : "bg-neutral")
                )}
              />
              <Icon
                icon={icon}
                size={small ? 12 : 16}
                className={classNames(
                  loading && "opacity-0",
                  "md:hidden block",
                  disabled && buttonType === "primary"
                    ? "bg-neutral-medium"
                    : "bg-neutral-weak",
                  disabled && buttonType !== "primary"
                    ? "bg-neutral-medium"
                    : "bg-neutral"
                )} */}
          {/* /> */}
        </>
        //   )}
        // </>
      )}
      {hasConfirmation && (
        <div className={"relative"}>
          {label && (
            <span
              className={classNames(
                loading && "opacity-0 ",
                small ? "button-small" : "button"
              )}
            >
              <div className={classNames(clicked && "opacity-0")}>{label}</div>
              <div
                className={classNames(
                  "absolute top-0 left-1/2 -translate-x-1/2",
                  loading && "opacity-0 ",
                  small ? "button-small" : "button",
                  !clicked && "hidden"
                )}
              >
                Sure?
              </div>
            </span>
          )}
          {/* {icon && (
            <>
              <Icon
                icon={icon}
                size={small ? 16 : 20}
                className={classNames(
                  clicked && hasConfirmation && "hidden",
                  loading && "opacity-0",
                  "md:block hidden",
                  buttonType === "primary" &&
                    (disabled ? "bg-neutral-medium" : "bg-neutral-weak"),
                  buttonType !== "primary" &&
                    (disabled ? "bg-neutral-medium" : "bg-neutral")
                )}
              />
              <Icon
                icon={icon}
                size={small ? 12 : 16}
                className={classNames(
                  clicked && hasConfirmation && "hidden",
                  loading && "opacity-0",
                  "md:hidden block",
                  disabled && buttonType === "primary"
                    ? "bg-neutral-medium"
                    : "bg-neutral-weak",
                  disabled && buttonType !== "primary"
                    ? "bg-neutral-medium"
                    : "bg-neutral"
                )}
              />
            </> */}
          {/* )} */}
        </div>
      )}

      {loading && (
        <>
          <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
            <Spinner white={buttonType == "primary"} />
          </div>
        </>
      )}
    </button>
  );
};

export { Button };
