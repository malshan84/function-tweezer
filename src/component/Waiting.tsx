import * as React from 'react';
import BtnSetting from './BtnSetting';

class Waiting extends React.Component<{}, {}> {
    
    render() {

        return (
        <div className="wait-layer">
            <BtnSetting />
            <div className="wait-description">
                <div className="wait-title">
                    <span>There is no function history to show.</span>
                </div>
                <div className="wait-subtitle">
                <span>Select the function in the IDE.</span>
                </div>
            </div>
        </div>
        );
    }
}

export default Waiting;
