import React from 'react'
import classnames from 'classnames'

const GameResults = (props) => {
  const filteredResults = props.results
    .sort((a, b) => b.points - a.points)
    .filter((p) => p.points > 0)

  const tableResults = (filteredResults.length === 0)
    ? (<tr><td colSpan={3} className="text-center text-black-50">Aucun joueur n'a marqué de points pendant cette partie !</td></tr>)
    : filteredResults.map((p, index) => {

      let myClasses = { 'border-bottom': true }
      let pos = (<i className="fas fa-trophy"></i>)
      if (index === 0) {
        myClasses.first = true
      } else if (index === 1) {
        myClasses.second = true
      } else if (index === 2) {
        myClasses.third = true
      } else {
        pos = (<span>{index+1}ème</span>)
      }

      let tdClasses = classnames(myClasses)

      return (
        <tr className={tdClasses} key={p.id}>
          <td width="1">{pos}</td>
          <td><strong>{p.username}</strong></td>
          <td className="text-right" width="1">{p.points}&nbsp;points</td>
        </tr>
      )
    })

  return (
    <div className="GameResults pt-5">
      <div className="mb-5 text-center">
        <h5>Partie terminé !</h5>
        <div>La prochaine partie débute dans quelques instants...</div>
      </div>
      <table className="table p-3">
        <tbody>
          {tableResults}
        </tbody>
      </table>
    </div>
  )
}

export default GameResults