import React from 'react';

const PlayerList = (props) => {
  const playerItems = (props.playerList.length > 0)
    ? props.playerList
      .sort((a, b) => b.points - a.points)
      .map(p => {
        const classname = (props.playerCurrent && p.id === props.playerCurrent.id) ? 'active' : '';

        let stars = null;
        let pos = 0;
        props.winners.forEach(w => {
          if (w.id === p.id) {
            if (pos === 0) {
              stars = <span><i className="fas fa-futbol"></i><i className="fas fa-futbol"></i><i className="fas fa-futbol"></i></span>
            } else if (pos === 1) {
              stars = <span><i className="fas fa-futbol"></i><i className="fas fa-futbol"></i></span>
            } else if (pos === 2) {
              stars = <span><i className="fas fa-futbol"></i></span>
            }
          }
          pos++;
        });

        return (
          <li key={p.id} className={classname}>
            {p.username}
            <span className="float-right">{p.points}</span>
            <span className="float-right mr-2">
              {stars}
            </span>
          </li>
        )
      })
    : <div className="text-white font-weight-light">Aucun joueur connecté</div>;

  return (
    <div className="Playerlist p-3">
      <div className="title mb-2">Jouers connectés</div>
      <ul>
        {playerItems}
      </ul>
    </div>
  )
}

export default PlayerList;