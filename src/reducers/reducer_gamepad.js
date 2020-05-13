import * as actions from "../actions/actionTypes";


function buttonPressed(b) {
    if (typeof (b) == "object") {
        return b.value;
    }
    return b == 1.0;
}

const default_state = {
    buttons: []
};

export default (state = default_state, action) => {
    switch (action.type) {
        case actions.GAMEPAD_BUTTON_STATUS:
            
            let buttons = action.data.buttons.map(buttonPressed);
            if (JSON.stringify(state.buttons) != JSON.stringify(buttons)) {
                console.log("here")
                return { ...state, buttons: buttons }
            } else {
                console.log("here instead")
                return state;
            }
        default:
            return state;
    }
};
