import * as React from 'react';
import { Diff2Html } from 'diff2html';
import { RouteComponentProps } from 'react-router-dom';
class FunctionDiff extends React.Component<RouteComponentProps<{funcName: string}>, {}> { 

    render() {
      
        return (
            
            <div className="functionDiff-layer">
                <div className="functiondiff-wrapper" dangerouslySetInnerHTML={{__html: this.test()}}/>
            </div>
        );
    }

    test(): string {
        
        var diff = 
        '--- AbLaunchUnittest.java\n' +
        '+++ AbLaunchUnittest.java\n' +
        '@@ -110,29 +110,7 @@ ' +
        ' 	}\n' +
        ' \n' +
        ' 	public boolean execute() {\n' +
        '-		final boolean isAutoBuild = CSUtil.isAutoBuild();\n' +
        '-		final boolean isAutoRefresh = CSUtil.isAutoRefresh();\n' +
        '-\n' +
        '+		CSUtil.setAutoBuild(false);\n' +
        '-		CSUtil.setAutoRefresh(false);\n' +
        '-\n' +
        '-		if (!isValid()) {\n' +
        '-			return false;\n' +
        '-		}\n' +
        '-\n' +
        '-		// 테스트 실행를 준비한다.\n' +
        '-		prepare();\n' +
        '-\n' +
        '+		try {\n' +
        '+			// 테스트 실행한다.\n' +
        '+			return showDialogAndRun();\n' +
        '-		} finally {\n' +
        '-			// 테스트 실행 후 마무리하다.\n' +
        '-			finish();\n' +
        '-\n' +
        '+			CSUtil.setAutoBuild(isAutoBuild);\n' +
        '-			CSUtil.setAutoRefresh(isAutoRefresh);\n' +
        '-		}\n' +
        ' +		\n' +
        ' 	}\n' +
        ' \n';
        
        var str: string = Diff2Html.getPrettyHtml(diff, {
            inputFormat: 'diff', showFiles: false, matching: 'words', outputFormat: 'side-by-side'});
            
        return str;
    }
}

export default FunctionDiff;
