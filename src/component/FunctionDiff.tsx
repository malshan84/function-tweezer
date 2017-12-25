import * as React from 'react';
import { Diff2Html } from 'diff2html';
import { SvcKind } from '../api/UserInfo';

interface IFunctionDiffProps {
    scmType: SvcKind;
    diffString: string|undefined;
    sideBySide: boolean;
}

export default class FunctionDiff extends React.Component<IFunctionDiffProps, {}> { 

    render() {
        return (
            <div className="functiondiff-wrapper" >
            <div 
                className="functiondiff"            
                dangerouslySetInnerHTML={{__html: this.getPrettyHtml(this.props.diffString)}}
            />
            </div>
        );
    }

    getPrettyHtml(diffString: string|undefined): string {
        var str: string = '';
        if (diffString !== undefined) {
        
            let options =  {
                inputFormat: 'diff',
                showFiles: false,
                matching: 'words',
                outputFormat: this.props.sideBySide ? 'side-by-side' : '' 
            };

            str = Diff2Html.getPrettyHtml(diffString, options);
        } else {
            console.log('undefined');
        }
            
        return str;
    }
}
