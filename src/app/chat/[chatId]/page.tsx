import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
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

    //SQL statement (chats is schema)
    const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

    //_chats is a list of chats
    if(!_chats){
        return redirect('/');
    }

    if(!_chats.find(chat => chat.id === parseInt(chatId))){
        return redirect('/');
    }
  return (
    <div className='flex max-h-screen overflow-scroll'>
        <div className='flex w-full max-h-screen overflow-scroll'>
            {/* chat history sidebar */}
            <div></div>
            {/* middle pdf viewer */}
            <div></div>
            {/* chat message component */}
            <div></div>
        </div>
    </div>
  )
}

export default ChatPage;