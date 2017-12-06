import * as React from 'react';
import { Diff2Html } from 'diff2html';

interface IProps {
    funcName: string;
}

export default class FunctionDiff extends React.Component<IProps, {}> { 

    render() {
      
        return (
            
            <div className="functionDiff-layer">
                <div className="functiondiff-wrapper" dangerouslySetInnerHTML={{__html: this.test()}}/>
            </div>
        );
    }

    test(): string {
        
        var diff = 
        '--- PatchUtilityGenerator.sln	(revision 42666)\n' +
        '+++ PatchUtilityGenerator.sln	(working copy)\n' +
        '@@ -1,7 +1,7 @@\n' +
         '-\n' +
         'Microsoft Visual Studio Solution File, Format Version 12.00\n' +
        '-# Visual Studio 2013\n' +
        '-VisualStudioVersion = 12.0.40629.0\n' +
        '+# Visual Studio 14\n' +
        '+VisualStudioVersion = 14.0.25420.1\n' +
        ' MinimumVisualStudioVersion = 10.0.40219.1\n' +
        ' Project(\"{FAE04EC0-301F-11D3-BF4B-00C04F79EFBC}\") = \"PatchUtilityGenerator\", \"PatchUtilityGenerator\\PatchUtilityGenerator.csproj\", \"{822DD4A9-851B-4617-A3D0-5AD9FA220D3B}\"\n' +
        ' EndProject\n' +
        '@@ -24,8 +24,8 @@\n' +
        ' 	GlobalSection(ProjectConfigurationPlatforms) = postSolution\n' +
        ' 		{822DD4A9-851B-4617-A3D0-5AD9FA220D3B}.Debug|Any CPU.ActiveCfg = Debug|Any CPU\n' +
        ' 		{822DD4A9-851B-4617-A3D0-5AD9FA220D3B}.Debug|Any CPU.Build.0 = Debug|Any CPU\n' +
        '-		{822DD4A9-851B-4617-A3D0-5AD9FA220D3B}.Debug|Mixed Platforms.ActiveCfg = Debug|Any CPU\n' +
        '-		{822DD4A9-851B-4617-A3D0-5AD9FA220D3B}.Debug|Mixed Platforms.Build.0 = Debug|Any CPU\n' +
        '+		{822DD4A9-851B-4617-A3D0-5AD9FA220D3B}.Debug|Mixed Platforms.ActiveCfg = Release|Any CPU\n' +
        '+		{822DD4A9-851B-4617-A3D0-5AD9FA220D3B}.Debug|Mixed Platforms.Build.0 = Release|Any CPU\n' +
        ' 		{822DD4A9-851B-4617-A3D0-5AD9FA220D3B}.Debug|x86.ActiveCfg = Debug|Any CPU\n' +
        ' 		{822DD4A9-851B-4617-A3D0-5AD9FA220D3B}.Release|Any CPU.ActiveCfg = Release|Any CPU\n' +
        ' 		{822DD4A9-851B-4617-A3D0-5AD9FA220D3B}.Release|Any CPU.Build.0 = Release|Any CPU';
        
        var str: string = Diff2Html.getPrettyHtml(diff, {
            inputFormat: 'diff', showFiles: false, matching: 'words', outputFormat: 'side-by-side'});
            
        return str;
    }
}
