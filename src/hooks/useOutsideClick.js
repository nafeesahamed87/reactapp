import { useEffect } from 'react'

/**
 * @file useOutsideClick.js
 * @module useOutsideClick
 * @param {Object | Object[]} ref - A reference to a DOM element.
 * @param {Function} callback - A callback function that is called when a click outside of the ref element occurs.
 * @return {undefined}
 * @desc This hook allows you to track clicks outside of a specific DOM element. When a click occurs outside of the element
 * passed through the ref parameter, the callback function is called.
 */
export const useOutsideClick = (ref, callback) => {
     const handleClick = (e) => {
          if (Array.isArray(ref)) {
               const outsideClick = ref.every((element) => {
                    return element?.current && !element.current.contains(e.target)
               })
               if (outsideClick) {
                    callback()
               }
          } else {
               if (ref?.current && !ref.current.contains(e.target)) {
                    callback()
               }
          }
     }

     useEffect(() => {
          document.addEventListener('click', handleClick)

          return () => {
               document.removeEventListener('click', handleClick)
          }
     })
}
