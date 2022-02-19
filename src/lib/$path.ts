/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  users: {
    _id: (id: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/users/[id]' as const, query: { id }, hash: url?.hash })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/users' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
