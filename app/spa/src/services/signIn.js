import { fetcher } from '@/utils/fetcher'

export function signIn(payload) {
  return fetcher.postJSON('/api/signin', payload)
}
