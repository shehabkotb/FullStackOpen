import React from "react"

const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Total = (props) => {
  return <b>total of {props.sum} exercises </b>
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => {
        return <Part key={part.id} part={part} />
      })}
      <Total
        sum={props.parts.reduce((sum, part) => {
          return part.exercises + sum
        }, 0)}
      />
    </div>
  )
}

const Course = ({ courses }) => {
  return courses.map((course) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>
    )
  })
}

export default Course
