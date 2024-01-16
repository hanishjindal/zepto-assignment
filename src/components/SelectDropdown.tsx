import React, { FC } from 'react'
import { nameListType } from './Config'
import { RandomAvatar } from 'react-random-avatars'
import HighlightedText from './HighlightedText';

interface SelectProps {
    nameList: nameListType[];
    handleSelect: (id: number) => void;
    inputUser: string;
}

const SelectDropdown: FC<SelectProps> = ({ nameList, handleSelect, inputUser }) => {
    return (
        <div className='border-2 rounded-md flex flex-col max-h-[200px] min-w-[400px] w-fit overflow-auto absolute bg-white'>
            {nameList.length > 0 ?
                nameList?.map((name, idx) => {
                    return (
                        <div
                            key={idx}
                            className='flex items-center gap-2 px-4 py-2 hover:bg-gray-200 cursor-default'
                            onClick={() => handleSelect(idx)}
                        >
                            <span className='w-fit h-fit border rounded-full'>
                                <RandomAvatar name={name?.name + name?.name} size={35} mode='colors' />
                            </span>
                            <span className='ml-1 text-gray-800'>
                                <HighlightedText
                                    text={name?.name}
                                    highlight={inputUser}
                                />
                            </span>
                            <span className='ml-1 text-gray-300'>{name?.email}</span>
                        </div>
                    )
                })
                :
                <span className='text-center w-full p-2'>No more left</span>
            }
        </div>
    )
}

export default SelectDropdown