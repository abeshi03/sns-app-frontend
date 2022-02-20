import React, { memo, VFC } from "react";

export const ErrorIcon: VFC = memo(() => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'>
      <path d='M25.6 4.4c-5.9-5.9-15.4-5.9-21.2 0s-5.9 15.4 0 21.2a14.9 14.9 0 0021.2 0 14.9 14.9 0 000-21.2zM24 24c-5 5-13 5-17.9 0S1.1 11 6 6s13-5 17.9 0c5 5 5 13 .1 18z' />
      <path d='M20 18.25l-3.3-3.3 3.3-3.3c.5-.5.5-1.2 0-1.6-.4-.5-1.2-.5-1.6-.1l-3.3 3.3-3.3-3.3c-.5-.5-1.2-.5-1.6 0-.5.5-.5 1.2 0 1.6l3.3 3.3-3.4 3.4c-.5.5-.5 1.2 0 1.6.5.5 1.2.5 1.6 0l3.3-3.3 3.3 3.3c.5.5 1.2.5 1.6 0 .6-.5.6-1.2.1-1.6z' />
    </svg>
  );
});