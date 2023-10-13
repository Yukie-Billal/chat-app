export function checkAuth(userStore) {
  if (userStore.user.id === 0) {
    userStore.isRegistered = false
    return false
  }
  return true
}