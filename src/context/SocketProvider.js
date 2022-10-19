import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ roomId, children }) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io('https://obscure-chamber-13153.herokuapp.com/', {
            query: {
                roomId
            }
        })

        setSocket(newSocket);

        return () => newSocket.close();
    }, [roomId]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}