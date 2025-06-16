import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {addDoc, collection, doc, getDoc, getFirestore, onSnapshot, serverTimestamp, setDoc, updateDoc} from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { getDocs } from "firebase/firestore"; 


     
const firebaseConfig = {
  apiKey: "AIzaSyAqmRs_7XHfdlcVwSwauWl7ASu6nUe37zA",
  authDomain: "convo-chat-app-ac87a.firebaseapp.com",
  projectId: "convo-chat-app-ac87a",
  storageBucket: "convo-chat-app-ac87a.firebasestorage.app",
  messagingSenderId: "662786077812",
  appId: "1:662786077812:web:f7f122fa162f321544cd21"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const dbRealtime = getDatabase(app);


export const uploadToCloudinary = async (file) => {
    if (!file) {
        console.error("No file provided for upload");
        throw new Error("No file selected for upload.");
    }

    if (!(file instanceof File)) {
        console.error("Invalid file object provided:", file);
        throw new Error("Invalid file object.");
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'profile_pic');

    try {             // Send request to Cloudinary
        const response = await fetch('https://api.cloudinary.com/v1_1/dihjlhmlx/image/upload', {
            method: 'POST',
            body: data,
        });

        const json = await response.json();
        if (!response.ok) {
            console.error("Cloudinary Upload Error:", json);
            throw new Error(json.error?.message || 'Upload failed');
        }
        return json.secure_url;

    } catch (error) {
        console.error("Failed to upload image:", error);
        throw error;
    }
};

export const updateProfileImage = async (userId, imageUrl) => {
  const userRef = doc(db, 'user', userId);
  await updateDoc(userRef, { image: imageUrl });

  const chatsRef = collection(db, 'chats');
  const chatSnapshot = await getDocs(chatsRef);

  chatSnapshot.forEach(async (chatDoc) => {
    const chatData = chatDoc.data();
    const updatedUsers = chatData.users.map((user) =>
      user.uid === userId ? { ...user, image: imageUrl } : user
    );

    await updateDoc(doc(db, 'chats', chatDoc.id), { users: updatedUsers });
  });
};


export const listenForChats = (setChats) =>{
  const chatsRef = collection(db, "chats");
  const unsubscribe = onSnapshot(chatsRef, (snapshot)=>{
    const chatList = snapshot.docs.map((doc)=>({
      id: doc.id,
      ...doc.data(),
    }));
    const filteredChats = chatList.filter((chat)=> chat?.users?.some((user)=> user.email === auth.currentUser.email));
    setChats(filteredChats);
  });
  return unsubscribe;
}

export const sendMessage = async(messageText, chatId, user1, user2)=>{
  const chatRef = doc(db, "chats", chatId);

  const user1Doc = await getDoc(doc(db, "user",user1));
  const user2Doc = await getDoc(doc(db, "user", user2));
  
  console.log(user1Doc);
  console.log(user2Doc);

  const user1Data = user1Doc.data();
  const user2Data = user2Doc.data();

  const chatDoc = await getDoc(chatRef);

  if(!chatDoc.exists()){
    await setDoc(chatRef,{
      users:[user1Data, user2Data],
      lastMessage: messageText,
      lastMessageSender: auth.currentUser.uid,
      lastMessageTimestamp:serverTimestamp(),
    });
  }
  else{
    await updateDoc(chatRef,{
      lastMessage:messageText,
      lastMessageSender: auth.currentUser.uid,
      lastMessageTimestamp:serverTimestamp(),
    });
  }
  const messageRef = collection(db, "chats", chatId, "messages");
  await addDoc(messageRef,{
    text: messageText,
    sender: auth?.currentUser?.email,
    timestamp:serverTimestamp(),
  })

}

export const listenForMessage = (chatId, setMessages) =>{
  const chatRef = collection(db, "chats", chatId, "messages");
  onSnapshot(chatRef, (snapshot)=>{
    const messages = snapshot.docs.map((doc)=> doc.data());
    setMessages(messages);
  })
}

export const setReadStatus = async (chatId, userId, timestamp) => {
  const chatRef = doc(db, "chats", chatId);
  await updateDoc(chatRef, {
    [`readStatus.${userId}`]: timestamp || Date.now() / 1000,
  });
};

export const getReadStatus = async (chatId, userId) => {
  const chatRef = doc(db, "chats", chatId);
  const chatSnap = await getDoc(chatRef);
  if (!chatSnap.exists()) return 0;
  const data = chatSnap.data();
  return data?.readStatus?.[userId] || 0;
};

export const updateLastSeen = async (userId) => {
  const userRef = doc(db, "user", userId);
  await updateDoc(userRef, {
    lastSeen: serverTimestamp(),
  });
};

export const listenForUser = (userId, callback) => {
  const userRef = doc(db, "user", userId);
  return onSnapshot(userRef, (doc) => {
    callback(doc.data());
  });
};


export {auth, db};