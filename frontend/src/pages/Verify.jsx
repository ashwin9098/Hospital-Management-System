import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../Contact/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { backendUrl, token } = useContext(AppContext)
    const [status, setStatus] = useState('verifying')

    const razorpayVerificationId = searchParams.get('razorpay_payment_link_id')

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                if (!razorpayVerificationId) {
                    setStatus('failed')
                    toast.error('Invalid payment verification')
                    setTimeout(() => navigate('/'), 2000)
                    return
                }

                const { data } = await axios.post(
                    backendUrl + '/api/user/verify-appointment',
                    { razorpayVerificationId },
                    { headers: { token } }
                )

                if (data.success) {
                    setStatus('success')
                    toast.success(data.message)
                    setTimeout(() => navigate('/my-appointments'), 2000)
                } else {
                    setStatus('failed')
                    toast.error(data.message)
                    setTimeout(() => navigate('/'), 2000)
                }
            } catch (error) {
                setStatus('failed')
                toast.error(error.message)
                setTimeout(() => navigate('/'), 2000)
            }
        }

        verifyPayment()
    }, [razorpayVerificationId, backendUrl, token, navigate])

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className='text-center'>
                {status === 'verifying' && (
                    <>
                        <div className='w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
                        <p className='text-xl text-gray-700'>Verifying your payment...</p>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                            </svg>
                        </div>
                        <p className='text-xl text-gray-700'>Payment verified successfully!</p>
                        <p className='text-gray-500 mt-2'>Redirecting to your appointments...</p>
                    </>
                )}
                {status === 'failed' && (
                    <>
                        <div className='w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </div>
                        <p className='text-xl text-gray-700'>Payment verification failed!</p>
                        <p className='text-gray-500 mt-2'>Redirecting to home...</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Verify
