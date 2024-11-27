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
              Sign up as a user to post food requests or as a chef to offer your cooking services. Complete your profile and upload your food handling certificate for better matches.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
              2
            </div>
            <SectionTitle>Submit a Food Request</SectionTitle>
            <p className="text-gray-600 mt-2">
              Users can submit food requests specifying the dish, ingredients, date, location, and the amount they are willing to pay for assistance.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
              3
            </div>
            <SectionTitle>Browse & Appeal Requests</SectionTitle>
            <p className="text-gray-600 mt-2">
              Only certified users can view and appeal food requests. Chefs can send appeals to help fulfill the requests.
            </p>
          </div>
          {/* Step 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
              4
            </div>
            <SectionTitle>Accept Appeals</SectionTitle>
            <p className="text-gray-600 mt-2">
              Users can review the profiles of chefs who appealed to their requests and select the best fit for their cooking session.
            </p>
          </div>
          {/* Step 5 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
              5
            </div>
            <SectionTitle>My Mates Tab</SectionTitle>
            <p className="text-gray-600 mt-2">
              Once a chef is accepted, both parties can refer to the 'My Mates' tab to view details and communicate about the cooking session.
            </p>
          </div>
          {/* Step 6 */}
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-500 text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
              6
            </div>
            <SectionTitle>Meet & Enjoy</SectionTitle>
            <p className="text-gray-600 mt-2">
              Meet at the agreed location, cook together, and enjoy the meal you created!
            </p>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Blank
