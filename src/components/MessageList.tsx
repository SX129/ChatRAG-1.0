import { cn } from '@/lib/utils';
import { Message } from 'ai/react'
import React from 'react'

type Props = {
    messages: Message[]
};

const MessageList = ({messages}: Props) => {
    if (!messages) return <></>
  return (
    <div className='flex flex-col gap-2 px-4'>
        {messages.map(message => {
            return(
                <div key={message.id} className={cn('flex', {
                    'justify-end': message.role === 'user'
                })}>

                </div>
            );
        })}
    </div>
  )
}

export default MessageList