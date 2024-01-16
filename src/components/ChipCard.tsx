'use client'
import React, { FC, useState, useRef, useEffect, ReactEventHandler } from 'react'
import Chip from './Chip'
import { INPUT_INFO, NAME_LIST, nameListType } from './Config'
import SelectDropdown from './SelectDropdown'

interface ChipCardProps {
    inputFocus: boolean;
    setInputFocus: (val: boolean) => void
}

const ChipCard: FC<ChipCardProps> = ({ inputFocus, setInputFocus }) => {
    const [userSelected, setUserSelected] = useState<nameListType[]>([]);
    const [userList, setUserList] = useState<nameListType[]>(NAME_LIST);
    const [inputUser, setInputUser] = useState('');
    const [isBackspacePressed, setIsBackspacePressed] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const ModalRef = useRef<HTMLInputElement | null>(null);

    const handleSelect = (id: number) => {
        const tempUserSelectedList: nameListType[] = [...userSelected, userList[id]]
        setUserSelected(tempUserSelectedList);

        const remainingUsers = NAME_LIST.filter(user => !tempUserSelectedList.includes(user));
        setUserList(remainingUsers);
        setInputUser('');
        setIsBackspacePressed(false);
    }


    const handleRemove = (id: number) => {
        const updatedUserSelected = userSelected.filter((user, index) => index !== id);
        setUserSelected(updatedUserSelected);

        const updatedList = NAME_LIST.filter(user => !updatedUserSelected.includes(user));;
        setUserList(updatedList);
        setIsBackspacePressed(false);
    }

    useEffect(() => {
        if (inputRef.current && inputFocus) {
            inputRef.current.focus();
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setInputUser(inputValue);

        const remainingUsers = NAME_LIST.filter(user => !userSelected.includes(user));

        const filteredUsers = remainingUsers.filter(user => user.name.toLowerCase().includes(inputValue.toLowerCase()));
        setUserList(filteredUsers);
        setIsBackspacePressed(false);

        if (inputRef.current) {
            inputRef.current.style.width = `${(inputValue.length + 1) * 7.2}px`;
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && inputUser === '') {
            setIsBackspacePressed(prevState => !prevState);

            if (isBackspacePressed && userSelected.length > 0) {
                handleRemove(userSelected?.length - 1 ?? 0)
                setIsBackspacePressed(false);
            }
        }
        if (e.key === 'Escape') {
            setIsBackspacePressed(false);
            setInputUser('');
            const remainingUsers = NAME_LIST.filter(user => !userSelected.includes(user));
            setUserList(remainingUsers)
        }
    }

    return (
        <div className='border-2 rounded-md p-10 shadow-xl w-full h-auto bg-white'>
            <div
                className='w-full px-1 py-2 border-b-2 border-blue-500 flex items-center flex-wrap gap-2 h-auto cursor-text'
                onClick={(e) => {
                    e.stopPropagation()
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                    setInputFocus(true)
                }}
                ref={ModalRef}
            >
                {
                    userSelected?.map((user, index) => {
                        return (
                            <Chip
                                key={index}
                                name={user?.name}
                                handleRemove={handleRemove}
                                id={index}
                                highlight={(isBackspacePressed && index === userSelected.length - 1)}
                            />
                        )
                    })
                }
                <span className='w-fit relative'>
                    <input
                        ref={inputRef}
                        type='text'
                        className='text-1xl focus-visible:outline-none w-1'
                        value={inputUser}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />

                    {inputFocus ?
                        <SelectDropdown
                            nameList={userList}
                            handleSelect={handleSelect}
                            inputUser={inputUser}
                            modalRef={ModalRef}
                            userList={userList}
                            dropdownRef={inputRef}
                        />
                        :
                        null
                    }
                </span>
            </div>

            <span className='text-sm text-gray-400 py-2'>{INPUT_INFO}</span>
        </div>
    )
}

export default ChipCard