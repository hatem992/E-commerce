import React from 'react'

export default function BrandOverlay({brand,onClose}) {
  if(!brand) return null
  return (
    <div onClick={onClose} className="fixed top-0 left-0 right-0 bottom-0  bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-5 max-w-md w-full shadow-lg relative"
        onClick={(e) => e.stopPropagation()} >
          <button className='absolute top-3 right-3 text-white ' onClick={onClose}><i className="fa-solid fa-x text-black font-bold"></i></button>
        <img className='w-full' src={brand.image} alt={brand.name} />
        </div>
    </div>
  )
}





