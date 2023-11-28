$branch= &git rev-parse --abbrev-ref HEAD

if($branch -eq "main"){
    throw 'Cannot snapshot the main branch'
}

$branch = ($branch -split "/")[-1]

$newVersion = npm version prerelease --preid $branch
echo $newVersion
git push
git push origin $newVersion