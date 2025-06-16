import { hasUnreadMessages } from './chatUtils';

export function getUnreadChatCount(chats, userId) {
  return chats.reduce((count, chat) => {
    if (hasUnreadMessages(chat, userId)) {
      return count + 1;
    }
    return count;
  }, 0);
}