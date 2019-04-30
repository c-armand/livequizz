import Validator from 'validator';
import isEmpty from './is-empty';

const regex = /^[a-zA-Z0-9]+$/;

const validatePlayer = (player, players) => {

  let errors = {};

  player.username = !isEmpty(player.username) ? player.username : '';

  if (!Validator.isLength(player.username, {min: 1, max: 16})) {
    errors.username = 'Votre nom doit contenir entre 1 et 16 caractères';
  }

  if (Validator.isEmpty(player.username)) {
    errors.username = 'Veuillez saisir un nom svp';
  }

  const existsPlayer = players.find((p) => {
    return p.username.toLowerCase() === player.username.toLowerCase()
  })

  if (!player.username.match(regex)) {
    errors.username = 'Votre nom doit contenir des caractères alphanumériques uniquement'
  }

  if (undefined !== existsPlayer) {
    errors.username = 'Ce nom est déjà pris !'
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }
}

module.exports = validatePlayer;