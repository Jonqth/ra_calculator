
let userInfosController = {
  
  // Value of the user form
  values: [],

  // Setup the user infos
  // and the behaviour of the form
  init: () => {
    userInfosController.updateValues()

    $(".pace_vars").each((i, el) => {
      let _el = $(el);
      _el.on("change", () => userInfosController.updateValues());
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

    console.log(userInfosController.values);
  }
}

$(function() {
  userInfosController.init();
});
