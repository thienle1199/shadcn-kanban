
"use client";

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { ChevronDown, ChevronUp } from 'lucide-react';


type Props = {
    boardName?: string;
    children?: React.ReactNode;
}

function BoardListDialog({boardName, children}: Props) {
    const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className='mobile:hidden'>
            <h2 className="text-xl font-bold flex gap-1 items-center">{boardName}
                <span className='text-primary'>
                {
                    open ?  <ChevronUp size={18} /> : <ChevronDown size={18} />
                }
                </span>
            </h2>
        </DialogTrigger>
        <DialogHeader>
            <DialogTitle>
            </DialogTitle>
          </DialogHeader>
      <DialogContent className="sm:max-w-[425px] p-8 bg-background">
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default BoardListDialog