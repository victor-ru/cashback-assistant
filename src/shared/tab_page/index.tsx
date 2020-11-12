import React from "react";
import { BackButton, Page, Toolbar } from "react-onsenui";
import styles from "./styles.module.css";

interface TabPageProps {
  children: React.ReactNode;
  title?: string;
  backButtonText?: string;
  rightButton?: React.ReactNode;
}

export function TabPage(props: TabPageProps) {
  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          {props.backButtonText && (
            <div className="left">
              <BackButton>{props.backButtonText}</BackButton>
            </div>
          )}
          <div className="center">{props.title}</div>
          {props.rightButton && (
            <div className="right">{props.rightButton}</div>
          )}
        </Toolbar>
      )}
    >
      <div className={styles.pageContent}>{props.children}</div>
    </Page>
  );
}
