function RunNpmInstall(
[Parameter()]
[AllowNull()]
[String] $subFolder
) {
    if ($subFolder) {
        Set-Location $subFolder;
    }

    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json;

    $devDependencyNpmInstallScript = "npm install";

    # Read devDependencies object keys from package.json and append with @latest.
    $devDependenciesJson = $packageJson.PSObject.Properties["devDependencies"].Value;
    $devDependenciesJson.PSObject.Properties | ForEach-Object {
        $devDependencyNpmInstallScript += " $($_.Name)@latest"
    };
    $devDependencyNpmInstallScript += " --save-exact --save-dev";

    Invoke-Expression -Command $devDependencyNpmInstallScript;

    $dependencyNpmInstallScript = "npm install";

    # Read dependencies object keys from package.json and append with @latest.
    $dependenciesJson = $packageJson.PSObject.Properties["dependencies"].Value;
    $dependenciesJson.PSObject.Properties | ForEach-Object {
        $dependencyNpmInstallScript += " $($_.Name)@latest"
    };
    $dependencyNpmInstallScript += " --save-exact";

    Invoke-Expression -Command $dependencyNpmInstallScript;

    if ($subFolder) {
        Set-Location "../";
    }
}

RunNpmInstall($null);
RunNpmInstall("./react-ui");