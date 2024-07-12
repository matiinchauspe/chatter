// import { useState, useEffect } from 'react'
// import browserStorage from 'store'

// /**
//  * @param storageKey - The key that will be used to store the data in the browser.
//  * @param initialState - The initial state of the data.
//  */
// export const usePersistState = (storageKey, initialState) => {
//   const [state, setInternalState] = useState(initialState)

//   useEffect(() => {
//     const storageInBrowser = browserStorage.get(storageKey)

//     if (storageInBrowser) {
//       setInternalState(storageInBrowser)
//     }
//   }, [])

//   const setState = (newState) => {
//     browserStorage.set(storageKey, newState)
//     setInternalState(newState)
//   }

//   return [state, setState]
// }
