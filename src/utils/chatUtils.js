// // Returns true if the chat has unread messages for the current user
// export const hasUnreadMessages = (chat, userId) => {
//   const lastRead = chat?.readStatus?.[userId] || 0;
//   const lastMsgTime =
//     (chat?.lastMessageTimestamp?.seconds || 0) +
//     (chat?.lastMessageTimestamp?.nanoseconds || 0) / 1e9;
//   return lastMsgTime > lastRead;
// };

// // In chatUtils.js - Add sender check
// export const hasUnreadMessages = (chat, userId) => {
//   const lastRead = chat?.readStatus?.[userId] || 0;
//   const lastMsgTime = 
//     (chat?.lastMessageTimestamp?.seconds || 0) +
//     (chat?.lastMessageTimestamp?.nanoseconds || 0) / 1e9;
  
//   // Check if last message was from another user
//   const isOthersMessage = chat.lastMessageSender !== userId;
  
//   return lastMsgTime > lastRead && isOthersMessage;
// };

export const hasUnreadMessages = (chat, userId) => {
  const lastRead = chat?.readStatus?.[userId] || 0;
  const lastMsgTime =
    (chat?.lastMessageTimestamp?.seconds || 0) +
    (chat?.lastMessageTimestamp?.nanoseconds || 0) / 1e9;
  // Only show blue dot if last message is not from current user
  const lastSender = chat?.lastMessageSender;
  return lastMsgTime > lastRead && lastSender !== userId;
};


