export default fn_evo = () => {
  var evoChain = [];
  var evoData = dataPokemon.chain;

  do {
    var evoDetails = evoData["evolution_details"][0];

    evoChain.push({
      species_name: evoData.species.name,
      min_level: !evoDetails ? 1 : evoDetails.min_level,
      trigger_name: !evoDetails ? null : evoDetails.trigger.name,
      item: !evoDetails ? null : evoDetails.item,
    });

    evoData = evoData["evolves_to"][0];
  } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
  return evoChain;
};
