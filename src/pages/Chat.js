import React, {useState, useEffect} from 'react'
import Header from '../components/Layout/Header'
import ChatSidebar from '../components/ChatSidebar'
import MessageContainer from '../components/MessageContainer';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setReceiverId } from '../redux/chatSlice';
import { useSocketContext } from '../context/SocketContext';
import {addNewMessage} from '../redux/chatSlice';

const Chat = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const receiverId = location.state?.receiverId;
    if(receiverId){
        dispatch(setReceiverId(receiverId));
    }
    const {socket} = useSocketContext();
    const {messages} = useSelector((state)=>(state.chat));
    useEffect(() => {
      socket?.on("newMessage", (newMessage) => {
        dispatch(addNewMessage(newMessage));
      });
      return ()=> socket?.off("newMessage")
    }, [socket, messages]);
    return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex mb-auto h-100">
        <ChatSidebar />
        <MessageContainer/>
        </div>
    </div>
    );
}

export default Chat
