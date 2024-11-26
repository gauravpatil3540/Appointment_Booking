import Calendar from "./components/Calendar";
import SlotBooking from './components/SlotBooking';
import Form from "./components/Form";
import { useState } from "react";
import axios from "axios"; 
function App() {
  const [bookingData,setBookingData] = useState({
    fee : null ,
    firstName : null,
    lastName : null,
    email : null,
    mobile : null,
    slot : null,
    date : null
  });  

  const getDate = (selectedDate) =>{
    setBookingData({...bookingData, date: selectedDate});
  }
  const getSlot = (selectedSlot) =>{
    setBookingData({...bookingData, slot: selectedSlot});
  }
  const getFormData = (data) =>{
    setBookingData({...bookingData, firstName: data.firstName, lastName:data.lastName, email : data.email, mobile: data.mobile, fee: data.fee});
  } 

  const handleBooking = async () =>{   
    if(bookingData.date == null){
      alert(" please select date ")
      return
    }
    if(bookingData.slot == null){
      alert(" please select slot ")
      return
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/create-order`, {
        amount: bookingData.fee, 
        currency: 'INR', 
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
        amount: response.data.amount,
        currency: response.data.currency,
        name: 'Appointment Booking',
        description: 'Test Transaction',
        order_id: response.data.id, 
        handler: async function (response) {  
            await axios.post(`${process.env.REACT_APP_API_URL}/payment-verification`, {response,bookingData})
            .then((res) =>{
                // console.log("payment verification res : ", res.data)
                if(res.data.verified){
                    alert("Appointment Booked Successfully")
                }
                else{
                    alert("Error in Appointment Booking")
                }
            })
            .catch((error) =>{
                console.log("Error while payment verification");
            })
        }, 
        prefill: {
          name: `${bookingData.firstName} ${bookingData.lastName}`,
          email: bookingData.email,
          contact: bookingData.mobile,
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
  }
  return (
    <div className="bg-white w-screen h-screen flex items-center flex-col">
      <h1 className="font-bold text-[24px] mt-3">Appointment Booking</h1>
      <div className="flex justify-start flex-row w-full h-full">
        <div className="  flex items-center flex-col">
          <div className="mt-8 ml-5">
            <Calendar getDate={getDate}/>
          </div>
          <div className="mt-8 ml-5 mr-2 w-[700px]">
            <SlotBooking getSlot={getSlot}/>
          </div>
        </div>
        <div className="  w-full h-full">
          <Form getFormData={getFormData} handleBooking={handleBooking}/>
        </div>
      </div>
    </div> 
  );
}
export default App;
