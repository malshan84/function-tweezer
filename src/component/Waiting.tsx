import * as React from 'react';
import { Button } from 'semantic-ui-react';
class Waiting extends React.Component<{}, {}> {
    
    moveSettingPage = () => {
        window.location.hash = '/setting';
    }

    render() {

        return (
            <div>
                <div className="btn-setting">
                    <Button circular={true} icon="settings" onClick={this.moveSettingPage}/>
                </div>
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
