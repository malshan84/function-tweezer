import * as React from 'react';

class Waiting extends React.Component<{}, {}> {
    
    render() {

        return (
            <div className="wait-description">
                <div className="wait-title">
                    <span>There is no function history to show.</span>
                </div>
                <div className="wait-subtitle">
                <span>Select the function in the IDE.</span>
                </div>
            </div>
        );
    }
}

export default Waiting;
