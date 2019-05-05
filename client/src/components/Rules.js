import React from 'react'

const Rules = () => {
  return (
    <div className="Rules rounded shadow p-3 mt-3">
      <h6 className="pb-3 mb-3"><i className="fas fa-bookmark pr-2"></i> Règles du jeu</h6>
      <ul className="mb-0">
        <li>Chaque partie est composée de 15 questions</li>
        <li>Tu as 18 secondes pour répondre à chaque question</li>
        <li>Chaque bonne réponse te rapporte 1 point.</li>
        <li>Les plus rapides marquent des points supplémentaires</li>
      </ul>
    </div>
  )
}

export default Rules
