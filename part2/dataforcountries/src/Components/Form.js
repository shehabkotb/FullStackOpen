import React from "react"

const Form = (props) => {
  const { filter, setFilter } = props

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleChange} />
    </div>
  )
}

export default Form
