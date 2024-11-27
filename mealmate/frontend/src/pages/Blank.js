import React from 'react'

import PageTitle from '../uicomponents/Typography/PageTitle'
import SectionTitle from '../uicomponents/Typography/SectionTitle'


function Blank() {
  return (
    <>
      <PageTitle>How MealMate Works</PageTitle>
      <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
            1
          </div>
          <SectionTitle>Create an Account</SectionTitle>
        
          <p className="text-gray-600 mt-2">
            Sign up as a user to post food requests or as a chef to offer your cooking services. Don't forget to complete your profile for better matches.
          </p>
        </div>
        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
            2
          </div>
          <SectionTitle>Post or Find Requests</SectionTitle>
          <p className="text-gray-600 mt-2">
            Users can post food requests specifying their preferences, date, and location. Chefs can browse nearby requests within a 3 km radius.
          </p>
        </div>
        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
            3
          </div>
          <SectionTitle>Appeals & Responses</SectionTitle>
          <p className="text-gray-600 mt-2">
            Chefs can send appeals for food requests. Users review chef profiles, including certifications, and select the best fit.
          </p>
        </div>
        {/* Step 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
            4
          </div>
          <SectionTitle>Booking Confirmation</SectionTitle>
          <p className="text-gray-600 mt-2">
            Once a user accepts a chef's appeal, a booking is created. Both parties receive details of the confirmed request.
          </p>
        </div>
        {/* Step 5 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
            5
          </div>
          <SectionTitle>Meet & Enjoy</SectionTitle>
          <p className="text-gray-600 mt-2">
            Chefs prepare the meal and deliver it to the user’s specified location. Enjoy home-cooked goodness!
          </p>
        </div>
        {/* Step 6 */}
        <div className="flex flex-col items-center text-center">
          <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
            6
          </div>
          <SectionTitle>Feedback & Ratings</SectionTitle>
          <p className="text-gray-600 mt-2">
            After the meal, users can rate and review the chef, helping others make informed decisions in the future.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Blank
