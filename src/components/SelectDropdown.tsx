import React, { FC, useEffect, useState } from 'react'
import { nameListType } from './Config'
import { RandomAvatar } from 'react-random-avatars'
import HighlightedText from './HighlightedText';

interface SelectProps {
    nameList: nameListType[];
    handleSelect: (id: number) => void;
    inputUser: string;
    modalRef: React.RefObject<HTMLInputElement>;
    dropdownRef: React.RefObject<HTMLInputElement>;
    userList: nameListType[];
}

const SelectDropdown: FC<SelectProps> = ({ nameList, handleSelect, inputUser, modalRef, userList, dropdownRef }) => {
    const [dropdownAllignment, setDropdownAllignment] = useState<'left' | 'right'>('right')
    useEffect(() => {
        if (dropdownRef.current && modalRef.current) {
            const dropdownPos = dropdownRef.current?.getBoundingClientRect();
            const ModalPos = modalRef.current?.getBoundingClientRect();
            const modalWidth = ModalPos.x + ModalPos.width;
            const dropdownDynamicWidth = dropdownPos.x + 400;
            console.log(dropdownDynamicWidth, modalWidth)
            if (dropdownDynamicWidth > modalWidth + 100) {
                setDropdownAllignment('left')
            } else {
                setDropdownAllignment('right')
            }
        }
    }, [inputUser, userList])

    return (
        <div
            className={`border-2 rounded-md flex flex-col max-h-[200px] min-w-[400px] w-fit overflow-auto absolute ${dropdownAllignment === 'left' ? 'right-0' : 'right-auto'} bg-white`}
        >
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