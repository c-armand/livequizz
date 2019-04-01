import React from 'react';

const GameResults = (props) => {
  const playerItems = props.results
    .sort((a, b) => b.points - a.points)
    .map((p, index) => {
      if (index === 0) {
        return (
          <tr className="first border-bottom" key={p.id}>
            <td colSpan="3" className="p-4">
              <div className="mb-3"><i className="fas fa-trophy"></i></div>
              <strong>{p.username}</strong> remporte la partie avec <strong>{p.points} points !</strong>
            </td>
          </tr>
        )
      }
      const border = (index < props.results.length-1) ? 'border-bottom' : null;
      return (
        <tr className={border} key={p.id}>
          <td className="pl-5 text-left">{index+1}<sup>ème</sup></td>
          <td>{p.username}</td>
          <td className="pr-5 text-right">{p.points} points</td>
        </tr>
      )
    });

  return (
    <div className="GameResults pt-5">
      <h5 className="text-white mb-5">Partie terminée !</h5>
      <table className="table bg-white p-3 rounded">
        <tbody>
          {playerItems}
        </tbody>
      </table>
    </div>
  )
}

export default GameResults;