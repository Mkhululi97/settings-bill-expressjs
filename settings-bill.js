export default function SettingsBill() {
  let smsCost;
  let callCost;
  let warningLevel;
  let criticalLevel;
  let className;
  let actionList = [];

  function setSettings(settings) {
    smsCost = Number(settings.smsCost);
    callCost = Number(settings.callCost);
    warningLevel = Number(settings.warningLevel);
    criticalLevel = Number(settings.criticalLevel);
  }

  function getSettings() {
    return {
      smsCost,
      callCost,
      warningLevel,
      criticalLevel,
    };
  }

  function recordAction(action) {
    let cost = 0;
    if (action === "sms" && smsCost > 0) {
      cost = smsCost;
    } else if (action === "call" && callCost > 0) {
      cost = callCost;
    }
    if (callCost > 0 && smsCost > 0) {
      actionList.push({
        type: action,
        cost,
        timestamp: new Date(),
      });
    }
  }

  function actions() {
    return actionList;
  }

  function actionsFor(type) {
    const filteredActions = [];

    // loop through all the entries in the action list
    for (let index = 0; index < actionList.length; index++) {
      const action = actionList[index];
      // check this is the type we are doing the total for
      if (action.type === type) {
        // add the action to the list
        filteredActions.push(action);
      }
    }

    return filteredActions;

    // return actionList.filter((action) => action.type === type);
  }

  function getTotal(type) {
    let total = 0;
    // loop through all the entries in the action list
    for (let index = 0; index < actionList.length; index++) {
      const action = actionList[index];
      // check this is the type we are doing the total for
      if (action.type === type) {
        // if it is add the total to the list
        total += action.cost;
      }
    }
    return total;

    // the short way using reduce and arrow functions

    // return actionList.reduce((total, action) => {
    //     let val = action.type === type ? action.cost : 0;
    //     return total + val;
    // }, 0);
  }

  function grandTotal() {
    return getTotal("sms") + getTotal("call");
  }

  function totals() {
    let smsTotal = getTotal("sms").toFixed(2);
    let callTotal = getTotal("call").toFixed(2);
    return {
      smsTotal,
      callTotal,
      grandTotal: grandTotal().toFixed(2),
    };
  }

  function hasReachedWarningLevel() {
    const total = grandTotal();
    const reachedWarningLevel = total >= warningLevel && total < criticalLevel;

    return reachedWarningLevel;
  }

  function hasReachedCriticalLevel() {
    const total = grandTotal();
    return total >= criticalLevel;
  }
  function getClassName() {
    // set class name either for critical level or warning level.
    hasReachedCriticalLevel() ? (className = "danger") : (className = "");
    hasReachedWarningLevel() ? (className = "warning") : "";
    return className;
  }

  return {
    setSettings,
    getSettings,
    recordAction,
    actions,
    actionsFor,
    totals,
    hasReachedWarningLevel,
    hasReachedCriticalLevel,
    getClassName,
  };
}
