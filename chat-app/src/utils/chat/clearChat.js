export function clearChat(e, chatStore) {
  e.preventDefault()
  chatStore.chats = []
}