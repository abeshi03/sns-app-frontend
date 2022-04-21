/* eslint-disable */
// prettier-ignore
export const pagesPath = {
  csv_demo: {
    $url: (url?: { hash?: string }) => ({ pathname: '/csv-demo' as const, hash: url?.hash })
  },
  posts: {
    _postId: (postId: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/posts/[postId]' as const, query: { postId }, hash: url?.hash })
    })
  },
  sign_in: {
    $url: (url?: { hash?: string }) => ({ pathname: '/sign_in' as const, hash: url?.hash })
  },
  users: {
    _userId: (userId: string | number) => ({
      edit: {
        $url: (url?: { hash?: string }) => ({ pathname: '/users/[userId]/edit' as const, query: { userId }, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/users/[userId]' as const, query: { userId }, hash: url?.hash })
    }),
    add: {
      $url: (url?: { hash?: string }) => ({ pathname: '/users/add' as const, hash: url?.hash })
    },
    $url: (url?: { hash?: string }) => ({ pathname: '/users' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath
