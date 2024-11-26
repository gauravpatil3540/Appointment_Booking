import React, { useEffect, useState } from 'react';

const timeSlots = [
    { id: 1, time: '9 AM - 10 AM', booked: false },
    { id: 2, time: '10 AM - 11 AM', booked: false },
    { id: 3, time: '11 AM - 12 PM', booked: false },
    { id: 4, time: '12 PM - 1 PM', booked: false },
    { id: 5, time: '1 PM - 2 PM', booked: false },
    { id: 6, time: '2 PM - 3 PM', booked: false },
    { id: 7, time: '3 PM - 4 PM', booked: false },
    { id: 8, time: '4 PM - 5 PM', booked: false },
];

const SlotBooking = ({getSlot}) => {
    const [slots, setSlots] = useState(timeSlots);
    const [bookedSlot, setBookedSlot] = useState(null);

    const handleBooking = (id) => { 
        // If the user clicks on a new slot, mark it as booked
        const updatedSlots = slots.map((slot) =>
            slot.id === id ? { ...slot, booked: true } : { ...slot, booked: false }
        );

        setSlots(updatedSlots);
        setBookedSlot(updatedSlots[id-1]);
    }; 

    useEffect(() =>{
        getSlot(bookedSlot?.time);
    },[bookedSlot])

    return (
        <div className="p-4 bg-white">  
            <div className="grid grid-cols-4 gap-4">
                {slots.map((slot) => (
                    <div
                        key={slot.id}
                        className={`flex justify-between items-center w-[150px] p-4 border rounded-lg cursor-pointer transition-colors ${
                            slot.booked ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => handleBooking(slot.id)}
                    >
                        <span>{slot.time}</span> 
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlotBooking;
