import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/FadeTransition.module.scss";
import { FadeTransitionProps } from "./types";



const FadeTransition: React.FC<FadeTransitionProps> = ({
  in: inProp,
  duration = 200,
  children,
  className = "",
  mountOnEnter = true,
  unmountOnExit = true,
}) => {
  const [show, setShow] = useState(inProp);
  const [state, setState] = useState(inProp ? "entered" : "exited");
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inProp) {
      if (mountOnEnter) setShow(true);
      requestAnimationFrame(() => setState("entering"));
      setTimeout(() => setState("entered"), 20);
    } else {
      setState("exiting");
      setTimeout(() => {
        setState("exited");
        if (unmountOnExit) setShow(false);
      }, duration);
    }
    // eslint-disable-next-line
  }, [inProp]);

  if (!show && unmountOnExit) return null;

  let transitionClass = "";
  if (state === "entering") transitionClass = "fade-enter";
  if (state === "entered") transitionClass = "fade-enter-active";
  if (state === "exiting") transitionClass = "fade-exit";
  if (state === "exited") transitionClass = "fade-exit-active";

  return (
    <div
      ref={nodeRef}
      className={`${styles[className]} ${styles[transitionClass]}`.trim()}
      style={{ transition: `opacity ${duration}ms, transform ${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeTransition;