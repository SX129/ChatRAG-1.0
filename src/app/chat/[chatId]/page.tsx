import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    params:{
        chatId: string,
    }
};

const ChatPage = async ({params: {chatId}}: Props) => {
    const {userId} = await auth();
    if (!userId){
        return redirect('/sign-in');
    }

    
  return (
    <div>{chatId}</div>
  )
}

export default ChatPage;