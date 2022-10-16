import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ roomId, children }) {
    const [socket, setSocket] = useState();

    useEffect(() => {
        const newSocket = io('http://localhost:5000/', {
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