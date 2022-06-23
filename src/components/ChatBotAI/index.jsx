import './style.scss';
import React, { useEffect } from 'react';
import {
	Widget,
	addResponseMessage,
	addLinkSnippet,
	addUserMessage,
	setQuickButtons,
} from 'react-chat-widget';
import axios from 'axios';

import 'react-chat-widget/lib/styles.css';

const ChatBotAI = () => {
	useEffect(() => {
		addResponseMessage('Welcome to this awesome chat!');
	}, []);

	const handleNewUserMessage = async (newMessage) => {
		try {
			console.log(`New message incoming! ${newMessage}`);
			// Now send the message throught the backend API
			const res = await axios.get(`http://127.0.0.1:5000/get?msg=${newMessage}`);
			if (!!res && res.data) {
				addResponseMessage(res.data.response);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='chat-bot-ai'>
			<Widget
				handleNewUserMessage={handleNewUserMessage}
				title='DTH HOTEL'
				subtitle='Welcome to dthotel'
			/>
		</div>
	);
};

export default ChatBotAI;
