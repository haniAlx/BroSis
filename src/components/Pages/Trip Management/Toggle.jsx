import React from "react"

const ToggleContext = React.createContext()

export default function Toggle({ children }) {
    const [on, setOn] = React.useState([])

    function toggle(index) {
        setOn(prevOn => {
            const newButtonStates = [...prevOn];
      newButtonStates[index] = !newButtonStates[index];
      return newButtonStates;
        })
        console.log(on)
    }

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            {children}
        </ToggleContext.Provider>
    )
}

export { ToggleContext }