import { fetcher } from '@/utils/fetcher'

export function list(payload) {
  return fetcher.getJSON('/api/articles', payload)
}

export function show(payload) {
  return fetcher.getJSON(`/api/articles/${payload.id}`, payload)
}

export function remove(payload) {
  return fetcher.removeJSON(`/api/articles/${payload.id}`, payload)
}

export function create(payload) {
  return fetcher.postJSON('/api/articles', payload)
}

export function update(payload) {
  return fetcher.putJSON(`/api/articles/${payload.id}?_mid=${payload._mid}`, payload)
}
