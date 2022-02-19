/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  users: {
    _userId: (userId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/users/[userId]' as const, query: { userId }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/users' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
