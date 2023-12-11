import React from 'react';
import Iframe from 'react-iframe';
function Chat() {
    return (
        <div>
            <h2>Review</h2>
            <Iframe
                url='https://www.google.com/'
                className='w-100 h-100'
            />
        </div>
    )
}
export default Chat;