import React from 'react';
import { ProfileTitle } from '../Store/StyledCom';
import { Progress } from 'rsuite';

const traffic = [
    {
        id: 0,
        name: 'Direct',
        amount: 1432
    },
    {
        id: 1,
        name: 'Referral',
        amount: 1432
    },
    {
        id: 2,
        name: 'Social Media',
        amount: 1432
    },
    {
        id: 3,
        name: 'Facebook',
        amount: 1432
    },
    {
        id: 4,
        name: 'Instagram',
        amount: 1432
    },
]
function Traffic() {
    return (
        <div className='bg-white h-100'>
            <ProfileTitle className='border-bottom'><label className='m-2'>Traffic Source</label></ProfileTitle>
            {
                traffic.map((item) => (
                    <div key={item.id}>
                        <div className='d-flex justify-content-between px-3 pt-2'>
                            <label>{item.name}</label><label>{item.amount}</label>
                        </div>
                        <Progress.Line percent={Math.random()*100} strokeColor="#355E3B" showInfo={false} />
                    </div>
                ))
            }
        </div>
    );
}

export default Traffic;