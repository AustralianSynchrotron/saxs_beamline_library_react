import React from "react";
import {OphydButton,OphydStatusField} from "../ophyd_components/ophyd_components";

return (
    <React.Fragment>
        <div>
            <OphydButton device="saxs_feedback.feedback.manual_shutter_open" /><OphydButton device="saxs_feedback.feedback.fdbk_det_req" /> <OphydStatusField device="/>
        </div>
    </React.Fragment>
)