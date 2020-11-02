import React from "react";
import { useParams } from "react-router";

export function CategoriesEdit() {
  const { id } = useParams<{ id: string }>();
  return <div>CategoriesEdit #{id}</div>;
}
