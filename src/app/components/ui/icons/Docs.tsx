import React from "react";

const Docs = ({ size }: { size: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M42.2519 15.166V44.416C42.2519 45.6131 41.2813 46.5827 40.0853 46.5827H11.9186C10.7215 46.5827 9.75195 45.6131 9.75195 44.416V7.58268C9.75195 6.38668 10.7215 5.41602 11.9186 5.41602H32.502L34.6686 12.9993L42.2519 15.166Z"
        fill="url(#paint0_linear_63_1277)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.332 19.501V22.7499H35.7509V19.501H17.332Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.334 26.001V29.2499H35.7528V26.001H17.334Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.332 32.501V35.7499H30.3331V32.501H17.332Z"
        fill="white"
      />
      <path
        d="M32.502 15.166L32.503 5.41602L42.252 15.1649L32.502 15.166Z"
        fill="url(#paint1_linear_63_1277)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_63_1277"
          x1="-1.04238"
          y1="3.19735"
          x2="32.0881"
          y2="36.3268"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#55ADFD" />
          <stop offset="1" stop-color="#438FFD" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_63_1277"
          x1="39.5675"
          y1="8.10052"
          x2="33.5853"
          y2="14.0827"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#427FDB" />
          <stop offset="1" stop-color="#0C52BB" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Docs;
