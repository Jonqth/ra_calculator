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
};
let paceCalcController = {
  // Value of the performance index
  perf_index: null,
  // Values of the time etimastes
  time_estimates: null,
  // Values of the pace times
  pace_times: null,
  // Calculate the perfomance index
  calculatePerfIndex: values => {
    const MR_VAL = 5,
          SM_VAL = 3,
          VL_VAL = 60,
          PE_VAL = 0.9; // Performance Index to be 
    // determined by user infos 

    let nbOfMarathons = values[2],
        nbOfSemis = values[3],
        volOfTraining = values[4];
    let MarathonsIndex = nbOfMarathons >= MR_VAL ? 1 : 1 - 0.05 / (nbOfMarathons + 1),
        SemisIndex = nbOfSemis >= SM_VAL ? 1 : 1 - 0.05 / (nbOfSemis + 1),
        VolumeIndex = volOfTraining >= VL_VAL ? 1 : 1 - (60 - volOfTraining) * 0.0015;
    let perfIndex = 1 * VolumeIndex * SemisIndex * MarathonsIndex < PE_VAL ? PE_VAL : 1 * VolumeIndex * SemisIndex * MarathonsIndex;
    let requiredValues = [nbOfMarathons, nbOfSemis, volOfTraining];

    if (requiredValues.every(o => o !== "")) {
      paceCalcController.perf_index = perfIndex;
      paceCalcController.calculateTimeFor(values);
    }
  },
  // Calculate the pace from user informations
  // if form is complete & valid
  calculateTimeFor: values => {
    let reference = parseFloat(values[0]);
    let mseconds = paceCalcController.convertToSeconds(values[1]); // Pace to be determined by reference 
    // (42, 21, ...)

    let time42 = paceCalcController.getTimeFromDistance(reference, 42, mseconds);
    let time21 = paceCalcController.getTimeFromDistance(reference, 21.1, mseconds);
    let time10 = paceCalcController.getTimeFromDistance(reference, 10, mseconds);
    let time5 = paceCalcController.getTimeFromDistance(reference, 5, mseconds);
    console.log('TIME ---------------------------');
    console.log('Time 42', paceCalcController.convertToHours(time42));
    console.log('Time 21', paceCalcController.convertToHours(time21));
    console.log('Time 10', paceCalcController.convertToHours(time10));
    console.log('Time 5', paceCalcController.convertToHours(time5));
    let pace42 = paceCalcController.getPaceFromDistance(42, time42);
    let pace21 = paceCalcController.getPaceFromDistance(21.1, time21);
    let pace10 = paceCalcController.getPaceFromDistance(10, time10);
    let pace5 = paceCalcController.getPaceFromDistance(5, time5);
    console.log('PACE ---------------------------');
    console.log('Pace 42', paceCalcController.convertToHours(pace42));
    console.log('Pace 21', paceCalcController.convertToHours(pace21));
    console.log('Pace 10', paceCalcController.convertToHours(pace10));
    console.log('Pace 5', paceCalcController.convertToHours(pace5));
  },
  displayResults: () => {},
  getTimeFromDistance: (reference, distance, mseconds) => {
    const POW_VAL = 1.06;

    if (distance === reference) {
      return mseconds;
    } else if (distance === 42) {
      return mseconds * (Math.pow(distance / reference, POW_VAL) / paceCalcController.perf_index);
    } else {
      return mseconds * Math.pow(distance / reference, POW_VAL);
    }
  },
  getPaceFromDistance: (distance, mseconds) => {
    console.log('PACE FORM:', distance, Math.ceil(mseconds));
    return Math.ceil(mseconds) / distance;
  },
  convertToSeconds: time => moment.duration(time).asMilliseconds(),
  convertToHours: mseconds => moment.utc(mseconds).format("HH:mm:ss")
};
$(function () {
  userInfosController.init();
});