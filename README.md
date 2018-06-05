# Chirpper 
Twitter Clone | Voyage-5, Geckos-Team-16 | [chingu.io](https://chingu.io)

**Team**  
  Simon - Los Angeles, CA  
  Tiffany - San Fransisco, CA  
  Jared - Austin, TX
  
**Goal**  
Create a clone of Twitter.
   
**Minimal Viable Product**  
TBD
  
**Stack**
 - NodeJS with Express
 - MongoDB
 - EJS
 - CSS Grid (for layout)
 - Bootstrap (for some elements)

 ---

## Getting Started
1. Fork this repo.  

2. Clone your fork by running the `git clone` command in your terminal with the URL for your repo. It should look something like this:   
`git clone https://github.com/<your username>/Geckos-Team-16.git`

3. Next, you need to set the original repo (chingu-voyage5/Geckos-Team-16) as the "upstream." To do this, navigate to the directory you just cloned and run:  
`git remote add upstream https://github.com/chingu-voyage5/Geckos-Team-16.git`

## Git Workflow
Before starting any work, make sure the files in your local directory (on your computer) are up-to-date with the ones in the upstream (the original chingu-voyage5/Geckos-Team-16 repo).

1. From inside your local directory, get the branches and their commits from upstream:  
`git fetch upstream`

2. Jump into the `dev` branch:  
`git checkout dev`

3. Merge the changes from `upstream/dev` into your local branch:  
 `git merge upstream/dev`
 
Now you're ready to make your own changes!

Create a separate branch: `git checkout -b <your branch name>`

**Naming branches**  
Name branches by type (**bug**, **feature**, **refactor**, or **style**) followed by a short description.  
Examples of branch names via [@Kornil](https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-1-e0756c88fd3c):
 - bug/fixed-all-caps
 - feature/giant-duck-modal
 - refactor/add-prop-types
 - style/everything-is-black
 
Once you've saved and committed your changes, fetch the latest code again:  
```
git checkout dev  
git fetch upstream
```

Switch back to the branch you were working on and merge:
```
git checkout <your branch name>
git merge upstream/dev
```
Fix any conflicts and push your new branch to origin (your fork on Github):  
`git push origin <your branch name>`

In your repo on Github, make a pull request from your new branch against the `dev` branch of the original repo.