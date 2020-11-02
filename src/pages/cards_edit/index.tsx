import React from "react";
import { useParams } from "react-router";

export function CardsEdit() {
  const { id } = useParams<{id: string}>();
  return <div>CardsEdit #{id}</div>;
}
