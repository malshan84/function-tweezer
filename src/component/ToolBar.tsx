import * as React from 'react';

class ToolBar extends React.Component<{}, {}> {    
  
    render() {
        return (
            <div className="btn-setting">
                <a 
                    className="btn btn-default btn-sm fa-2x" 
                    href="#/setting"
                >
                    <i className="fa fa-cog"/>
                </a>
            </div>
        );
    }
}

export default ToolBar;
