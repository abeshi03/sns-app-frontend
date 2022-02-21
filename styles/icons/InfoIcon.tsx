import React, { memo, VFC } from "react";

export const InfoIcon: VFC = memo(() => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'>
      <path d='M15 0C6.7 0 0 6.7 0 15s6.7 15 15 15 15-6.7 15-15S23.3 0 15 0zm0 27.3a12.3 12.3 0 110-24.6 12.3 12.3 0 110 24.6z' />
      <path d='M15 6.4c-1 0-1.8.8-1.8 1.8S14 10 15 10s1.8-.8 1.8-1.8S16 6.4 15 6.4zM15 12.7c-.8 0-1.4.6-1.4 1.4v8.2c0 .8.6 1.3 1.4 1.3.7 0 1.3-.6 1.3-1.3v-8.2c.1-.8-.5-1.4-1.3-1.4z' />
    </svg>
  );
});
