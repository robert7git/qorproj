import { fetcher } from '@/utils/fetcher'

export function signUp(payload) {
  return fetcher.postJSON('/api/signup', payload)
}
