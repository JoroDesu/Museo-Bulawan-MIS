import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AdminNav from '../../components/navbar/AdminNav'
import CustomDatePicker from '../../components/function/CustomDatePicker'
import { connectWebSocket, closeWebSocket } from '../../utils/websocket'


const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [appointments, setAppointments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [approveVisit, setApproveVisit] = useState('yes')  // For the radio button in modal

  const token = localStorage.getItem('token')

  // Fetch appointments from server
  const fetchAppointments = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/article", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // added bearer token here
        },
        withCredentials: true,
      });
      // Handle success
    } catch (error) {
      console.error("Error posting article:", error);
    } 
    

  useEffect(() => {
    fetchAppointments()

    const handleDataChange = () => {
      console.log('WebSocket: Data changed, refreshing appointments...')
      fetchAppointments()
    }

    const handleRefresh = () => {
      console.log('WebSocket: Refresh command received, refreshing appointments...')
      fetchAppointments()
    }

    connectWebSocket(handleDataChange, handleRefresh) // Listen for real-time changes

    return () => {
      closeWebSocket()
    }
  }, [])

  // When a row is clicked, open the modal with that row's data
  const handleRowClick = (appt) => {
    if (!appt || !appt.Visitor) return
    setModalData({
      dateSent: appt.creation_date || 'N/A',
      fromFirstName: appt.Visitor.first_name || 'N/A',
      fromLastName: appt.Visitor.last_name || 'N/A',
      email: appt.Visitor.email || 'N/A',
      phone: appt.Visitor.phone || 'N/A',
      purpose: appt.purpose_of_visit || 'N/A',
      populationCount: appt.population_count || 0,
      preferredDate: appt.preferred_date || 'N/A',
      preferredTime: appt.preferred_time || 'N/A',
      notes: appt.additional_notes || 'N/A',
      organization: appt.Visitor.organization || 'N/A',
      // Break address into separate fields for a more structured layout
      street: appt.Visitor.street || '',
      barangay: appt.Visitor.barangay || '',
      city_municipality: appt.Visitor.city_municipality || '',
      province: appt.Visitor.province || ''
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setModalData(null)
  }

  const handleSend = () => {
    // Example action when you click “Send” (could do an actual PUT/POST to your server)
    alert('Message sent to ' + (modalData?.email || 'visitor'))
    setShowModal(false)
  }

  // console.log(appointments);

  return (
    <>
      <div className='w-screen min-h-[79.8rem] h-screen bg-[#F0F0F0] select-none flex pt-[7rem]'>
        {/* Left Nav */}
        <div className='bg-[#1C1B19] w-auto min-h-full h-full min-w-[6rem] sm:min-w-auto'>
          <AdminNav />
        </div>

        {/* Main Content */}
        <div className='w-full h-full flex flex-col gap-y-10 px-7 pb-7 pt-[4rem] overflow-scroll'>
          <span className='text-5xl font-semibold'>Appointments</span>
          <div className='w-full h-full flex flex-col xl:flex-row gap-y-5 xl:gap-y-0 xl:gap-x-5'>

            {/* Left panel (stats, info, etc.) */}
            <div className='min-w-[34rem] h-full flex flex-col gap-y-7'>
              {/* Info bar */}
              <div className='w-full max-w-[35rem] text-gray-500 min-h-[5rem] flex py-2 gap-x-2'>
                <button className='px-4 h-full border-1 border-gray-500 rounded-lg cursor-pointer'>
                  <span className='text-2xl font-semibold'>Forms</span>
                </button>
                <button className='px-4 h-full border-1 border-gray-500 rounded-lg cursor-pointer'>
                  <span className='text-2xl font-semibold'>Attendance</span>
                </button>
                <button className='px-4 h-full border-1 border-gray-500 rounded-lg cursor-pointer'>
                  <span className='text-2xl font-semibold'>Visitor Records</span>
                </button>
              </div>

              <div className='w-full h-full flex flex-col gap-y-[5rem]'>
                <div className='bg-[#161616] px-4 h-[5rem] flex justify-between items-center rounded-sm'>
                  <span className='text-2xl text-white font-semibold'>Total Appointments</span>
                  <div className='w-[6rem] h-[3rem] bg-[#D4DBFF] flex items-center justify-center rounded-md'>
                    <span className='text-2xl text-black font-semibold'>
                      {appointments.length}
                    </span>
                  </div>
                </div>

                {/* Example placeholders for stats */}
                <div className='w-full h-auto flex flex-col gap-y-7'>
                  <span className='text-2xl font-semibold text-[#727272]'>January 8, 2025</span>
                  <div className='w-full h-fit flex justify-between items-center'>
                    <span className='text-2xl font-semibold '>Approved</span>
                    <div className='w-[5rem] h-[2rem] flex items-center bg-[#D4DBFF] rounded-md justify-center'>
                      <span className='text-2xl font-semibold'>580</span>
                    </div>
                  </div>
                  <div className='w-full h-fit flex justify-between items-center'>
                    <span className='text-2xl font-semibold '>Reflected</span>
                    <div className='w-[5rem] h-[2rem] flex items-center bg-[#D4DBFF] rounded-md justify-center'>
                      <span className='text-2xl font-semibold'>13</span>
                    </div>
                  </div>
                  <div className='w-full h-fit flex justify-between items-center'>
                    <span className='text-2xl font-semibold '>Expected Visitors</span>
                    <div className='w-[5rem] h-[2rem] flex items-center bg-[#D4DBFF] rounded-md justify-center'>
                      <span className='text-2xl font-semibold'>1603</span>
                    </div>
                  </div>
                  <div className='w-full h-fit flex justify-between items-center'>
                    <span className='text-2xl font-semibold '>Present</span>
                    <div className='w-[5rem] h-[2rem] flex items-center bg-[#D4DBFF] rounded-md justify-center'>
                      <span className='text-2xl font-semibold'>1523</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section with table */}
            <div className='w-full h-full flex flex-col gap-y-7 overflow-x-scroll overflow-y-scroll'>
              {/* Controls above table */}
              <div className='min-w-[94rem] min-h-[5rem] py-2 flex items-center gap-x-2'>
                <div className='flex-shrink-0'>
                  <CustomDatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    popperPlacement="bottom-start"
                    popperClassName="z-50"
                    customInput={
                      <button className='px-3 h-16 rounded-lg border-1 border-gray-500 cursor-pointer'>
                        <i className="text-gray-500 fa-regular fa-calendar text-4xl"></i>
                      </button>
                    }
                  />
                </div>
                <div className="relative h-full min-w-[20rem]">
                  <i className="text-2xl fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
                  <input
                    type="text"
                    placeholder="Search History"
                    className="h-full pl-10 pr-3 py-2 border-1 border-gray-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative h-full min-w-48">
                  <input
                    type="text"
                    placeholder="Filter..."
                    className="pl-4 h-full text-2xl pr-8 py-2 border-1 border-gray-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <i className="cursor-pointer text-2xl fas fa-plus absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                </div>
                <div className="relative h-full min-w-48">
                  <select className="appearance-none border-1 border-gray-500 h-full text-2xl rounded-lg text-gray-500 w-full py-2 pl-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Actions</option>
                    <option>Action 1</option>
                    <option>Action 2</option>
                  </select>
                  <i className="text-2xl fas fa-caret-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"></i>
                </div>
              </div>

              {/* Table Header */}
              <div className='min-w-[94rem] w-full font-semibold h-fit grid grid-cols-6 justify-between'>
                <div className='text-[#727272] text-2xl border-l-1 px-3 py-2'>
                  Date
                </div>
                <div className='text-[#727272] text-2xl border-l-1 px-3 py-2'>
                  Visitor Name
                </div>
                <div className='text-[#727272] text-2xl border-l-1 px-3 py-2'>
                  Preferred Time
                </div>
                <div className='text-[#727272] text-2xl border-l-1 px-3 py-2'>
                  Status
                </div>
                <div className='text-[#727272] text-2xl border-l-1 px-3 py-2'>
                  Visitor Count
                </div>
                <div className='text-[#727272] flex items-center text-2xl border-l-1 pl-3'>
                  Updated
                </div>
              </div>

              {/* Table Data */}
              <div className='w-full min-w-[94rem] h-auto flex flex-col border-t-1 border-t-gray-400'>
                {appointments.map((appt) => (
                  <div
                    key={appt.appointment_id}
                    className='min-w-[94rem] text-xl h-fit font-semibold grid grid-cols-6 cursor-pointer hover:bg-gray-300'
                    onClick={() => handleRowClick(appt)}
                  >
                    <div className='px-4 pt-1 pb-3 border-b-1 border-gray-400'>
                      {appt.preferred_date}
                    </div>
                    <div className='px-4 pt-1 pb-3 border-b-1 border-gray-400'>
                      {appt.Visitor?.first_name} {appt.Visitor?.last_name}
                    </div>
                    <div className='px-4 pt-1 pb-3 border-b-1 border-gray-400'>
                      {appt.preferred_time}
                    </div>
                    <div className='px-4 py-4 border-b-1 border-gray-400'>
                      <span className='text-white bg-[#4CAF50] rounded-md px-4 py-1'>
                        Confirmed
                      </span>
                    </div>
                    <div className='px-4 py-4 border-b-1 border-gray-400'>
                      {appt.population_count}
                    </div>
                    <div className='px-4 pt-1 pb-3 border-b-1 border-gray-400 flex items-center'>
                      {appt.creation_date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && modalData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-gray-100 rounded-md shadow-lg pt-15 p-6 w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 text-lg font-bold cursor-pointer"
              onClick={handleCloseModal}
            >
              X
            </button>

            {/* Date Sent */}
            <div className="text-right text-sm text-blue-500 mb-4">
              {modalData.dateSent}
            </div>

            {/* Information Section */}
            <div className="border border-gray-300 rounded-md p-4 bg-white">
              <div className="flex mb-4">
                <div className="font-bold w-[50px] text-gray-700">From:</div>
                <div className="flex flex-1 flex-wrap justify-start gap-x-5">
                  <div className="text-center">
                    <span className="text-blue-500">
                      {modalData.fromFirstName}
                    </span>
                    <div className="text-xs text-gray-500">First Name</div>
                  </div>
                  <div className="text-center">
                    <span className="text-blue-500">
                      {modalData.fromLastName}
                    </span>
                    <div className="text-xs text-gray-500">Last Name</div>
                  </div>
                </div>
              </div>

              <p className="mb-2">
                <span className="font-semibold">Email:</span>{' '}
                <span className="text-blue-500">{modalData.email}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Phone Number:</span>{' '}
                <span className="text-blue-500">{modalData.phone}</span>
              </p>

              <div className="flex mb-4">
                <div className="font-semibold w-[50px] text-gray-700">Address:</div>
                <div className="flex flex-1 flex-wrap justify-start gap-x-5">
                  <div className="text-center">
                    <span className="text-blue-500">{modalData.street}</span>
                    <div className="text-xs text-gray-500">Street</div>
                  </div>
                  <div className="text-center">
                    <span className="text-blue-500">{modalData.barangay}</span>
                    <div className="text-xs text-gray-500">Barangay</div>
                  </div>
                  <div className="text-center">
                    <span className="text-blue-500">{modalData.city_municipality}</span>
                    <div className="text-xs text-gray-500">City/Municipality</div>
                  </div>
                  <div className="text-center">
                    <span className="text-blue-500">{modalData.province}</span>
                    <div className="text-xs text-gray-500">Province</div>
                  </div>
                </div>
              </div>



              <p className="mb-2">
                <span className="font-semibold">Purpose of Visit:</span>{' '}
                <span className="text-blue-500">{modalData.purpose}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Organization:</span>{' '}
                <span className="text-blue-500">{modalData.organization}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Population Count:</span>{' '}
                <span className="text-blue-500">{modalData.populationCount}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Preferred Date:</span>{' '}
                <span className="text-blue-500">{modalData.preferredDate}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Preferred Time:</span>{' '}
                <span className="text-blue-500">{modalData.preferredTime}</span>
              </p>
              <p className="mb-2">
                <span className="font-semibold">Notes:</span>{' '}
                <span className="text-blue-500">{modalData.notes}</span>
              </p>
            </div>

            <hr className="my-4" />

            {/* Approve/Respond Section */}
            <h3 className="text-lg font-bold mb-2">Respond</h3>
            <div className="mb-4">
              <span className="font-semibold mr-2">Approve Visit?</span>
              <label
                className={`border px-4 py-1 mr-2 rounded inline-flex items-center cursor-pointer ${approveVisit === 'yes' ? 'bg-green-100 border-green-400' : 'hover:bg-gray-200'
                  }`}
              >
                <input
                  type="radio"
                  name="approveVisit"
                  value="yes"
                  className="hidden"
                  checked={approveVisit === 'yes'}
                  onChange={() => setApproveVisit('yes')}
                />
                <span>Yes</span>
              </label>
              <label
                className={`border px-4 py-1 rounded inline-flex items-center cursor-pointer ${approveVisit === 'no' ? 'bg-red-100 border-red-400' : 'hover:bg-gray-200'
                  }`}
              >
                <input
                  type="radio"
                  name="approveVisit"
                  value="no"
                  className="hidden"
                  checked={approveVisit === 'no'}
                  onChange={() => setApproveVisit('no')}
                />
                <span>No</span>
              </label>
            </div>

            <label className="block mb-2 font-semibold">Leave a message</label>
            <textarea
              className="w-full h-24 p-2 border border-gray-400 rounded"
              defaultValue="The only available date is December 12, 2024"
            />
            <p className="text-sm text-gray-500 mt-1">
              This will automatically send to {modalData.email}
            </p>

            <div className="text-right mt-4">
              <button
                className="bg-[#9C7744] text-white px-5 py-2 rounded hover:opacity-90"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
}
export default Appointment
