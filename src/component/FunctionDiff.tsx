import * as React from 'react';
import { Diff2Html } from 'diff2html';
import { SvcKind } from '../api/UserInfo';

interface IFunctionDiffProps {
    scmType: SvcKind;
    diffString: string;
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

    getPrettyHtml(diffString: string): string {

        let options =  {
            inputFormat: 'diff',
            showFiles: false,
            matching: 'words',
            outputFormat: this.props.sideBySide ? 'side-by-side' : '' 
        };

        var str: string = Diff2Html.getPrettyHtml(diffString, options);
            
        return str;
    }
}
