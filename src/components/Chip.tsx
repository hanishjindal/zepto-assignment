'use client'
import React, { FC } from 'react'
import { RandomAvatar } from "react-random-avatars";

interface ChipProps {
    name: any;
    handleRemove: (id: number) => void;
    id: number;
    highlight: boolean;
}

const Chip: FC<ChipProps> = ({ name, handleRemove, id, highlight }) => {
    return (
        <div className={`bg-gray-300 text-gray-600 font-medium pr-2 w-fit rounded-full flex justify-center items-center gap-1 border cursor-default ${highlight ? 'bg-gray-500 text-gray-900' : ''}`}>
            <RandomAvatar name={name + name} size={35} mode='colors' />
            <span className='ml-1'>{name}</span>
            <span
                className='text-lg font-bold cursor-pointer'
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemove(id);
                }}
            >
                &#x2715;
            </span>
        </div>
    )
}

export default Chip