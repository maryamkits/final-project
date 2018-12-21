import Template from "../router/Template";
import React from "react";

export const Phones = props => {
  return (
    <div className="items__container">
      <h1 className="category__header phones__header">phones</h1>
      <Template className="phones" header="phones" />;
    </div>
  );
};
