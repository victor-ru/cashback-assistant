import React from "react";
import { Page, Toolbar } from "react-onsenui";

interface TabPageProps {
  children: React.ReactNode;
  title: string;
}

export function TabPage(props: TabPageProps) {
  return (
    <Page
      renderToolbar={() => (
        <Toolbar>
          <div className="center">{props.title}</div>
        </Toolbar>
      )}
    >
      <p style={{ padding: "0 15px" }}>
        This is the <strong>{props.title}</strong> page!
      </p>
    </Page>
  );
}
