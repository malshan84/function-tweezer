import * as React from 'react';
import { Diff2Html } from 'diff2html';
import { SvcKind } from '../api/UserInfo';

interface IFunctionDiffProps {
    scmType: SvcKind;
    diffString: string;
}

export default class FunctionDiff extends React.Component<IFunctionDiffProps, {}> { 

    render() {
        return (
            
            <div className="functionDiff-layer">
                <div 
                    className="functiondiff-wrapper" 
                    dangerouslySetInnerHTML={{__html: this.getPrettyHtml(this.props.diffString)}}
                />
            </div>
        );
    }

    getPrettyHtml(diffString: string): string {
        
        var str: string = Diff2Html.getPrettyHtml(diffString, {
            inputFormat: 'diff', showFiles: false, matching: 'words', outputFormat: 'side-by-side'});
            
        return str;
    }
}
