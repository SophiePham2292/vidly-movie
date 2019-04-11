
console.log("Start")

/* getUser(1)
    .then(user => getRepos(user.name))
    .then(repos => getCommits(repos[0])) */

async function displayCommits() {
    const user = await getUser(1)
    const repos = await getRepos(user.name)
    const commits = await getCommits(repos[0])
    console.log(commits)
}

displayCommits()

console.log("finish")

/* function repoCallback(user) {
    console.log("User", user)
    getRepos(user.name, commitCallback)
}
function commitCallback(repos) {
    console.log("Repos", repos)
    getCommits(repos[1], displayCommits)
}

function displayCommits(commits) {
    console.log(commits)
} */

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("get user")
            resolve({
                name: "Trang",
                age: 28
            })
        }, 2000)
    })

}

function getRepos(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Get repos", username)
            resolve([
                "repo 1",
                "repo 2",
                "repo 3"
            ])
        }, 2000)
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Get commits", repo)
            resolve([
                "commit 1",
                "commit 2",
                "commit 3"
            ])
        }, 2000)
    })

}

/*
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error("error message"))
    }, 2000)
})

p.then(res => console.log(res))
    .catch(err => console.log(err.message)) */