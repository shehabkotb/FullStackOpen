import React from "react"

const Filter = (props) => {
  const { filter, setFilter } = props

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
    <div>
      filter show with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
