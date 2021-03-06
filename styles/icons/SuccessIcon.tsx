import React, { memo, VFC } from "react";

export const SuccessIcon: VFC = memo(() => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'>
      <path d='M29.1 4c-.4-.3-1.2-.3-1.6 0L14 17.8l-4.9-5.4c-.4-.5-1-.5-1.6 0-.4.4-.5 1 0 1.6L13 20c.2.2.5.4.8.4.3 0 .6-.1.8-.3L29.1 5.7c.5-.4.5-1.1 0-1.6z' />
      <path d='M28.9 13.9c-.6 0-1.1.5-1.1 1.1 0 7-5.7 12.7-12.7 12.7S2.3 22 2.3 15 8 2.3 15 2.3c.6 0 1.1-.5 1.2-1.1S15.7 0 15.1 0H15a15 15 0 1015 15c0-.6-.5-1.1-1.1-1.1z' />
    </svg>
  );
});
