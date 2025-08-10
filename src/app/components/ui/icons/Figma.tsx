import React from "react";

const Figma = ({size} : {size: number}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26 26C26 22.4102 28.9102 19.5 32.5 19.5C36.0898 19.5 39 22.4102 39 26C39 29.5898 36.0898 32.5 32.5 32.5C28.9102 32.5 26 29.5898 26 26Z"
        fill="#1ABCFE"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 39C13 35.4102 15.9101 32.5 19.5 32.5H26V39C26 42.5898 23.0898 45.5 19.5 45.5C15.9101 45.5 13 42.5898 13 39Z"
        fill="#0ACF83"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26 6.5V19.5H32.5C36.0898 19.5 39 16.5898 39 13C39 9.41015 36.0898 6.5 32.5 6.5H26Z"
        fill="#FF7262"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 13C13 16.5898 15.9101 19.5 19.5 19.5H26V6.5H19.5C15.9101 6.5 13 9.41015 13 13Z"
        fill="#F24E1E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13 26C13 29.5898 15.9101 32.5 19.5 32.5H26V19.5H19.5C15.9101 19.5 13 22.4102 13 26Z"
        fill="#A259FF"
      />
    </svg>
  );
};

export default Figma;
