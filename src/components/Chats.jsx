import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ChatEngine } from 'react-chat-engine';
import { IoIosLogOut } from 'react-icons/io';
import axios from 'axios';
import Loader from './Loader'

const Chats = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);


    const handleSignout = async () => {
        await auth.signOut();
        history.push('/')
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = response.blob();
        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })
    }

    useEffect(() => {
        if (!currentUser) {
            history.push('/')
            return;
        }

        // Here below we send a get request for particular uid of logged in user ,
        // if that user for given uid exists in the chatengine then chat related
        // to it will fetched out under the response

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": currentUser.email,
                "user-secret": currentUser.uid
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();

                // We want username to be unique thats why we r using email instead of displayName
                // as email are uniques.

                formdata.append('username', currentUser.email);
                formdata.append('email', currentUser.email);
                formdata.append('secret', currentUser.uid);

                getFile(currentUser.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name)
                    })

                axios.post("https://api.chatengine.io/users/",
                    formdata,
                    { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } }
                )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
            })

    }, [currentUser, history])

    if (!currentUser || loading) return <Loader />

    return (
        <div className="chats-page">
            <div className="chats-header">
                <div className="logo" >
                    <img src="https://image.flaticon.com/icons/png/512/1246/1246301.png" alt="HeloChat Messenger" />
                    <span>HeloChat</span>
                </div>
                <div className="sign-out" onClick={handleSignout}>
                    <IoIosLogOut title="Logout" />
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 80px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={currentUser.email}
                userSecret={currentUser.uid}
            />

        </div>
    )
}

export default Chats;