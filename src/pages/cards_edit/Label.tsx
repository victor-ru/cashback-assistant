import React from "react";
import styles from "./styles.module.css";
import classnames from "classnames";

export function Label(props: { children: React.ReactNode; long?: boolean }) {
  return (
    <div
      className={classnames("left", styles.leftLabel, {
        [styles.leftLabelLong]: props.long,
      })}
    >
      {props.children}
    </div>
  );
}
