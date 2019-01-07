let userInfosController = {
  
  // Value of the user form
  values: [],

  // Setup the user infos
  // and the behaviour of the form
  init: () => {
    userInfosController.updateValues();

    $(".pace_vars").each((i, el) => {
      let _el = $(el);
      _el.on("change paste", () => userInfosController.updateValues());
    });
  },

  // Updates all values from
  // user form
  updateValues: () => {
    userInfosController.values = [];

    $(".pace_vars").each((i, el) => {
      let _el = $(el);
      userInfosController.values.push(_el.val());
    });

    paceCalcController.calculatePerfIndex(userInfosController.values);
  }
}

let paceCalcController = {

  // Value of the performance index
  perf_index: null,

  // Values of the time etimastes
  time_estimates: null,

  // Values of the pace times
  pace_times: null,

  // Calculate the perfomance index
  calculatePerfIndex: (values) => {
    const MR_VAL = 5,
          SM_VAL = 3,
          VL_VAL = 60,
          PE_VAL = 0.9;

    // Performance Index to be 
    // determined by user infos 
    let nbOfMarathons = values[2],
        nbOfSemis     = values[3],
        volOfTraining = values[4];

    let MarathonsIndex  = nbOfMarathons >= MR_VAL ? 1 : 1 - (0.05 / (nbOfMarathons + 1)),
        SemisIndex      = nbOfSemis >= SM_VAL ? 1 : 1 - (0.05 / (nbOfSemis + 1)),
        VolumeIndex     = volOfTraining >= VL_VAL ? 1 : 1 - (60 - volOfTraining) * 0.0015;

    let perfIndex = (1 * VolumeIndex * SemisIndex * MarathonsIndex) < PE_VAL ? PE_VAL : (1 * VolumeIndex * SemisIndex * MarathonsIndex);

    let requiredValues = [nbOfMarathons, nbOfSemis, volOfTraining];
    paceCalcController.perf_index = requiredValues.every(o => o !== "") ? perfIndex : null;
    paceCalcController.calculatePace(values)
  },

  // Calculate the pace from user informations
  // if form is complete & valid
  calculatePace: (values) => {
    const POW_VAL = 1.06;

    let mSeconds = moment.duration(values[1]).asMilliseconds();
    console.log(mSeconds);
    let hours = moment.utc(mSeconds).format("HH:mm:ss");
    console.log(hours);

    // Pace to be determined by reference 
    // (42, 21, ...)

  },

  displayResults: () => {

  }
}

$(function() {
  userInfosController.init();
});
